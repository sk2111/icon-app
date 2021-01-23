//libs
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-preview.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
//actions
import { iconDownloadStart, iconDownloadFailure } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectIconToEdit, selectIconDownloadFormat, selectUserSelectedColor, selectIsIconDownloading } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { RECOMMENDATION_INFO } from '../../../utilities/app.constants.js';
//helpers
import { editIconHelpers } from './edit-icon.helper';
import { sanitizeSvg } from '../../../utilities/helper.functions';

const EditIconPreview = ({ iconToEdit, iconDownloadFormat, userSelectedColor, isIconDownloading, iconDownloadStart,
    iconDownloadFailure }) => {

    const svgContainerRef = useRef(null);
    const colorNodeRef = useRef(null);
    const canvasRef = useRef(null);

    const { iconName, iconData } = iconToEdit;
    const recommendationList = RECOMMENDATION_INFO[iconDownloadFormat] ? RECOMMENDATION_INFO[iconDownloadFormat] : [];

    useEffect(() => {
        const htmlNodeList = svgContainerRef.current.children || [];
        if (htmlNodeList.length) {
            colorNodeRef.current = editIconHelpers.getSvgColorNodeList(htmlNodeList);
        }
    }, [iconData]);

    useEffect(() => {
        if (userSelectedColor) {
            editIconHelpers.changeColorForNodeList(colorNodeRef.current, userSelectedColor);
        }
    }, [userSelectedColor]);

    useEffect(() => {
        if (isIconDownloading && svgContainerRef.current) {
            const svgNode = editIconHelpers.getSvgNodeFromHtmlNodeList(svgContainerRef.current.children);
            if (svgNode) {
                iconDownloadStart({ svgNode, canvasNode: canvasRef.current });
            }
            else {
                iconDownloadFailure('Not a valid svg node');
            }
        }
    }, [isIconDownloading, iconDownloadStart, iconDownloadFailure]);

    return (
        <div className={styles.container}>
            <canvas className={styles.canvasContainer} ref={canvasRef}></canvas>
            <div className={styles.svgInfo}>{iconName}</div>
            <div className={styles.svgPreview}>
                <div ref={svgContainerRef} className={styles.editPreviewContainer} dangerouslySetInnerHTML={{ __html: sanitizeSvg(iconData) }}>
                </div>
            </div>
            <div className={styles.usageInfo}>
                <RenderView renderIfTrue={recommendationList.length}>
                    <div className={styles.recommendHeader}>RECOMMENDED FOR</div>
                    <ul className={styles.recommendList}>
                        {
                            recommendationList.map((val) => (
                                <li className={styles.recommendationText} key={val}>{val}</li>
                            ))
                        }
                    </ul>
                </RenderView>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit,
    iconDownloadFormat: selectIconDownloadFormat,
    userSelectedColor: selectUserSelectedColor,
    isIconDownloading: selectIsIconDownloading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        iconDownloadStart: (data) => dispatch(iconDownloadStart(data)),
        iconDownloadFailure: (error) => dispatch(iconDownloadFailure(error)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconPreview);
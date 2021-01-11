//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-preview.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
//reselect
import { selectIconToEdit, selectIconDownloadFormat } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { RECOMMENDATION_INFO } from '../../../utilities/app.constants.js';
//helpers
import { sanitizeSvg } from '../../../utilities/helper.functions';

const EditIconPreview = ({ iconToEdit, iconDownloadFormat }) => {

    const { iconName, iconData } = iconToEdit;
    const recommendationList = RECOMMENDATION_INFO[iconDownloadFormat] ? RECOMMENDATION_INFO[iconDownloadFormat] : [];

    return (
        <div className={styles.container}>
            <div className={styles.svgInfo}>{iconName}</div>
            <div className={styles.svgPreview}>
                <div className={styles.editPreviewContainer} dangerouslySetInnerHTML={{ __html: sanitizeSvg(iconData) }}>
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
    iconDownloadFormat: selectIconDownloadFormat
});

export default connect(mapStateToProps)(EditIconPreview);
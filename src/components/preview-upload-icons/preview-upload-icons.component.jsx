//libs
import React, { useRef } from 'react';
//css
import styles from './preview-upload-icons.module.css';
//components
import RenderView from '../render-view/render-view.component';
// custom hooks
import { useForceUpdate } from '../../hooks/force-update';
//static
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';
import Remove from '../../assests/close.png';

const PreviewUploadIcons = ({ iconList, deleteIcon }) => {

    const forceUpdate = useForceUpdate();
    const deleteAnimation = useRef([]);

    const handleDeleteIcon = (iconId) => {
        deleteAnimation.current.push(iconId);
        forceUpdate();
        setTimeout(() => {
            deleteIcon(iconId);
            const index = deleteAnimation.current.indexOf(iconId);
            if (index > -1) {
                deleteAnimation.current.splice(index, 1);
            }
        }, 400);
    };

    return (
        <div className={styles.viewZone}>
            <RenderView renderIfFalse={iconList.length}>
                <div className={styles.viewContent}>
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
            </RenderView>
            <RenderView renderIfTrue={iconList.length}>
                <div className={styles.previewZone}>
                    {
                        iconList.map(({ id, iconsBase64, iconName }) => {
                            const containerClass = styles.previewContainer + ' ' + ((deleteAnimation.current.includes(id)) ? styles.deleteAnim : '');
                            return (
                                <div key={id} className={containerClass}>
                                    <img className={styles.remove} src={Remove} alt="x" onClick={() => handleDeleteIcon(id)} />
                                    <img className={styles.previewImage} src={`data:image/svg+xml;base64,${iconsBase64}`} alt="Invalid" />
                                    <div className={styles.iconName}>{iconName}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </RenderView>
        </div>
    );
};

PreviewUploadIcons.defaultProps = {
    iconList: [],
    deleteIcon: () => { }
}

export default PreviewUploadIcons;
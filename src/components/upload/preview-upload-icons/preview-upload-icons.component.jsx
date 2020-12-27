//libs
import React, { useEffect, useState } from 'react';
//css
import styles from './preview-upload-icons.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
//static
import NoFileFoundImg from '../../../assests/webp/no-files-found.webp';
import Remove from '../../../assests/close.png';
//constants
import { ICON_PROP } from '../../../utilities/app.constants';
//destructure ICON PROP
const { ICON_ID, ICON_NAME, ICON_BASE_64 } = ICON_PROP;

const PreviewUploadIcons = ({ iconList, deleteIcon }) => {

    const [deleteIconList, setDeleteIconList] = useState([]);

    useEffect(() => {
        if (deleteIconList.length) {
            const timerId = setTimeout(() => {
                deleteIcon([...deleteIconList]);
                setDeleteIconList([]);
            }, 400);
            return () => clearTimeout(timerId);
        }
    }, [deleteIconList, deleteIcon]);

    const handleDeleteIcon = (iconId) => {
        setDeleteIconList([...deleteIconList, iconId]);
    };

    return (
        <div className={styles.viewZone}>
            <RenderView renderIfFalse={iconList.length}>
                <div className={styles.viewContent}>
                    <img src={NoFileFoundImg} alt="No Files uploaded" />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
            </RenderView>
            <RenderView renderIfTrue={iconList.length}>
                <div className={styles.previewZone}>
                    {
                        iconList.map((icon) => {
                            const iconId = icon[ICON_ID];
                            const containerClass = styles.previewContainer + ' ' + ((deleteIconList.includes(iconId)) ? styles.deleteAnim : '');
                            return (
                                <div key={iconId} className={containerClass}>
                                    <img className={styles.remove} src={Remove} alt="x" onClick={() => handleDeleteIcon(iconId)} />
                                    <img className={styles.previewImage} src={`data:image/svg+xml;base64,${icon[ICON_BASE_64]}`} alt="Invalid" />
                                    <div className={styles.iconName}>{icon[ICON_NAME]}</div>
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
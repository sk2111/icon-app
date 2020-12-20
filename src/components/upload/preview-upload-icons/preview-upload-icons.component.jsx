//libs
import React, { useEffect, useState } from 'react';
//css
import styles from './preview-upload-icons.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
//static
import { ReactComponent as NoFileFoundSvg } from '../../../assests/no-files-found.svg';
import Remove from '../../../assests/close.png';

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
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
            </RenderView>
            <RenderView renderIfTrue={iconList.length}>
                <div className={styles.previewZone}>
                    {
                        iconList.map(({ id, iconsBase64, iconName }) => {
                            const containerClass = styles.previewContainer + ' ' + ((deleteIconList.includes(id)) ? styles.deleteAnim : '');
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
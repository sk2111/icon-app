//libs
import React from 'react';
//css
import styles from './preview-upload-icons.module.css';
//components
import RenderView from '../render-view/render-view.component';
//static
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';
import Remove from '../../assests/close.png';

const PreviewUploadIcons = ({ iconList }) => {
    // return <div dangerouslySetInnerHTML={{ __html: iconData }} />
    // check firebase minimum upload value
    // restrick minimum numbers
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
                        iconList.map(({ iconsBase64, iconName }) => {
                            return (
                                <div className={styles.previewContainer}>
                                    <img className={styles.remove} src={Remove} alt="x" />
                                    <img className={styles.previewImage} src={`data:image/svg+xml;base64,${iconsBase64}`} alt="Invalid" />
                                    <div>{iconName}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </RenderView>
        </div>
    );
};


export default PreviewUploadIcons;
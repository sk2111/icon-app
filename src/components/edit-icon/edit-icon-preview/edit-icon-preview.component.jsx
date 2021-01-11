//libs
import React from 'react';
//css
import styles from './edit-icon-preview.module.css';





const EditIconPreview = ({ iconName, iconData }) => {
    return (
        <div className={styles.container}>
            <div className={styles.svgInfo}>{iconName}</div>
            <div className={styles.svgPreview}>
                <div className="re_editSelectedSvgContainer" dangerouslySetInnerHTML={{ __html: iconData }}>

                </div>
            </div>
            <div className={styles.usageInfo}>
                <div className={styles.recommendText}>RECOMMENDED FOR</div>
            </div>
        </div>
    );
};


export default EditIconPreview;
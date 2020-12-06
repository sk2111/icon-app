//libs
import React from 'react';
//styles
import styles from './upload-icons.module.css';


const UploadIcons = () => {
    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.headerText}>Upload files to Common Icons</h4>
            <div className={styles.dropContainer}>
            </div>
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <div className={styles.viewZone}>

            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.nextButton}>Next</button>
                <button className={styles.cancelButton}>Cancel</button>
            </div>
        </div>
    );
};

export default UploadIcons;
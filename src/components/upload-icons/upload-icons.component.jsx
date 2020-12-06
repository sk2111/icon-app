//libs
import React from 'react';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
//static
import { ReactComponent as UploadSvg } from '../../assests/upload-icons.svg';


const UploadIcons = () => {
    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.headerText}>Upload files to Common Icons</h4>
            <div className={styles.dropContainer}>
                <div className={styles.dropContent}>
                    <UploadSvg />
                    <p className={styles.dropText1}>Drag and drop your files here</p>
                    <p className={styles.dropText2}>or</p>
                    <CustomButton primary width="85px">Browse</CustomButton>
                </div>
            </div>
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <div className={styles.viewZone}>

            </div>
            <div className={styles.buttonContainer}>
                <CustomButton className={styles.nextBtn} primary>Next</CustomButton>
                <CustomButton secondary>Cancel</CustomButton>
            </div>
        </div>
    );
};

export default UploadIcons;
//libs
import React from 'react';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
//static
import { ReactComponent as UploadSvg } from '../../assests/upload-icons.svg';
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';


const UploadIcons = () => {

    const handleSvgFilesUpload = (e) => {
        console.log("File uploading test", e.target.files);
    };

    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.headerText}>Upload files to Common Icons</h4>
            <div className={styles.dropContainer}>
                <div className={styles.dropContent}>
                    <UploadSvg />
                    <p className={styles.dropText1}>Drag and drop your files here</p>
                    <p className={styles.dropText2}>or</p>
                    <input type="file" multiple accept=".svg" onChange={handleSvgFilesUpload} />
                    <CustomButton primary width="85px">Browse</CustomButton>
                </div>
            </div>
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <div className={styles.viewZone}>
                <div className={styles.viewContent}>
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <CustomButton className={styles.nextBtn} primary>Next</CustomButton>
                <CustomButton secondary>Cancel</CustomButton>
            </div>
        </div>
    );
};

export default UploadIcons;
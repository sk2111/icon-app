//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import UploadZone from '../upload-zone/upload-zone.component';
import PreviewUploadIcons from '../preview-upload-icons/preview-upload-icons.component';
//actions
import { uploadFilesToCommonIcons } from '../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';
//helpers
import { normalizeUploadFileIconsStructure } from '../../utilities/helper.functions';


const UploadIcons = ({ uploadedCommonIcons, uploadFilesToCommonIcons }) => {



    //Have a props method to return back to parent component 
    console.log("Testing preview for uploaded icons", uploadedCommonIcons);
    const handleCommonIconsFileUpload = (uploadedFiles) => {
        const normalizedIconData = normalizeUploadFileIconsStructure(uploadedFiles);
        uploadFilesToCommonIcons(normalizedIconData);
    };

    return (
        <div className={styles.uploadContainer}>
            <UploadZone validFileNameExtension=".svg" acceptType="image/svg+xml" handleFileUpload={handleCommonIconsFileUpload} />
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <PreviewUploadIcons iconList={uploadedCommonIcons} />
            <div className={styles.buttonContainer}>
                <CustomButton className={styles.nextBtn} primary>Next</CustomButton>
                <CustomButton secondary>Cancel</CustomButton>
            </div>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    uploadedCommonIcons: selectUploadedCommonIcons
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFilesToCommonIcons: (icons) => { dispatch(uploadFilesToCommonIcons(icons)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadIcons);
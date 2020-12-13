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
import { uploadFilesToCommonIcons, deleteCommonIcon } from '../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';
//helpers
import { normalizeUploadFileIconsStructure } from '../../utilities/helper.functions';


const UploadIcons = ({ uploadedCommonIcons, uploadFilesToCommonIcons, deleteCommonIcon }) => {

    const handleCommonIconsFileUpload = (uploadedFiles) => {
        const normalizedIconData = normalizeUploadFileIconsStructure(uploadedFiles);
        uploadFilesToCommonIcons(normalizedIconData);
    };

    return (
        <div className={styles.uploadContainer}>
            <UploadZone validFileNameExtension=".svg" acceptType="image/svg+xml" handleFileUpload={handleCommonIconsFileUpload} />
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <PreviewUploadIcons iconList={uploadedCommonIcons} deleteIcon={deleteCommonIcon} />
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
        uploadFilesToCommonIcons: (icons) => { dispatch(uploadFilesToCommonIcons(icons)) },
        deleteCommonIcon: (iconId) => { dispatch(deleteCommonIcon(iconId)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadIcons);
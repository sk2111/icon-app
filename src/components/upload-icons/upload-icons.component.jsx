//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import UploadZone from '../upload-zone/upload-zone.component';
//actions
import { uploadFilesToCommonIcons } from '../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';
//helpers
import { normalizeUploadFileIconsStructure } from '../../utilities/helper.functions';
//static
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';


const UploadIcons = ({ uploadedCommonIcons, uploadFilesToCommonIcons }) => {

    // If files are upload success have a action to store svg string in redux store
    // add a data formating conditoon obj
    //{base64:'',svgTextData:'',categroy:'',serachKeywords:''}

    //Have a props method to return back to parent component 
    console.log("Testing uploaded icons", uploadedCommonIcons);
    const handleCommonIconsFileUpload = (uploadedFiles) => {
        console.log("Testing upload files", uploadedFiles);
        const normalizedFileData = normalizeUploadFileIconsStructure(uploadedFiles);
        console.log("Testing upload files normalizzed data", normalizedFileData);
        uploadFilesToCommonIcons(uploadedFiles);

    };

    return (
        <div className={styles.uploadContainer}>
            <UploadZone validFileNameExtension=".svg" acceptType="image/svg+xml" handleFileUpload={handleCommonIconsFileUpload} />
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <div className={styles.viewZone}>
                <div className={styles.viewContent}>
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
                {
                    // uploadedCommonIcons.map((svgIconString) => {
                    //     console.log("I am incoming");
                    //     const buff = Buffer.from(svgIconString);
                    //     const base64data = buff.toString('base64');
                    //     return (<img style={{
                    //         height: '50px', width: '50px'
                    //     }} src={`data:image/svg+xml;base64,${base64data}`} alt="icon" />);
                    //     // return <div dangerouslySetInnerHTML={{ __html: svgIconString }} />
                    // })
                }
            </div>
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
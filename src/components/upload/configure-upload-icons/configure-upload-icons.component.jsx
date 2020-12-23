//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons.module.css';
//components
import CustomButton from '../../reusables/custom-button/custom-button.component';
import RenderView from '../../reusables/render-view/render-view.component';
import ConfigureUploadIconsList from '../configure-upload-icons-list/configure-upload-icons-list.component';
import ConfigureUploadIconsClassificationAndTags from '../configure-upload-icons-classfication-tags/configure-upload-icons-classfication-tags.component';

//actions
import { uploadIconsStart } from '../../../redux/upload-icons/upload-icons.actions';
//reselect 
import { selectCommonIconsClassification, selectCommonIconsSearchKeywords } from '../../../redux/common-icons/common-icons.selectors';
import { selectIsUploading } from '../../../redux/upload-icons/upload-icons.selectors';


const ConfigureUploadIcons = ({ closeUploadModalView, commonIconsSelectOptions, commonIconsSearchKeywords,
    uploadIconsStart, isUploading }) => {

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.viewContainer}>
                    <ConfigureUploadIconsClassificationAndTags
                        classficationSuggestions={commonIconsSelectOptions}
                        tagSuggestions={commonIconsSearchKeywords}
                    />
                    <div className={styles.configPreview}>
                        <ConfigureUploadIconsList classificationOptions={commonIconsSelectOptions} tagSuggestionOptions={commonIconsSearchKeywords} />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <RenderView renderIfFalse={isUploading}>
                        <CustomButton className={styles.uploadBtn} primary onClick={() => uploadIconsStart()}>Upload</CustomButton>
                        <CustomButton secondary onClick={closeUploadModalView}>Cancel</CustomButton>
                    </RenderView>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    commonIconsSelectOptions: selectCommonIconsClassification,
    commonIconsSearchKeywords: selectCommonIconsSearchKeywords,
    isUploading: selectIsUploading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadIconsStart: (config) => dispatch(uploadIconsStart(config)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIcons);
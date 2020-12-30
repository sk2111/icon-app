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
import { selectProjectIconsClassification, selectProjectIconsSearchKeywords } from '../../../redux/project-icons/project-icons.selectors';
import { selectIsUploading, selectUploadIconDBPath } from '../../../redux/upload-icons/upload-icons.selectors';
//constants
import { COMMON_ICONS_HEADER_LABEL } from '../../../utilities/app.constants';

const ConfigureUploadIcons = ({ uploadIconDBPath, closeUploadModalView, commonIconsSelectOptions, commonIconsSearchKeywords,
    projectIconsSelectOptions, projectIconsSearchKeywords, uploadIconsStart, isUploading }) => {

    const isCommonIconType = uploadIconDBPath === COMMON_ICONS_HEADER_LABEL;
    const classificationOptions = isCommonIconType ? commonIconsSelectOptions : projectIconsSelectOptions;
    const tagSuggestionOptions = isCommonIconType ? commonIconsSearchKeywords : projectIconsSearchKeywords;

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.viewContainer}>
                    <ConfigureUploadIconsClassificationAndTags
                        classificationOptions={classificationOptions}
                        tagSuggestionOptions={tagSuggestionOptions}
                    />
                    <div className={styles.configPreview}>
                        <ConfigureUploadIconsList classificationOptions={classificationOptions} tagSuggestionOptions={tagSuggestionOptions} />
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
    uploadIconDBPath: selectUploadIconDBPath,
    commonIconsSelectOptions: selectCommonIconsClassification,
    commonIconsSearchKeywords: selectCommonIconsSearchKeywords,
    projectIconsSelectOptions: selectProjectIconsClassification,
    projectIconsSearchKeywords: selectProjectIconsSearchKeywords,
    isUploading: selectIsUploading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadIconsStart: (config) => dispatch(uploadIconsStart(config)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIcons);
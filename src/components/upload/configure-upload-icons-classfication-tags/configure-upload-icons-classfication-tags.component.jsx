//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons-classfication-tags.module.css';
//components
import CustomSelect from '../../reusables/custom-select/custom-select.component';
import RenderView from '../../reusables/render-view/render-view.component';
import CustomTags from '../../reusables/custom-tags/custom-tags.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
//actions
import { changeModalView, changeRootClassfication, updateRootTags, addNewClassfication } from '../../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectRootClassification, selectUploadIconDBPath, selectCommonRootTags } from '../../../redux/upload-icons/upload-icons.selectors';
//constants
import { MODAL_IN_UPLOAD_VIEW } from '../../../utilities/app.constants';
//static 
import { ReactComponent as BackArrow } from '../../../assests/back-arrow.svg';
import { ReactComponent as CreateNewClassfication } from '../../../assests/create-new-classification.svg';


const ConfigureAllIconsClassificationAndTags = ({ changeModalView, changeRootClassfication, updateRootTags, addNewClassfication,
    uploadIconDBPath, classificationValue, tagValues, classficationSuggestions, tagSuggestions }) => {

    const [showCreateNewCategory, setShowCreateNewCategory] = useState(false);

    const handleClassficationChange = (newValue) => {
        if (newValue !== classificationValue) {
            changeRootClassfication({ key: 'iconClassification', newValue: newValue, value: [newValue] });
        }
    };

    const handleAddNewClassification = (classification) => {
        if (classification) {
            addNewClassfication({ classification, uploadIconDBPath });
            setShowCreateNewCategory(false);
        }
    };

    return (
        <React.Fragment>
            <div className={styles.headerContainer}>
                <h4 className={styles.configHeaderText}>Upload files to Common Icons</h4>
                <div className={styles.backContainer} onClick={() => changeModalView(MODAL_IN_UPLOAD_VIEW)}>
                    <BackArrow className={styles.backArrow} />
                    <div className={styles.backBtn}>Back</div>
                </div>
            </div>
            <div className={styles.classification}>
                <div className={styles.label}>Category</div>
                <CustomSelect
                    options={classficationSuggestions}
                    value={classificationValue}
                    handleValueChange={handleClassficationChange}
                />
                <CreateNewClassfication className={styles.createNew} onClick={() => setShowCreateNewCategory(true)} />
                <RenderView renderIfTrue={showCreateNewCategory}>
                    <CreateModalCard
                        heading="Create new category"
                        inputType="text"
                        defaultValue=""
                        handleSubmit={handleAddNewClassification}
                        handleCancel={() => setShowCreateNewCategory(false)} />
                </RenderView>
            </div>
            <div className={styles.tagsContainer}>
                <div className={styles.labelTags}>Common tags</div>
                <CustomTags suggestionOptions={tagSuggestions} tags={tagValues} handleTagsUpdate={updateRootTags} />
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadIconDBPath: selectUploadIconDBPath,
    classificationValue: selectRootClassification,
    tagValues: selectCommonRootTags,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeModalView: (view) => dispatch(changeModalView(view)),
        changeRootClassfication: (val) => dispatch(changeRootClassfication(val)),
        updateRootTags: (tags) => dispatch(updateRootTags(tags)),
        addNewClassfication: (config) => dispatch(addNewClassfication(config)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureAllIconsClassificationAndTags);
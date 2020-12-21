//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons.module.css';
//components
import CustomButton from '../../reusables/custom-button/custom-button.component';
import CustomSelect from '../../reusables/custom-select/custom-select.component';
import CustomTags from '../../reusables/custom-tags/custom-tags.component';
import RenderView from '../../reusables/render-view/render-view.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
import ConfigureUploadIconsList from '../configure-upload-icons-list/configure-upload-icons-list.component';

//actions
import { changeModalView, changeRootClassfication, addNewClassfication } from '../../../redux/upload-icons/upload-icons.actions';
//reselect 
import { selectCommonIconsClassification } from '../../../redux/common-icons/common-icons.selectors';
import { selectRootClassification } from '../../../redux/upload-icons/upload-icons.selectors';
//constants
import { MODAL_IN_UPLOAD_VIEW } from '../../../utilities/app.constants';
//static 
import { ReactComponent as BackArrow } from '../../../assests/back-arrow.svg';
import { ReactComponent as CreateNewClassfication } from '../../../assests/create-new-classification.svg';

const ConfigureUploadIcons = ({ changeModalView, closeUploadModalView, commonIconsSelectOptions,
    rootClassificationValue, changeRootClassfication, addNewClassfication }) => {

    const [showCreateNewCategory, setShowCreateNewCategory] = useState(false);

    const handleRootClassificationChange = (currentValue) => {
        if (currentValue !== rootClassificationValue) {
            changeRootClassfication({ key: 'iconClassification', newValue: currentValue, value: [currentValue] });
        }
    };

    const handleAddNewClassification = (classification) => {
        if (classification) {
            addNewClassfication(classification);
            setShowCreateNewCategory(false);
        }
    };

    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.viewContainer}>
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
                            options={commonIconsSelectOptions}
                            value={rootClassificationValue}
                            handleValueChange={handleRootClassificationChange}
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
                        <CustomTags />
                    </div>
                    <div className={styles.configPreview}>
                        <ConfigureUploadIconsList classificationOptions={commonIconsSelectOptions} />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <CustomButton className={styles.uploadBtn} primary onClick={() => { }}>Upload</CustomButton>
                    <CustomButton secondary onClick={closeUploadModalView}>Cancel</CustomButton>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    commonIconsSelectOptions: selectCommonIconsClassification,
    rootClassificationValue: selectRootClassification
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeModalView: (view) => { dispatch(changeModalView(view)) },
        changeRootClassfication: (val) => { dispatch(changeRootClassfication(val)) },
        addNewClassfication: (val) => { dispatch(addNewClassfication(val)) }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIcons);
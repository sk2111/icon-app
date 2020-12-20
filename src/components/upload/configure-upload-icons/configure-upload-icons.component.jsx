//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons.module.css';
//components
import CustomButton from '../../reusables/custom-button/custom-button.component';
import CustomSelect from '../../reusables/custom-select/custom-select.component';
import CustomTags from '../../reusables/custom-tags/custom-tags.component';
import ConfigureUploadIconsList from '../configure-upload-icons-list/configure-upload-icons-list.component';
//actions
import { changeModalView, changeRootClassfication } from '../../../redux/upload-icons/upload-icons.actions';
//reselect 
import { selectCommonIconsSelectOptions } from '../../../redux/common-icons/common-icons.selectors';
import { selectDefaultClassification } from '../../../redux/upload-icons/upload-icons.selectors';
//constants
import { MODAL_IN_UPLOAD_VIEW, COMMON_ICON_DEFAULT_CATEGORY_VALUE } from '../../../utilities/app.constants';
//static 
import { ReactComponent as BackArrow } from '../../../assests/back-arrow.svg';
import { ReactComponent as CreateNewClassfication } from '../../../assests/create-new-classification.svg';

const ConfigureUploadIcons = ({ changeModalView, closeUploadModalView, commonIconsSelectOptions,
    defaultSelectValue, changeRootClassfication }) => {

    const filteredCommonIconsSelectOptions = commonIconsSelectOptions.filter(option => option !== COMMON_ICON_DEFAULT_CATEGORY_VALUE);

    const handleRootClassificationChange = (currentValue) => {
        if (currentValue !== defaultSelectValue) {
            changeRootClassfication({ key: 'iconClassification', newValue: currentValue, value: [currentValue] });
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
                            options={filteredCommonIconsSelectOptions}
                            value={defaultSelectValue}
                            handleValueChange={handleRootClassificationChange}
                        />
                        <CreateNewClassfication className={styles.createNew} />
                    </div>
                    <div className={styles.tagsContainer}>
                        <div className={styles.labelTags}>Common tags</div>
                        <CustomTags />
                    </div>
                    <div className={styles.configPreview}>
                        <ConfigureUploadIconsList filteredSelectOptions={filteredCommonIconsSelectOptions} />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <CustomButton className={styles.uploadBtn} primary onClick={''}>Upload</CustomButton>
                    <CustomButton secondary onClick={closeUploadModalView}>Cancel</CustomButton>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    commonIconsSelectOptions: selectCommonIconsSelectOptions,
    defaultSelectValue: selectDefaultClassification
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeModalView: (view) => { dispatch(changeModalView(view)) },
        changeRootClassfication: (val) => { dispatch(changeRootClassfication(val)) },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIcons);
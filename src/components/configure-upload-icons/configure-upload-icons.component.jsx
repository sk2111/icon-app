//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './configure-upload-icons.module.css';
//components
import CustomSelect from '../custom-select/custom-select.component';
import CustomTags from '../custom-tags/custom-tags.component';
import ConfigureUploadIconsList from '../configure-upload-icons-list/configure-upload-icons-list.component';
//actions
import { changeModalView } from '../../redux/upload-icons/upload-icons.actions';
//constants
import { MODAL_IN_UPLOAD_VIEW } from '../../utilities/app.constants';
//static 
import { ReactComponent as BackArrow } from '../../assests/back-arrow.svg';
import { ReactComponent as CreateNewClassfication } from '../../assests/create-new-classification.svg';

const ConfigureUploadIcons = ({ changeModalView }) => {
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
                    options={['1', '2', '3']}
                    defaultSelectValue="1"
                    handleSelectValueChange={() => { }}
                />
                <CreateNewClassfication className={styles.createNew} />
            </div>
            <div className={styles.tagsContainer}>
                <div className={styles.labelTags}>Common tags</div>
                <CustomTags />
            </div>
            <div className={styles.configPreview}>
                <ConfigureUploadIconsList />
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeModalView: (view) => { dispatch(changeModalView(view)) },
    }
};


export default connect(null, mapDispatchToProps)(ConfigureUploadIcons);
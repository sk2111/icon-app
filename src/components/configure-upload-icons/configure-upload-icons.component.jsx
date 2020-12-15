//libs
import React from 'react';
//css
import styles from './configure-upload-icons.module.css';
//components
import CustomSelect from '../custom-select/custom-select.component';
//static 
import { ReactComponent as CreateNewClassfication } from '../../assests/create-new-classification.svg'

const ConfigureUploadIcons = () => {
    return (
        <React.Fragment>
            <div className={styles.headerContainer}>
                <h4 className={styles.configHeaderText}>Upload files to Common Icons</h4>
                <div className={styles.backBtn}>Back</div>
            </div>
            <div className={styles.classification}>
                <div className={styles.classficationLabel}>Category</div>
                <CustomSelect
                    options={['1', '2', '3']}
                    defaultSelectValue="1"
                    handleSelectValueChange={() => { }}
                />
                <CreateNewClassfication className={styles.createNew} />
            </div>
        </React.Fragment>
    );
};


export default ConfigureUploadIcons;
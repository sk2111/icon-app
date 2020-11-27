//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-page.module.css';
//components
import IconsPageHeader from '../../components/icons-page-header/icons-page-header.component';
//constants
import { EDIT_ICON_HEADER_LABEL } from '../../utilities/app.constants';


const EditIconPage = () => {
    return (
        <div className={styles.viewContainer}>
            <IconsPageHeader label={EDIT_ICON_HEADER_LABEL} showUploadButton={false} />
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    test: () => 'test'
});

export default connect(mapStateToProps)(EditIconPage);
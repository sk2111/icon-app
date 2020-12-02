//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-page.module.css';
//components
import IconsViewHeader from '../../components/icons-view-header/icons-view-header.component';
//constants
import { EDIT_ICON_HEADER_LABEL } from '../../utilities/app.constants';


const EditIconPage = () => {
    return (
        <div className={styles.viewContainer}>
            <IconsViewHeader label={EDIT_ICON_HEADER_LABEL} showUploadButton={false} />
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    test: () => 'test'
});

export default connect(mapStateToProps)(EditIconPage);
//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './general-icons-page.module.css';
//components
import IconsPageHeader from '../../components/icons-page-header/icons-page-header.component';
//reselect
import { selectCurrentUserAccessRole } from '../../redux/user/user.selectors';


const GeneralIconsPage = ({ currentUserAccessRole }) => {
    return (
        <div className={styles.viewContainer}>
            <IconsPageHeader showButton={currentUserAccessRole} />
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    currentUserAccessRole: selectCurrentUserAccessRole
});

export default connect(mapStateToProps)(GeneralIconsPage);
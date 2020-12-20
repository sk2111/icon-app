//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './project-icons-page.module.css';
//components
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
//reselect
import { selectCurrentUserAdminRole } from '../../redux/user/user.selectors';
//constants
import { PROJECT_ICONS_HEADER_LABEL } from '../../utilities/app.constants';


const ProjectIconsPage = ({ isCurrentUserAdmin }) => {
    return (
        <div className={styles.viewContainer}>
            <IconsViewHeader label={PROJECT_ICONS_HEADER_LABEL} showUploadButton={isCurrentUserAdmin} />
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole
});

export default connect(mapStateToProps)(ProjectIconsPage);
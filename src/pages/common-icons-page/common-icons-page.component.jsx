//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './common-icons-page.module.css';
//components
import HomeHeader from '../../components/home-header/home-header.component';
import IconsViewHeader from '../../components/icons-view-header/icons-view-header.component';
//reselect
import { selectCurrentUserAccessRole } from '../../redux/user/user.selectors';
//constants
import { COMMON_ICONS_HEADER_LABEL } from '../../utilities/app.constants';


const CommonIconsPage = ({ currentUserAccessRole, handleNavMenuClick }) => {

    const placeHolder = 'Search for common icons';

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                handleNavMenuClick={handleNavMenuClick}
                searchPlaceHolder={placeHolder}
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader label={COMMON_ICONS_HEADER_LABEL} showUploadButton={currentUserAccessRole} />
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    currentUserAccessRole: selectCurrentUserAccessRole
});

export default connect(mapStateToProps)(CommonIconsPage);
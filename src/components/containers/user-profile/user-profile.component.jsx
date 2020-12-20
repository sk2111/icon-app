//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
//selectors
import { selectCurrentUserEmail, selectCurrentUserFullName } from '../../../redux/user/user.selectors';
import { selectUserProfilePicTheme } from '../../../redux/app-data/app-data.selectors';
//css
import styles from './user-profile.module.css';
//actions
import { userSignOutStart } from '../../../redux/user/user.actions';
//Route constants
import { UPDATE_PASSWORD_ROUTE_PATH } from '../../../utilities/route.paths';

const UserProfile = ({ userSignOutStart, curentUserEmail, fullName, userProfilePicTheme }) => {

    const history = useHistory();
    const [settingsHidden, setSettingsHidden] = useState(true);

    const containerStyle = settingsHidden ? { maxHeight: '0px' } : {};

    return (
        <React.Fragment>
            <div className={styles.verticalLine}></div>
            <p className={styles.username}>{fullName}</p>
            <div className={styles.profileContainer}>
                <div style={userProfilePicTheme} className={styles.profilePic}
                    onClick={() => setSettingsHidden(!settingsHidden)}>{fullName[0]}</div>
                <div style={containerStyle} className={styles.settingsCon} onClick={() => setSettingsHidden(true)}>
                    <div className={styles.topContainer}>
                        <div style={userProfilePicTheme} className={styles.profilePicDropdown}>{fullName[0]}</div>
                        <div className={styles.nameContainer}>
                            <h4 className={styles.fullName}>{fullName}</h4>
                            <p className={styles.emailText}>{curentUserEmail}</p>
                        </div>
                    </div>
                    <div className={styles.breakLine}></div>
                    <p className={`${styles.label} ${styles.firstLabel}`}
                        onClick={() => history.push(UPDATE_PASSWORD_ROUTE_PATH)}>Update password</p>
                    <p className={`${styles.label} ${styles.signOutLabel}`} onClick={userSignOutStart}>Sign out</p>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    curentUserEmail: selectCurrentUserEmail,
    fullName: selectCurrentUserFullName,
    userProfilePicTheme: selectUserProfilePicTheme
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOutStart: () => dispatch(userSignOutStart())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
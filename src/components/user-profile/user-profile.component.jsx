//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
//selectors
import { selectCurrentUserEmail, selectCurrentUserFullName } from '../../redux/user/user.selectors';
//css
import styles from './user-profile.module.css';
//actions
import { userSignOutStart } from '../../redux/user/user.actions';
//Route constants
import { GO_TO_UPDATE_PASSWORD } from '../../utilities/route.paths';

const UserProfile = ({ userSignOutStart, curentUserEmail, fullName }) => {
    const history = useHistory();
    const [settingsHidden, setSettingsHidden] = useState(true);

    const containerStyle = settingsHidden ? { maxHeight: '0px' } : {};

    return (
        <React.Fragment>
            <div className={styles.verticalLine}></div>
            <p className={styles.username}>{fullName}</p>
            <div className={styles.profileContainer}>
                <div className={`${styles.profilePic} perfect-cen`}
                    onClick={() => setSettingsHidden(!settingsHidden)}>{fullName[0]}</div>
                <div style={containerStyle} className={styles.settingsCon} onClick={() => setSettingsHidden(true)}>
                    <div className={styles.topContainer}>
                        <div className={styles.profilePicDropdown}>{fullName[0]}</div>
                        <div className={styles.nameContainer}>
                            <h4 className={styles.fullName}>{fullName}</h4>
                            <p className={styles.emailText}>{curentUserEmail}</p>
                        </div>
                    </div>
                    <div className={styles.breakLine}></div>
                    <p className={`${styles.label} ${styles.firstLabel}`}
                        onClick={() => { history.push(GO_TO_UPDATE_PASSWORD) }}>Update password</p>
                    <p className={`${styles.label} ${styles.signOutLabel}`} onClick={userSignOutStart}>Sign out</p>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    curentUserEmail: selectCurrentUserEmail,
    fullName: selectCurrentUserFullName
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOutStart: () => dispatch(userSignOutStart())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
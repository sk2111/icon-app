//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//selectors
import { selectCurrentUserEmail, selectCurrentUserFullName } from '../../redux/user/user.selectors';
//css
import styles from './user-profile.module.css';
//actions
import { userSignOutStart, updateOrResetPasswordStart } from '../../redux/user/user.actions';

const UserProfile = ({ userSignOutStart, updateOrResetPasswordStart, curentUserEmail, fullName }) => {
    
    const [settingsHidden, setSettingsHidden] = useState(true);

    const containerStyle = settingsHidden ? { height: '0px' } : {};

    return (
        <React.Fragment>
            <div className={styles.verticalLine}></div>
            <p className={styles.username}>{fullName}</p>
            <div className={styles.profileContainer}>
                <div className={`${styles.profilePic} perfect-cen`} onClick={() => setSettingsHidden(!settingsHidden)}>{fullName ? fullName[0] : '-'}</div>
                <div style={containerStyle} className={styles.settingsCon} onClick={() => setSettingsHidden(true)}>
                    <p className={styles.label} onClick={() => updateOrResetPasswordStart({ email: curentUserEmail })}>update or Reset Password</p>
                    <p className={styles.label} onClick={userSignOutStart}>Sign out</p>
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
        userSignOutStart: () => dispatch(userSignOutStart()),
        updateOrResetPasswordStart: (data) => dispatch(updateOrResetPasswordStart(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
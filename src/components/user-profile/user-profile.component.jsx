//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
//css
import styles from './user-profile.module.css';
//actions
import { userSignOutStart } from '../../redux/user/user.actions';

const UserProfile = ({ userSignOutStart }) => {
    const [settingsHidden, setSettingsHidden] = useState(true);

    const containerStyle = settingsHidden ? { height: '0px' } : {};

    return (
        <React.Fragment>
            <div className={styles.verticalLine}></div>
            <p className={styles.username}>Sathish Kumar</p>
            <div className={styles.profileContainer}>
                <div className={`${styles.profilePic} perfect-cen`} onClick={() => setSettingsHidden(!settingsHidden)}>S</div>
                <div style={containerStyle} className={styles.settingsCon}>
                    <p className={styles.label}>Reset Password</p>
                    <p className={styles.label} onClick={userSignOutStart}>Sign out</p>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOutStart: () => dispatch(userSignOutStart())
    }
}

export default connect(null, mapDispatchToProps)(UserProfile);
//libs
import React, { useState } from 'react';
//css
import styles from './user-profile.module.css';

const UserProfile = () => {
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
                    <p className={styles.label}>Sign out</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
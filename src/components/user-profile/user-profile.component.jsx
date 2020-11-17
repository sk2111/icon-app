//libs
import React from 'react';
//css
import styles from './user-profile.module.css';

const UserProfile = () => {
    return (
        <React.Fragment>
            <div className={styles.verticalLine}></div>
            <p className={styles.username}>Sathish Kumar</p>
            <div className={styles.profileContainer}>
                <div className={`${styles.profilePic} perfect-cen`}>S</div>
                <div className={styles.settingsCon}> </div>
            </div>
        </React.Fragment>
    );
};

export default UserProfile;
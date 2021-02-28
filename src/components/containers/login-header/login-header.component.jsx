//libs
import React from 'react';
//css
import styles from './login-header.module.css';
//static
import appLogo from '../../../assests/applogo.svg';

const LoginHeader = () => {
    return (
        <div className={styles.loginContainer}>
            <img className={styles.logo} alt="icon" src={appLogo} />
            <h1 className={styles.heading}>Soliton Icons β version</h1>
            <div className={styles.lineBreak}></div>
        </div>
    );
};

export default LoginHeader;
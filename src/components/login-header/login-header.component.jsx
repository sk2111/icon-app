import React from 'react';
import styles from './login-header.module.css';


import CustomButton from '../custom-button/custom-button.component';

const LoginHeader = () => {
    return (
        <div className={styles.loginContainer}>
            <img className={styles.logo} alt="icon" src="../../../logo192.png" />
            <h1>Soliton Icon App</h1>
            <div className="flex-row">
                <CustomButton label="Login" />
                <p>or</p>
                <CustomButton label="Signup" />
            </div>
        </div>
    );
}

export default LoginHeader;
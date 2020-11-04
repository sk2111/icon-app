//libs
import React from "react";
//css
import styles from "./sign-in.module.css";
//components
import SignInForgotPassword from '../sign-in-forgot-password/sign-in-forgot-password.component';
import SignInUserLogin from '../sign-in-user-login/sign-in-user-login.component';

const SignIn = () => {
    return (
        <div className={styles.signInContainer}>
            <SignInForgotPassword />
            <SignInUserLogin />
        </div>
    );
};


export default SignIn;

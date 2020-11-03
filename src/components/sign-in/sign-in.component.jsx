//libs
import React, { useState } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from "./sign-in.module.css";
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//actions 
import { changeViewToUserLogin, changeViewToForgotPassword, userLoginStart, sendResetLink, setLoadingStatusForSignInSignUp } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectForgotPasswordViewHidden, selectWaitingForData } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
import { showFailureToastMessage } from "../../redux/toast-message/toast-message.actions";

const SignIn = ({ waitingForData, changeViewToForgotPassword,
    changeViewToUserLogin, forgotPasswordViewHidden, showFailureToastMessage,
    userLoginStart, setLoadingStatusForSignInSignUp, sendResetLink }) => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });
    const [resetDetails, setResetDetails] = useState({ email: '' });
    const { email, password } = userDetails;
    const btnClass = waitingForData ? 'disable-btn' : '';

    const validateEmail = (email) => {
        const validMail = email.match(/@/g) || [];
        return email.includes('@solitontech.com') && validMail.length === 1;
    }

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            showFailureToastMessage({ message: 'Please enter a valid Soliton mail ID', timeInSeconds: '6' });
            return;
        }
        setLoadingStatusForSignInSignUp({ fetching: true });
        userLoginStart({ email, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleForgotPassEmailChange = (e) => {
        const { name, value } = e.target;
        setResetDetails({ ...resetDetails, [name]: value });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(resetDetails.email)) {
            showFailureToastMessage({ message: 'Please enter a valid soliton mail ID', timeInSeconds: '6' });
            return;
        }
        setLoadingStatusForSignInSignUp({ fetching: true });
        sendResetLink({ email: resetDetails.email });
    };

    const renderUserLoginView = (forgotPasswordViewHidden) => {
        if (!forgotPasswordViewHidden) return null;
        return (
            <form autoComplete="on" onSubmit={handleUserLoginSubmit}>
                <FormInput name="email" label="Soliton mail address" value={email} type="email" required autoComplete="on" handleInputChange={handleInputChange} />
                <FormInput name="password" label="Password" value={password} type="password" required autoComplete="on" handleInputChange={handleInputChange} />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToForgotPassword}>Forgot Password?</div>
                <div className={`${styles.buttonCon} ${btnClass} perfect-cen`}>
                    <CustomButton label="Log In" type="submit"></CustomButton>
                </div>
            </form>
        );
    };

    const renderForgotPasswordView = (forgotPasswordViewHidden) => {
        if (forgotPasswordViewHidden) return null;
        return (
            <form autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
                <FormInput name="email" label="Soliton mail address" type="email" value={resetDetails.email} required autoComplete="on" handleInputChange={handleForgotPassEmailChange} />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToUserLogin}>Go Back to Sign In?</div>
                <div className={`${styles.buttonCon} ${btnClass} perfect-cen`}>
                    <CustomButton label="Send Reset Link" type="submit"></CustomButton>
                </div>
            </form>
        )
    };

    return (
        <div className={styles.signInContainer}>
            {renderUserLoginView(forgotPasswordViewHidden)}
            {renderForgotPasswordView(forgotPasswordViewHidden)}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    forgotPasswordViewHidden: selectForgotPasswordViewHidden,
    waitingForData: selectWaitingForData
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToUserLogin: () => dispatch(changeViewToUserLogin()),
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword()),
        userLoginStart: (data) => dispatch(userLoginStart(data)),
        setLoadingStatusForSignInSignUp: (data) => dispatch(setLoadingStatusForSignInSignUp(data)),
        sendResetLink: (data) => dispatch(sendResetLink(data)),
        showFailureToastMessage: (data) => dispatch(showFailureToastMessage(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

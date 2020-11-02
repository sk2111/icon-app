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
import { changeViewToUserLogin, changeViewToForgotPassword, userLoginStart } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectForgotPasswordViewHidden } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';

const SignIn = ({ changeViewToForgotPassword, changeViewToUserLogin, forgotPasswordViewHidden, userLoginStart }) => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });
    const { email, password } = userDetails;

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        userLoginStart({ email, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
    };

    const renderUserLoginView = (forgotPasswordViewHidden) => {
        if (!forgotPasswordViewHidden) return null;
        return (
            <form autoComplete="on" onSubmit={handleUserLoginSubmit}>
                <FormInput name="email" label="Soliton mail address" value={email} type="email" required autoComplete="on" handleInputChange={handleInputChange} />
                <FormInput name="password" label="Password" value={password} type="password" required autoComplete="on" handleInputChange={handleInputChange} />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToForgotPassword}>Forgot Password?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Log In" type="submit"></CustomButton>
                </div>
            </form>
        );
    };

    const renderForgotPasswordView = (forgotPasswordViewHidden) => {
        if (forgotPasswordViewHidden) return null;
        return (
            <form autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
                <FormInput label="Soliton mail address" type="email" required autoComplete="on" />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToUserLogin}>Go Back to Sign In?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
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
    forgotPasswordViewHidden: selectForgotPasswordViewHidden
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToUserLogin: () => dispatch(changeViewToUserLogin()),
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword()),
        userLoginStart: (data) => dispatch(userLoginStart(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

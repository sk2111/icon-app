//libs
import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from "./sign-in.module.css";
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//actions 
import { changeViewToUserLogin, changeViewToForgotPassword } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectForgotPasswordViewHidden } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';

const SignIn = ({ changeViewToForgotPassword, changeViewToUserLogin, forgotPasswordViewHidden }) => {


    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
    };

    const renderUserLoginView = (forgotPasswordViewHidden) => {
        if (!forgotPasswordViewHidden) return null;
        return (
            <form onSubmit={handleUserLoginSubmit}>
                <FormInput label="Soliton mail address" type="email" required />
                <FormInput label="Password" type="password" required />
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
            <form onSubmit={handleForgotPasswordSubmit}>
                <FormInput label="Soliton mail address" type="email" required />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToUserLogin}>Go Back to Sign In?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Send Reset Link"></CustomButton>
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
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

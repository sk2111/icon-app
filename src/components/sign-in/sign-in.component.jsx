//libs
import React from "react";
import { connect } from 'react-redux';
import { createSelectorCreator } from 'reselect';
//css
import styles from "./sign-in.module.css";
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//actions 
import { changeViewToUserLogin, changeViewToForgotPassword } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';

//reselect

const SignIn = ({ changeViewToForgotPassword, changeViewToUserLogin }) => {

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className={styles.signInContainer}>
            <form onSubmit={handleUserLoginSubmit}>
                <FormInput label="Soliton mail address" type="email" required />
                <FormInput label="Password" type="password" required />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToForgotPassword}>Forgot Password?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Log In" type="submit"></CustomButton>
                </div>
            </form>
            <form onSubmit={handleForgotPasswordSubmit}>
                <FormInput label="Soliton mail address" type="email" required />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToUserLogin}>Go Back to Sign In?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Send Reset Link"></CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = createSelectorCreator({
    test: () => 'hai'
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToUserLogin: () => dispatch(changeViewToUserLogin()),
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword())
    }
}
export default connect(null, mapDispatchToProps)(SignIn);

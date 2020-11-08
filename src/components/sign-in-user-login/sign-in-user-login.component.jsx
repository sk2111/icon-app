//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './sign-in-user-login.module.css';
//components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//actions 
import { changeViewToForgotPassword, userLoginStart, changeViewToSignUp, userLoginFailure, clearSignInError } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectUserLoginViewHidden, selectWaitingForData, selectUserLoginErrorMessage } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';


const SignInUserLogin = ({ fetching, viewHidden, errorMessage,
    changeViewToForgotPassword, userLoginStart, userLoginFailure, clearSignInError, changeViewToSignUp }) => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });
    const { email, password } = userDetails;

    const btnClass = fetching ? 'disable-btn' : '';

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(email)) {
            userLoginFailure({ message: 'Please enter Soliton mail ID' });
            return;
        }
        userLoginStart({ email, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (errorMessage) {
            clearSignInError();
        }
        setUserDetails({ ...userDetails, [name]: value });
    };
    const renderErrorMessage = (errorMessage) => {
        if (!errorMessage) return null;
        return (
            <div className="perfect-cen">
                <p className={styles.erroMessage}>{errorMessage}</p>
            </div>
        );
    }
    if (viewHidden) return null;

    return (
        <form className="mt-25" autoComplete="on" onSubmit={handleUserLoginSubmit}>
            <FormInput name="email" label="Soliton mail address" value={email} type="email" required autoComplete="on" handleInputChange={handleInputChange} />
            <FormInput rootClass="mt-14" name="password" label="Password" value={password} type="password" required autoComplete="on" handleInputChange={handleInputChange} />
            {renderErrorMessage(errorMessage)}
            <div className="flex-jus-end mt-15">
                <span className={`${styles.actionLabel} m-pointer`} onClick={changeViewToForgotPassword}>Forgot your password?</span>
            </div>
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen mt-24`}>
                <CustomButton type="submit" loading={fetching}>Sign In</CustomButton>
            </div>
            <div className="flex-row perfect-cen mt-33">
                <div className={styles.signupLabel}>Don't have an account?</div>
                <div className={styles.signupBtn} onClick={changeViewToSignUp}>Sign up</div>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    viewHidden: selectUserLoginViewHidden,
    errorMessage: selectUserLoginErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword()),
        userLoginStart: (data) => dispatch(userLoginStart(data)),
        userLoginFailure: (data) => dispatch(userLoginFailure(data)),
        changeViewToSignUp: () => dispatch(changeViewToSignUp()),
        clearSignInError: () => dispatch(clearSignInError())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInUserLogin);





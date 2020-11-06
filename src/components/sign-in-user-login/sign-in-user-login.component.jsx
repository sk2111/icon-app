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
import { changeViewToForgotPassword, userLoginStart, setLoadingStatusForSignInSignUp } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectUserLoginViewHidden, selectWaitingForData } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
import { showFailureToastMessage } from "../../redux/toast-message/toast-message.actions";
//utilities
import { isValidMail } from '../../utilities/validator.utils';


const SignInUserLogin = ({ fetching, viewHidden, showFailureToastMessage,
    changeViewToForgotPassword, userLoginStart, setLoadingStatus }) => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });
    const { email, password } = userDetails;

    const btnClass = fetching ? 'disable-btn' : '';

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(email)) {
            showFailureToastMessage({ message: 'Please enter a valid Soliton mail ID', timeInSeconds: '6' });
            return;
        }
        setLoadingStatus({ fetching: true });
        userLoginStart({ email, password });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    if (viewHidden) return null;

    return (
        <form autoComplete="on" onSubmit={handleUserLoginSubmit}>
            <div className="perfect-cen">
                <p className={styles.erroMessage}>Email ID or password is incorrect</p>
            </div>
            <FormInput name="email" label="Soliton mail address" value={email} type="email" required autoComplete="on" handleInputChange={handleInputChange} />
            <FormInput rootClass="mt-14" name="password" label="Password" value={password} type="password" required autoComplete="on" handleInputChange={handleInputChange} />
            <div className="flex-jus-end mt-23">
                <span className={`${styles.actionLabel} m-pointer`} onClick={changeViewToForgotPassword}>Forgot your password?</span>
            </div>
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen mt-24`}>
                <CustomButton type="submit">Sign In</CustomButton>
            </div>
            <div className="flex-row align-cen">
                <div className={styles.signupLabel}>Don't have an account?</div>
                <div>Sign up</div>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    viewHidden: selectUserLoginViewHidden,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToForgotPassword: () => dispatch(changeViewToForgotPassword()),
        userLoginStart: (data) => dispatch(userLoginStart(data)),
        setLoadingStatus: (data) => dispatch(setLoadingStatusForSignInSignUp(data)),
        showFailureToastMessage: (data) => dispatch(showFailureToastMessage(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInUserLogin);





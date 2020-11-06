//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './sign-in-forgot-password.module.css';
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//actions
import { changeViewToUserLogin, sendResetLink, setLoadingStatusForSignInSignUp } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
import { showFailureToastMessage } from "../../redux/toast-message/toast-message.actions";
//reselect
import { selectForgotPasswordViewHidden, selectWaitingForData } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';



const SignInForgotPassword = ({ viewHidden, fetching, sendResetLink,
    setLoadingStatus, showFailureToastMessage, changeViewToUserLogin }) => {

    const [resetDetails, setResetDetails] = useState({ email: '' });
    const btnClass = fetching ? 'disable-btn' : '';

    const handleForgotPassEmailChange = (e) => {
        const { name, value } = e.target;
        setResetDetails({ ...resetDetails, [name]: value });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(resetDetails.email)) {
            showFailureToastMessage({ message: 'Please enter a valid soliton mail ID', timeInSeconds: '6' });
            return;
        }
        setLoadingStatus({ fetching: true });
        sendResetLink({ email: resetDetails.email });
    };

    if (viewHidden) return null;

    return (
        <form autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
            <h3 className={styles.header}>Forgot password</h3>
            <p className={styles.message}>Enter the Soliton mail address associated with your account to get a reset link.</p>
            <FormInput rootClass="mt-25" name="email" label="Soliton mail address" type="email" value={resetDetails.email} required autoComplete="on" handleInputChange={handleForgotPassEmailChange} />
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen`}>
                <CustomButton type="submit">Send Reset Link</CustomButton>
            </div>
            <div className={`${styles.actionLabel} flex-jus-end m-pointer`} onClick={changeViewToUserLogin}>Go Back to Sign In?</div>
        </form>
    );
}
const mapStateToProps = createStructuredSelector({
    viewHidden: selectForgotPasswordViewHidden,
    fetching: selectWaitingForData
});

const mapDispatchToProps = (dispatch) => {
    return {
        sendResetLink: (data) => dispatch(sendResetLink(data)),
        changeViewToUserLogin: () => dispatch(changeViewToUserLogin()),
        setLoadingStatus: (data) => dispatch(setLoadingStatusForSignInSignUp(data)),
        showFailureToastMessage: (data) => dispatch(showFailureToastMessage(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForgotPassword);
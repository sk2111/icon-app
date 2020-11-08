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
import { changeViewToUserLogin, sendResetLinkStart, sendResetLinkFailure, clearForgotPasswordError } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectForgotPasswordErrorMessage, selectForgotPasswordViewHidden, selectWaitingForData } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';



const SignInForgotPassword = ({ viewHidden, fetching, sendResetLinkStart, clearForgotPasswordError,
    sendResetLinkFailure, errorMessage, changeViewToUserLogin }) => {

    const [resetDetails, setResetDetails] = useState({ email: '' });
    const btnClass = fetching ? 'disable-btn' : '';

    const handleForgotPassEmailChange = (e) => {
        const { name, value } = e.target;
        if (errorMessage) {
            clearForgotPasswordError();
        }
        setResetDetails({ ...resetDetails, [name]: value });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(resetDetails.email)) {
            sendResetLinkFailure({ message: 'Please enter Soliton mail ID' });
            return;
        }
        sendResetLinkStart({ email: resetDetails.email });
    };

    if (viewHidden) return null;

    return (
        <form autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
            <h3 className={styles.header}>Forgot password</h3>
            <p className={styles.message}>Enter the Soliton mail address associated with your account to get a reset link.</p>
            <FormInput rootClass="mt-40" name="email" label="Soliton mail address" type="email" value={resetDetails.email} required autoComplete="on" handleInputChange={handleForgotPassEmailChange} />
            {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen`}>
                <CustomButton loading={fetching} type="submit">Send Reset Link</CustomButton>
            </div>
            <div className={`${styles.actionLabel} perfect-cen`}>
                Back to <span className={styles.signInBtn} onClick={changeViewToUserLogin}>Sign In?</span>
            </div>
        </form>
    );
}
const mapStateToProps = createStructuredSelector({
    viewHidden: selectForgotPasswordViewHidden,
    fetching: selectWaitingForData,
    errorMessage: selectForgotPasswordErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        sendResetLinkStart: (data) => dispatch(sendResetLinkStart(data)),
        sendResetLinkFailure: (data) => dispatch(sendResetLinkFailure(data)),
        changeViewToUserLogin: () => dispatch(changeViewToUserLogin()),
        clearForgotPasswordError: () => dispatch(clearForgotPasswordError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForgotPassword);
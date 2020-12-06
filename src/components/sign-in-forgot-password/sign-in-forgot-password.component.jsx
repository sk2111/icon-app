//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
//css
import styles from './sign-in-forgot-password.module.css';
//components
import FormInput from '../../components/form-input/form-input.component';
import LoadingButton from '../../components/custom-button/custom-button.component';
import RenderView from '../../components/render-view/render-view.component';
//actions
import { sendResetLinkStart, sendResetLinkFailure, clearAuthError } from '../../redux/auth/auth.actions';
//reselect
import { selectWaitingForData, selectErrorMessage } from '../../redux/auth/auth.selectors';
//constants
import { FORGOT_PASSWORD_INVALID_ERROR_MAIL_MESSAGE } from '../../utilities/auth.messages';
//utilities
import { isValidMail } from '../../utilities/validator.utils';
import { SIGN_IN_ROUTE_PATH } from '../../utilities/route.paths';



const SignInForgotPassword = ({ fetching, sendResetLinkStart, clearAuthError,
    sendResetLinkFailure, errorMessage }) => {

    const [resetDetails, setResetDetails] = useState({ email: '' });

    const clearAuthErrorMessage = () => {
        if (errorMessage) {
            clearAuthError();
        }
    };

    const handleForgotPassEmailChange = (e) => {
        const { name, value } = e.target;
        clearAuthErrorMessage();
        setResetDetails({ ...resetDetails, [name]: value });
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(resetDetails.email)) {
            sendResetLinkFailure(FORGOT_PASSWORD_INVALID_ERROR_MAIL_MESSAGE);
            return;
        }
        sendResetLinkStart({ email: resetDetails.email });
    };

    return (
        <form className={styles.container} autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
            <h3 className={styles.header}>Forgot password</h3>
            <p className={styles.message}>Enter the Soliton mail address associated with your account to get a reset link.</p>
            <FormInput className="mt-25" name="email" label="Soliton mail address" type="email" value={resetDetails.email}
                required autoComplete="on" handleInputChange={handleForgotPassEmailChange} />
            <RenderView renderIfTrue={errorMessage}>
                <p className={styles.errorMessage}>{errorMessage}</p>
            </RenderView>
            <div className={styles.buttonCon}>
                <LoadingButton loading={fetching} type="submit">Send Reset Link</LoadingButton>
            </div>
            <div className={styles.actionLabel}>
                Back to
                <Link to={SIGN_IN_ROUTE_PATH} className={styles.signInLink} onClick={clearAuthErrorMessage}>Sign In?</Link>
            </div>
        </form>
    );
}
const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        sendResetLinkStart: (data) => dispatch(sendResetLinkStart(data)),
        sendResetLinkFailure: (data) => dispatch(sendResetLinkFailure(data)),
        clearAuthError: () => dispatch(clearAuthError())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForgotPassword);
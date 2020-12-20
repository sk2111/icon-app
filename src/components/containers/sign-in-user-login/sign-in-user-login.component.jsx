//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
//styles
import styles from './sign-in-user-login.module.css';
//components
import FormInput from '../../reusables/form-input/form-input.component';
import LoadingButton from '../loading-button/loading-button.component';
import FormInputPassword from '../../reusables/form-input-password/form-input-password.component';
import RenderView from '../render-view/render-view.component';
//actions 
import { userLoginStart, userLoginFailure, clearAuthError } from '../../../redux/auth/auth.actions';
//reselect
import { selectWaitingForData, selectErrorMessage, selectUserMessage } from '../../../redux/auth/auth.selectors';
//constants
import { USER_LOGIN_INVALID_ERROR_MAIL_MESSAGE } from '../../../utilities/auth.messages';
//utilities
import { isValidMail } from '../../../utilities/validator.utils';
import { SIGN_UP_ROUTE_PATH, FORGOT_PASSWORD_ROUTE_PATH } from '../../../utilities/route.paths';


const SignInUserLogin = ({ fetching, errorMessage, userMessage, userLoginStart, userLoginFailure, clearAuthError }) => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });

    const { email, password } = userDetails;

    const clearAuthErrorMessage = () => {
        if (errorMessage) {
            clearAuthError();
        }
    };

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        if (!isValidMail(email)) {
            userLoginFailure(USER_LOGIN_INVALID_ERROR_MAIL_MESSAGE);
            return;
        }
        if (password) {
            userLoginStart({ email, password });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target || e;
        clearAuthErrorMessage();
        setUserDetails({ ...userDetails, [name]: value });
    };

    return (
        <form className={styles.loginForm} autoComplete="on" onSubmit={handleUserLoginSubmit}>
            <p className={styles.userMessage}>{userMessage}</p>
            <FormInput name="email" label="Soliton mail address" value={email} type="email"
                required autoComplete="on" handleInputChange={handleInputChange} />
            <FormInputPassword name="password" label="Password" value={password} handleValueChange={handleInputChange} />
            <RenderView renderIfTrue={errorMessage}>
                <div className={styles.errorCon}>
                    <p className={styles.erroMessage}>{errorMessage}</p>
                </div>
            </RenderView>
            <div className={styles.forgotLabel}>
                <Link to={FORGOT_PASSWORD_ROUTE_PATH} className={styles.actionLabel} onClick={clearAuthErrorMessage}>Forgot your password?</Link>
            </div>
            <div className={styles.buttonCon}>
                <LoadingButton type="submit" loading={fetching}>Sign In</LoadingButton>
            </div>
            <div className={styles.linkContainer}>
                <div className={styles.signupLabel}>Don't have an account?</div>
                <Link to={SIGN_UP_ROUTE_PATH} className={styles.signupLink} onClick={clearAuthErrorMessage}>Sign up</Link>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    userMessage: selectUserMessage,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginStart: (data) => dispatch(userLoginStart(data)),
        userLoginFailure: (data) => dispatch(userLoginFailure(data)),
        clearAuthError: () => dispatch(clearAuthError())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInUserLogin);





//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
//styles
import styles from './sign-in-user-login.module.css';
//components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//actions 
import { userLoginStart, userLoginFailure, clearAuthError } from '../../redux/auth/auth.actions';
//reselect
import { selectWaitingForData, selectErrorMessage, selectUserMessage } from '../../redux/auth/auth.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';
import { BASE_PATH, SIGN_UP_PAGE_PATH, FORGOT_PASSWORD_PAGE_PATH } from '../../utilities/route.paths';


const SignInUserLogin = ({ fetching, errorMessage, userMessage, userLoginStart, userLoginFailure, clearAuthError }) => {

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
            clearAuthError();
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
    };

    return (
        <form className="mt-25 flex-col-cen" autoComplete="on" onSubmit={handleUserLoginSubmit}>
            {userMessage ? <p className={styles.userMessage}>{userMessage}</p> : null}
            <FormInput name="email" label="Soliton mail address" value={email} type="email" required autoComplete="on" handleInputChange={handleInputChange} />
            <FormInput rootClass="mt-14" name="password" label="Password" value={password} type="password" required autoComplete="on" handleInputChange={handleInputChange} />
            {renderErrorMessage(errorMessage)}
            <div className={`${styles.forgotLabel} flex-jus-end mt-15`}>
                <Link to={`${BASE_PATH}${FORGOT_PASSWORD_PAGE_PATH}`} className={styles.actionLabel}>Forgot your password?</Link>
            </div>
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen mt-24`}>
                <CustomButton type="submit" loading={fetching}>Sign In</CustomButton>
            </div>
            <div className="flex-row perfect-cen mt-33">
                <div className={styles.signupLabel}>Don't have an account?</div>
                <Link to={`${BASE_PATH}${SIGN_UP_PAGE_PATH}`} className={styles.signupLink} onClick={clearAuthError}>Sign up</Link>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    showUserMessage: selectUserMessage,
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





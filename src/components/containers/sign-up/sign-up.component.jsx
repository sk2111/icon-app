//libs
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//css
import styles from './sign-up.module.css';
//components
import LoadingButton from '../../reusables/loading-button/loading-button.component';
import FormInput from '../../reusables/form-input/form-input.component';
import FormInputPassword from '../../reusables/form-input-password/form-input-password.component';
//actions
import { userSignUpStart, userSignUpFailure, clearAuthError } from '../../../redux/auth/auth.actions';
//reselect
import { selectWaitingForData, selectErrorMessage } from '../../../redux/auth/auth.selectors';
//utilities
import { isValidMail } from '../../../utilities/validator.utils';
import { SIGN_IN_ROUTE_PATH } from '../../../utilities/route.paths';
//constants
import { SIGN_UP_INVALID_ERROR_MAIL_MESSAGE, SIGN_UP_PASSWORD_NOT_MATCH_MESSAGE } from '../../../utilities/auth.messages';

const SignUp = ({ userSignUpStart, userSignUpFailure, fetching, errorMessage, clearAuthError }) => {

    const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const { firstname, lastname, email, password, confirmPassword } = userDetails;

    const clearAuthErrorMessage = () => {
        if (errorMessage) {
            clearAuthError();
        }
    };

    const handleSignUpNewUser = (event) => {
        event.preventDefault();
        const passwordMatch = (password === confirmPassword);
        if (!isValidMail(email)) {
            userSignUpFailure(SIGN_UP_INVALID_ERROR_MAIL_MESSAGE);
            return;
        }
        if (!passwordMatch) {
            userSignUpFailure(SIGN_UP_PASSWORD_NOT_MATCH_MESSAGE);
            return;
        }
        if (firstname && lastname) {
            userSignUpStart({ firstname, lastname, email, password });
        }
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target || e;
        clearAuthErrorMessage();
        setUserDetails({ ...userDetails, [name]: value });
    };

    return (
        <div className={styles.formContainer}>
            <form autoComplete="on" onSubmit={handleSignUpNewUser}>
                <div className={styles.viewContainer}>
                    <FormInput
                        className={styles.firstName} inpClass="shortWidth" name="firstname"
                        value={firstname} label="First Name" type="text" required autoComplete="on"
                        handleInputChange={handleInputChange} />
                    <FormInput
                        className={styles.lastName} inpClass="shortWidth" name="lastname"
                        value={lastname} label="Last Name" type="text" required autoComplete="on"
                        handleInputChange={handleInputChange} />
                </div>
                <div className={styles.viewContainer}>
                    <FormInput className={styles.topMargin} inpClass="emailWidth" name="email"
                        value={email} label="Soliton mail address" type="email" required autoComplete="on"
                        handleInputChange={handleInputChange} />
                </div>
                <div className={styles.viewContainer}>
                    <FormInputPassword className={styles.topMargin} inpClass="shortWidth" label="Password"
                        name="password" value={password} handleValueChange={handleInputChange} />
                    <FormInputPassword className={styles.confirmPass} inpClass="shortWidth" label="Confirm Password"
                        name="confirmPassword" value={confirmPassword} handleValueChange={handleInputChange} />
                </div>
                <div className={styles.errorContainer}>
                    <span className={styles.errorText}>{errorMessage}</span>
                </div>
                <div className={styles.buttonCon}>
                    <LoadingButton loading={fetching} type="submit">Sign up</LoadingButton>
                </div>
                <div className={styles.navigationCon}>
                    <div className={styles.signinLabel}>Don't have an account?</div>
                    <Link to={SIGN_IN_ROUTE_PATH} className={styles.signinLink} onClick={clearAuthErrorMessage}>Sign in</Link>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUpStart: (data) => dispatch(userSignUpStart(data)),
        userSignUpFailure: (data) => dispatch(userSignUpFailure(data)),
        clearAuthError: () => dispatch(clearAuthError())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
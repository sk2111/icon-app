//libs
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//css
import styles from './sign-up.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
//actions
import { userSignUpStart, userSignUpFailure, clearAuthError } from '../../redux/auth/auth.actions';
//reselect
import { selectWaitingForData, selectErrorMessage } from '../../redux/auth/auth.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';
import { SIGN_IN_ROUTE_PATH } from '../../utilities/route.paths';
//constants
import { SIGN_UP_INVALID_ERROR_MAIL_MESSAGE, SIGN_UP_PASSWORD_NOT_MATCH_MESSAGE } from '../../utilities/auth.messages';
//static
import { ReactComponent as HideSvg } from '../../assests/hide-password.svg';
import { ReactComponent as ShowSvg } from '../../assests/show-password.svg';

const SignUp = ({ userSignUpStart, userSignUpFailure, fetching, errorMessage, clearAuthError }) => {

    const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [passwordViews, setPasswordViews] = useState({ passwordView: true, confirmPasswordView: true });

    const { firstname, lastname, email, password, confirmPassword } = userDetails;
    const { passwordView, confirmPasswordView } = passwordViews;

    const passwordType = passwordView ? 'password' : 'text';
    const confirmPasswordType = confirmPasswordView ? 'password' : 'text';

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
        const { value, name } = e.target;
        clearAuthErrorMessage();
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleViewHidePassword = (e) => {
        const name = e.currentTarget.getAttribute("name");
        setPasswordViews({ ...passwordViews, [name]: !passwordViews[name] });
    };

    const renderViewOrHideSvg = (toHideValue, type) => {
        return (toHideValue ?
            <HideSvg name={type} className={styles.passwordSvg} onClick={handleViewHidePassword} /> :
            <ShowSvg name={type} className={styles.passwordSvg} onClick={handleViewHidePassword} />)
    };

    return (
        <div className={`flex-col align-cen`}>
            <form autoComplete="on" onSubmit={handleSignUpNewUser}>
                <div className="flex-row-acen">
                    <FormInput className="mt-36" inpClass="shortWidth" name="firstname" value={firstname} label="First Name" type="text" required autoComplete="on" handleInputChange={handleInputChange} />
                    <FormInput className="ml-24 mt-36" inpClass="shortWidth" name="lastname" value={lastname} label="Last Name" type="text" required autoComplete="on" handleInputChange={handleInputChange} />
                </div>
                <div className="flex-row-acen">
                    <FormInput className="mt-22" inpClass="emailWidth" name="email" value={email} label="Soliton mail address" type="email" required autoComplete="on" handleInputChange={handleInputChange} />
                </div>
                <div className="flex-row-acen">
                    <div className="flex-row-acen pos-rel">
                        <FormInput className="mt-22" inpClass="shortWidth" name="password" value={password} label="Password" type={passwordType} required autoComplete="on" handleInputChange={handleInputChange} />
                        {renderViewOrHideSvg(passwordView, 'passwordView')}
                    </div>
                    <div className="flex-row-acen pos-rel">
                        <FormInput className="ml-24 mt-22" inpClass="shortWidth" name="confirmPassword" value={confirmPassword} label="Confirm Password" type={confirmPasswordType} required autoComplete="on" handleInputChange={handleInputChange} />
                        {renderViewOrHideSvg(confirmPasswordView, 'confirmPasswordView')}
                    </div>
                </div>
                <div className={`${styles.errorContainer} perfect-cen`}>
                    <span className={styles.errorText}>{errorMessage}</span>
                </div>
                <div className={styles.buttonCon}>
                    <CustomButton loading={fetching} type="submit">Sign up</CustomButton>
                </div>
                <div className="flex-row perfect-cen mt-33">
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
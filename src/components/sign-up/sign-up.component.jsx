//libs
import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
//css
import styles from './sign-up.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
//actions
import { userSignUpStart, setLoadingStatusForSignInSignUp, changeViewToSignIn, userSignUpFailure } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//reselect
import { selectWaitingForData, selectSignUpError } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
//utilities
import { isValidMail } from '../../utilities/validator.utils';
//static
import { ReactComponent as HideSvg } from '../../assests/hide.svg';

const SignUp = ({ userSignUpStart, userSignUpFailure, fetching, changeViewToSignIn, setLoadingStatusForSignInSignUp, signUpError }) => {

    const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [passwordViewHidden, setPasswordViewHidden] = useState({ passwordView: true, confirmPasswordView: true });

    const { firstname, lastname, email, password, confirmPassword } = userDetails;
    const { passwordView, confirmPasswordView } = passwordViewHidden;

    const passwordType = passwordView ? 'password' : 'text';
    const confirmPasswordType = confirmPasswordView ? 'password' : 'text';

    const handleSignUpNewUser = (event) => {
        event.preventDefault();
        const passwordMatch = (password === confirmPassword);
        if (passwordMatch && isValidMail(email)) {
            setLoadingStatusForSignInSignUp({ fetching: true });
            userSignUpStart({ firstname, lastname, email, password });
            return;
        }
        if (!passwordMatch) {
            userSignUpFailure({ message: 'Password & Confirm password don\'t match' });
            return;
        }
        userSignUpFailure({ message: 'Please enter a valid Soliton mail address' });
    }
    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }
    const handleViewPassword = (e) => {
        const name = e.currentTarget.getAttribute("name");
        const value = !passwordViewHidden[name];
        setPasswordViewHidden({ ...passwordViewHidden, [name]: value });
    }
    return (
        <div className={`flex-col align-cen`}>
            <form autoComplete="on" onSubmit={handleSignUpNewUser}>
                <div className="flex-row align-cen">
                    <FormInput rootClass="mt-36" inpClass="shortWidth" name="firstname" value={firstname} label="First Name" type="text" required autoComplete="on" handleInputChange={handleInputChange} />
                    <FormInput rootClass="ml-24 mt-36" inpClass="shortWidth" name="lastname" value={lastname} label="Last Name" type="text" required autoComplete="on" handleInputChange={handleInputChange} />
                </div>
                <FormInput rootClass="mt-22" inpClass="emailWidth" name="email" value={email} label="Soliton mail address" type="email" required autoComplete="on" handleInputChange={handleInputChange} />
                <div className="flex-row align-cen">
                    <div className="flex-row align-cen pos-rel">
                        <FormInput rootClass="mt-22" inpClass="shortWidth" name="password" value={password} label="Password" type={passwordType} required autoComplete="on" handleInputChange={handleInputChange} />
                        <HideSvg name="passwordView" className={styles.passwordSvg} onClick={handleViewPassword} />
                    </div>
                    <div className="flex-row align-cen pos-rel">
                        <FormInput rootClass="ml-24 mt-22" inpClass="shortWidth" name="confirmPassword" value={confirmPassword} label="Confirm Password" type={confirmPasswordType} required autoComplete="on" handleInputChange={handleInputChange} />
                        <HideSvg name="confirmPasswordView" className={styles.passwordSvg} onClick={handleViewPassword} />
                    </div>
                </div>
                <div className={`${styles.errorContainer} perfect-cen`}>
                    <span className={styles.errorText}>{signUpError}</span>
                </div>
                <div className={`${styles.buttonCon} ${fetching ? 'disable-btn' : ''} perfect-cen`}>
                    <CustomButton loading={fetching} type="submit">Sign up</CustomButton>
                </div>
                <div className="flex-row perfect-cen mt-33">
                    <div className={styles.signinLabel}>Don't have an account?</div>
                    <div className={styles.signinBtn} onClick={changeViewToSignIn}>Sign in</div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    fetching: selectWaitingForData,
    signUpError: selectSignUpError
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUpStart: (data) => dispatch(userSignUpStart(data)),
        userSignUpFailure: (data) => dispatch(userSignUpFailure(data)),
        setLoadingStatusForSignInSignUp: (data) => dispatch(setLoadingStatusForSignInSignUp(data)),
        changeViewToSignIn: () => dispatch(changeViewToSignIn()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
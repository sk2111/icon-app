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
import { userSignUpStart, setLoadingStatusForSignInSignUp } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
import { showFailureToastMessage } from '../../redux/toast-message/toast-message.actions';
//reselect
import { selectWaitingForData } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';

const SignUp = ({ userSignUpStart, waitingForData, showFailureToastMessage, setLoadingStatusForSignInSignUp }) => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const { name, email, password, confirmPassword } = userDetails;

    const handleSignUpNewUser = (event) => {
        event.preventDefault();
        const validMail = email.match(/@/g) || [];
        if ((password === confirmPassword) && email.includes('@solitontech.com') && validMail.length === 1) {
            setLoadingStatusForSignInSignUp({ fetching: true });
            userSignUpStart({ name, email, password });
            return;
        }
        if (password !== confirmPassword) {
            showFailureToastMessage({ message: 'Password and Confirm password doesnt match', timeInSeconds: 6 });
            return;
        }
        showFailureToastMessage({ message: 'Please enter a valid Soliton mailId', timeInSeconds: 6 });
    }
    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }
    return (
        <div className={`flex-col align-cen`}>
            <form autoComplete="on" onSubmit={handleSignUpNewUser}>
                <FormInput name="name" value={name} label="Name" type="text" required autoComplete="on" handleInputChange={handleInputChange} />
                <FormInput name="email" value={email} label="Soliton mail address" type="email" required autoComplete="on" handleInputChange={handleInputChange} />
                <FormInput name="password" value={password} label="Password" type="password" required autoComplete="on" handleInputChange={handleInputChange} />
                <FormInput name="confirmPassword" value={confirmPassword} label="Confirm Password" type="password" required autoComplete="on" handleInputChange={handleInputChange} />
                <div className={`${styles.buttonCon} ${waitingForData ? 'disable-btn' : ''} perfect-cen`}>
                    <CustomButton label="sign Up" type="submit"></CustomButton>
                </div>
            </form>

        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    waitingForData: selectWaitingForData
});

const mapDispatchToProps = (dispatch) => {
    return {
        userSignUpStart: (data) => dispatch(userSignUpStart(data)),
        setLoadingStatusForSignInSignUp: (data) => dispatch(setLoadingStatusForSignInSignUp(data)),
        showFailureToastMessage: (data) => dispatch(showFailureToastMessage(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
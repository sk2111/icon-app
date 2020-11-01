//libs
import React from 'react';
//css
import styles from './sign-up.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
//actions

//reselect
const SignUp = () => {
    const handleSignUpNewUser = (event) => {
        event.preventDefault();
    }
    return (
        <div className={`flex-col align-cen`}>
            <form autoComplete="on" onSubmit={handleSignUpNewUser}>
                <FormInput label="Name" type="text" required autoComplete="on" />
                <FormInput label="Soliton mail address" type="email" required autoComplete="on" />
                <FormInput label="Password" type="password" required autoComplete="on" />
                <FormInput label="Confirm Password" type="password" required autoComplete="on" />
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="sign Up" type="submit"></CustomButton>
                </div>
            </form>

        </div>
    );
};

export default SignUp;
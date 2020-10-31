//libs
import React from "react";
//css
import styles from "./sign-in.module.css";
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignIn = () => {
    return (
        <div className={styles.signInContainer}>
            <form>
                <FormInput label="Soliton mail address" type="email" required />
                <FormInput label="Password" type="password" required />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`}>Forgot Password?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Log In" type="submit"></CustomButton>
                </div>
            </form>
            <form>
                <FormInput label="Soliton mail address" type="email" required />
                <div className={`${styles.actionLabel} flex-jus-end m-pointer`}>Go Back to Sign In?</div>
                <div className={`${styles.buttonCon} perfect-cen`}>
                    <CustomButton label="Send Reset Link"></CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

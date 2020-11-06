//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './login-header.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
//actions
import { changeViewToSignIn, changeViewToSignUp } from '../../redux/sign-in-sign-up/sign-in-sign-up.actions';
//static
import appLogo from '../../assests/applogo.svg';

const LoginHeader = ({ changeViewToSignIn, changeViewToSignUp }) => {
    return (
        <div className={styles.loginContainer}>
            <img className={styles.logo} alt="icon" src={appLogo} />
            <h1 className={styles.heading}>Soliton Icons</h1>
            <div className={styles.lineBreak}></div>
            <div className="flex-row">
                <CustomButton label="Login" onClick={changeViewToSignIn} />
                <p>or</p>
                <CustomButton label="Signup" onClick={changeViewToSignUp} />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewToSignIn: () => dispatch(changeViewToSignIn()),
        changeViewToSignUp: () => dispatch(changeViewToSignUp()),
    }
};

export default connect(null, mapDispatchToProps)(LoginHeader);
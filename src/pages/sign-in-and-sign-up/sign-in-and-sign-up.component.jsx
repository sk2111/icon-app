//libs
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
// css
import styles from './sign-in-and-sign-up.module.css';
//components
import LoginHeader from '../../components/login-header/login-header.component';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
//reselect
import { selectSignInViewHidden, selectSignUpViewHidden } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';

const SignInAndSignUpPage = ({ isSignInViewHidden, isSignUpViewHidden, ...otherProps }) => {
    console.log("signIn Component props", otherProps);
    return (
        <div className={`${styles.pageContainer} flex-row`}>
            <section className={`${styles.leftContainer} perfect-cen`}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
            </section>
            <section className={`${styles.rightContainer} perfect-cen`}>
                <div className={styles.rightContent}>
                    <LoginHeader />
                    {isSignInViewHidden ? null : <SignIn />}
                    {isSignUpViewHidden ? null : <SignUp />}
                </div>
            </section>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isSignInViewHidden: selectSignInViewHidden,
    isSignUpViewHidden: selectSignUpViewHidden
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
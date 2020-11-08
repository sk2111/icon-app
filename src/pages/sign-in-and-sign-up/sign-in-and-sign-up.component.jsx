//libs
import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// css
import styles from './sign-in-and-sign-up.module.css';
//components
import LoginHeader from '../../components/login-header/login-header.component';
import SignInUserLogin from '../../components/sign-in-user-login/sign-in-user-login.component';
import SignInForgotPassword from '../../components/sign-in-forgot-password/sign-in-forgot-password.component';
import SignUp from '../../components/sign-up/sign-up.component';
//reselect
import { selectSignInViewHidden, selectSignUpViewHidden } from '../../redux/sign-in-sign-up/sign-in-sign-up.selectors';
//constants
import { SIGN_IN_PAGE_PATH, SIGN_UP_PAGE_PATH, FORGOT_PASSWORD_PAGE_PATH } from '../../utilities/route.paths';

const SignInAndSignUpPage = ({ isSignInViewHidden, isSignUpViewHidden, currentUser, history, match, ...otherProps }) => {
    const { path } = match;
    useEffect(() => {
        if (currentUser?.uid) {
            //history.push('/');
        }
    });

    return (
        <div className={`${styles.pageContainer} flex-row`}>
            <section className={`${styles.leftContainer} perfect-cen`}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
            </section>
            <section className={`${styles.rightContainer}`}>
                <div className={styles.rightContent}>
                    <LoginHeader />
                    <Route exact path={`${path}${SIGN_IN_PAGE_PATH}`} component={SignInUserLogin} />
                    <Route exact path={`${path}${FORGOT_PASSWORD_PAGE_PATH}`} component={SignInForgotPassword} />
                    <Route exact path={`${path}${SIGN_UP_PAGE_PATH}`} component={SignUp} />
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
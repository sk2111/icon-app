//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// css
import styles from './sign-in-and-sign-up.module.css';
//components
import LoginHeader from '../../components/login-header/login-header.component';
import SignInUserLogin from '../../components/sign-in-user-login/sign-in-user-login.component';
import SignInForgotPassword from '../../components/sign-in-forgot-password/sign-in-forgot-password.component';
import SignUp from '../../components/sign-up/sign-up.component';
import RouteNotFound from '../../components/route-not-found/route-not-found.component';
//constants
import { ReactComponent as AnimAppLogo } from '../../assests/anim-applogo.svg';
import { LOADING_ANIM_LOGO_TIME } from '../../utilities/app.constants';

import { SIGN_IN_PAGE_PATH, SIGN_UP_PAGE_PATH, FORGOT_PASSWORD_PAGE_PATH, LANDING_PATH } from '../../utilities/route.paths';

const SignInAndSignUpPage = ({ currentUser, history, match }) => {
    const { path } = match;

    useEffect(() => {
        if (currentUser?.uid) {
            const timer = setTimeout(() => history.push(LANDING_PATH), LOADING_ANIM_LOGO_TIME);
            return () => clearTimeout(timer);
        }
    });

    const renderHelper = (currentUser) => {
        // return A animation logo and after a few sec redirect to Landing page
        if (currentUser?.uid) { return <AnimAppLogo />; }
        return (
            <div className={`${styles.pageContainer} flex-row`}>
                <section className={`${styles.leftContainer} perfect-cen`}>
                    <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
                </section>
                <section className={`${styles.rightContainer}`}>
                    <div className={styles.rightContent}>
                        <LoginHeader />
                        <Switch>
                            <Route exact path={`${path}${SIGN_IN_PAGE_PATH}`} component={SignInUserLogin} />
                            <Route exact path={`${path}${FORGOT_PASSWORD_PAGE_PATH}`} component={SignInForgotPassword} />
                            <Route exact path={`${path}${SIGN_UP_PAGE_PATH}`} component={SignUp} />
                            <Route component={RouteNotFound}></Route>
                        </Switch>
                    </div>
                </section>
            </div>
        )
    };

    return (
        <React.Fragment>
            { renderHelper(currentUser)}
        </React.Fragment>
    );
};

export default SignInAndSignUpPage;
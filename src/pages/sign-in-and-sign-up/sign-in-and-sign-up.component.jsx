//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// css
import styles from './sign-in-and-sign-up.module.css';
//components
import LoginHeader from '../../components/containers/login-header/login-header.component';
import SignInUserLogin from '../../components/containers/sign-in-user-login/sign-in-user-login.component';
import SignInForgotPassword from '../../components/containers/sign-in-forgot-password/sign-in-forgot-password.component';
import SignUp from '../../components/containers/sign-up/sign-up.component';
import RouteNotFound from '../../components/containers/route-not-found/route-not-found.component';
//constants
import { ReactComponent as AnimAppLogo } from '../../assests/anim-applogo.svg';
import { LOADING_ANIM_LOGO_TIME } from '../../utilities/app.constants';
//route constants
import {
    SIGN_IN_ROUTE_PATH, SIGN_UP_ROUTE_PATH,
    FORGOT_PASSWORD_ROUTE_PATH, LANDING_ROUTE_PATH
} from '../../utilities/route.paths';


const SignInAndSignUpPage = ({ currentUser, history }) => {

    useEffect(() => {
        if (currentUser?.uid) {
            setTimeout(() => history.push(LANDING_ROUTE_PATH), LOADING_ANIM_LOGO_TIME);
        }
    });

    if (currentUser?.uid) return <div className={styles.logoContainer}><AnimAppLogo className={styles.appLogo} /></div>;

    return (
        <div className={styles.pageContainer}>
            <section className={styles.leftContainer}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
            </section>
            <section className={styles.rightContainer}>
                <div className={styles.rightContent}>
                    <LoginHeader />
                    <Switch>
                        <Route exact path={SIGN_IN_ROUTE_PATH} render={(routeProps) => <SignInUserLogin {...routeProps} />} />
                        <Route exact path={FORGOT_PASSWORD_ROUTE_PATH} render={(routeProps) => <SignInForgotPassword {...routeProps} />} />
                        <Route exact path={SIGN_UP_ROUTE_PATH} component={SignUp} />
                        <Route component={RouteNotFound}></Route>
                    </Switch>
                </div>
            </section>
        </div>
    );
};

export default SignInAndSignUpPage;
import React from 'react';
import styles from './sign-in-and-sign-up.module.css';

import LoginHeader from '../../components/login-header/login-header.component';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUpPage = (props) => {
    console.log("signIn Component props", props);
    return (
        <div className={`${styles.pageContainer} flex-row`}>
            <section className={`${styles.leftContainer} perfect-cen`}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
            </section>
            <section className={`${styles.rightContainer} perfect-cen`}>
                <div className={styles.rightContent}>
                    <LoginHeader />
                    <SignIn />
                    <SignUp />
                </div>
            </section>
        </div>
    );
};

export default SignInAndSignUpPage;
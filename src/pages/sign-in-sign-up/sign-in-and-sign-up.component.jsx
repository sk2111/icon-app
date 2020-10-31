import React from 'react';
import styles from './sign-in-and-sign-up.module.css';


import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage = (props) => {
    console.log("signIn Component props", props);
    return (
        <div className={`${styles.pageContainer} flex-row`}>
            <section className={`${styles.leftContainer} perfect-cen`}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg" />
            </section>
            <section className={`${styles.rightContainer} perfect-cen`}>
                <div className={styles.rightContent}>
                    <div>
                        <img alt="icon" src="" />
                        <h1>Soliton Icon App</h1>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignInAndSignUpPage;
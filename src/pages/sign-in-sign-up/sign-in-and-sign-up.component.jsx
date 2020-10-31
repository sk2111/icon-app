import React from 'react';
import styles from './sign-in-and-sign-up.module.css';


import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage = (props) => {
    console.log("signIn Component props",props);
    return(
        <div className={`${styles.pageContainer} flex-row`}>
            <div className={`${styles.leftContainer} perfect-cen`}>
                <img className={styles.illustration} alt="illustration" src="../../loginpage-placeholder.jpg"/>
            </div>
            <SignIn />
        </div>
    );
};

export default SignInAndSignUpPage;
//libs
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//css
import styles from './sign-out.module.css';
//actions
import { userSignOutSuccess } from '../../redux/user/user.actions';
//static
import { ReactComponent as AnimAppLogo } from '../../assests/anim-applogo.svg';
import { SIGNOUT_ANIMATION_LOADING_TIME } from '../../utilities/app.constants';

const SignOut = ({ userSignOutSuccess }) => {

    useEffect(() => {
        console.log(" I am use effect of signout")
        setTimeout(() => {
            userSignOutSuccess();
        }, SIGNOUT_ANIMATION_LOADING_TIME);
    }, [userSignOutSuccess]);

    return (
        <div className={styles.container}>
            <h1>Sign out </h1>
            <AnimAppLogo />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOutSuccess: () => dispatch(userSignOutSuccess())
    }
}
export default connect(null, mapDispatchToProps)(SignOut);
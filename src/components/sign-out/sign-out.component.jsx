//libs
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//css
import styles from './sign-out.module.css';
//actions
import { userSignOutSuccess } from '../../redux/user/user.actions';
//Route constants
import { GO_TO_SIGNIN } from '../../utilities/route.paths';
//static
import { ReactComponent as AnimAppLogo } from '../../assests/anim-applogo.svg';
import { SIGNOUT_ANIMATION_LOADING_TIME } from '../../utilities/app.constants';

const SignOut = ({ userSignOutSuccess }) => {
    const history = useHistory();

    useEffect(() => {
        //clear current user in redux and got to sign in page 
        setTimeout(() => {
            userSignOutSuccess();
            history.replace(GO_TO_SIGNIN);
        }, SIGNOUT_ANIMATION_LOADING_TIME);

    }, [history, userSignOutSuccess]);

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
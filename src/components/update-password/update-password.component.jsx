//libs
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './update-password.module.css';
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//reselect
import { selectCurrentUser } from '../../redux/user/user.selectors';
//actions
//import {  } from '../../redux/auth/auth.actions';
//route constants
import { LANDING_PATH, GO_TO_SIGNIN } from '../../utilities/route.paths';
//static
import { ReactComponent as HideSvg } from '../../assests/hide-password.svg';
import { ReactComponent as ShowSvg } from '../../assests/show-password.svg';

const UpdatePassword = ({ currentUser }) => {
    const errorMessage = 'Hai I am error message', fetching = false;
    const clearAuthErrorMessage = () => {

    };

    const history = useHistory();
    const [passwordDetails, setPasswordDetails] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [passwordViews, setPasswordViews] = useState({ currentPasswordView: true, newPasswordView: true, confirmNewPasswordView: true });

    const { currentPassword, newPassword, confirmNewPassword } = passwordDetails;
    const { currentPasswordView, newPasswordView, confirmNewPasswordView } = passwordViews;

    const handleUpdatePasswordSubmit = (e) => {
        e.preventDefault();
        if ((newPassword === confirmNewPassword) && newPassword.length) {
            //todo : Do reset password logic here
            return;
        }
        //display error message here
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        clearAuthErrorMessage();
        setPasswordDetails({ ...passwordDetails, [name]: value });
    };

    const handleViewHidePassword = (e) => {
        const name = e.currentTarget.getAttribute("name");
        setPasswordViews({ ...passwordViews, [name]: !passwordViews[name] });
    };

    const renderFormInput = (label, formName, value, showAsPassword, svgName) => {
        const formType = showAsPassword ? 'password' : 'text';
        return (
            <div className="flex-row-acen pos-rel">
                <FormInput className="mt-22" name={formName} value={value}
                    label={label} type={formType} required autoComplete="off" handleInputChange={handleInputChange} />
                {showAsPassword ? <HideSvg name={svgName} className={styles.passwordSvg} onClick={handleViewHidePassword} /> :
                    <ShowSvg name={svgName} className={styles.passwordSvg} onClick={handleViewHidePassword} />}
            </div>
        );
    };
    //useeffect for redirect to sign in if user not logged
    useEffect(() => {
        if (!currentUser?.uid) {
            history.replace(GO_TO_SIGNIN);
        }
    });

    // If user is not logged in redirect to signin 
    if (!currentUser?.uid) return null;

    return (
        <form className={styles.container} autoComplete="on" onSubmit={handleUpdatePasswordSubmit}>
            <h3 className={styles.header}>Update password</h3>
            {renderFormInput("Current Password", "currentPassword", currentPassword, currentPasswordView, 'currentPasswordView')}
            {renderFormInput("New Password", "newPassword", newPassword, newPasswordView, 'newPasswordView')}
            {renderFormInput("Confirm New Password", "confirmNewPassword", confirmNewPassword, confirmNewPasswordView, 'confirmNewPasswordView')}
            <div className={`${styles.errorContainer} perfect-cen`}>
                <span className={styles.errorText}>{errorMessage}</span>
            </div>
            <div className={`${styles.buttonCon} perfect-cen`}>
                <CustomButton loading={fetching} type="submit">Reset password</CustomButton>
            </div>
            <div className={`${styles.actionLabel} perfect-cen mt-33`}>
                Back to
                <Link to={`${LANDING_PATH}`} className={styles.homeLink} onClick={clearAuthErrorMessage}>Home Page?</Link>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UpdatePassword);
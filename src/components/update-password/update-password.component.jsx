//libs
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//css
import styles from './update-password.module.css';
//components
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
//actions
//import {  } from '../../redux/auth/auth.actions';
//constants
import { LANDING_PATH } from '../../utilities/route.paths';
//static
import { ReactComponent as HideSvg } from '../../assests/hide-password.svg';
import { ReactComponent as ShowSvg } from '../../assests/show-password.svg';

const UpdatePassword = () => {
    const errorMessage = 'Hai I am error message', fetching = false;
    const clearAuthErrorMessage = () => {

    };


    const [passwordDetails, setPasswordDetails] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [passwordViews, setPasswordViews] = useState({ currentPasswordView: true, newPasswordView: true, confirmNewPasswordView: true });

    const { currentPassword, newPassword, confirmNewPassword } = passwordDetails;
    const { currentPasswordView, newPasswordView, confirmNewPasswordView } = passwordViews;

    const handleUpdatePasswordSubmit = (e) => {
        e.preventDefault();
        if((newPassword === confirmNewPassword) && newPassword.length)
        {
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


export default UpdatePassword;
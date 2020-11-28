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
    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
    };
    const clearAuthErrorMessage = () => {

    };


    const [passwordDetails, setPasswordDetails] = useState({ currentPassword: '', password: '', confirmPassword: '' });
    const [passwordViews, setPasswordViews] = useState({ currentPasswordView: true, passwordView: true, confirmPasswordView: true });

    const { currentPassword, password, confirmPassword } = passwordDetails;
    const { currentPasswordView, passwordView, confirmPasswordView } = passwordViews;

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        clearAuthErrorMessage();
        setPasswordDetails({ ...passwordDetails, [name]: value });
    };

    const handleViewHidePassword = (e) => {
        const name = e.currentTarget.getAttribute("name");
        setPasswordViews({ ...passwordViews, [name]: !passwordViews[name] });
    };

    const renderViewOrHideSvg = (toHideValue, type) => {
        return (toHideValue ?
            <HideSvg name={type} className={styles.passwordSvg} onClick={handleViewHidePassword} /> :
            <ShowSvg name={type} className={styles.passwordSvg} onClick={handleViewHidePassword} />)
    };

    const getFormType = (isTypePassword) => {
        return isTypePassword ? 'password' : 'text';
    };

    return (
        <form className={styles.container} autoComplete="on" onSubmit={handleForgotPasswordSubmit}>
            <h3 className={styles.header}>Update password</h3>
            <div className="flex-row-acen pos-rel">
                <FormInput className="mt-22" name="currentPassword" value={currentPassword}
                    label="Current Password" type={getFormType(currentPasswordView)} required autoComplete="off" handleInputChange={handleInputChange} />
                {renderViewOrHideSvg(currentPasswordView, 'currentPasswordView')}
            </div>
            <div className="flex-row-acen pos-rel">
                <FormInput className="mt-22" name="password" value={password}
                    label="Password" type={getFormType(passwordView)} required autoComplete="off" handleInputChange={handleInputChange} />
                {renderViewOrHideSvg(passwordView, 'passwordView')}
            </div>
            <div className="flex-row-acen pos-rel">
                <FormInput className="mt-22" name="confirmPassword" value={confirmPassword}
                    label="Confirm Password" type={getFormType(confirmPasswordView)} required autoComplete="off" handleInputChange={handleInputChange} />
                {renderViewOrHideSvg(confirmPasswordView, 'confirmPasswordView')}
            </div>
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
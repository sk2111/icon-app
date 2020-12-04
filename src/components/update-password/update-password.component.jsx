//libs
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './update-password.module.css';
//components
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInputPassword from '../../components/form-input-password/form-input-password.component';
//reselect
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectWaitingForData, selectUserMessage, selectErrorMessage } from '../../redux/auth/auth.selectors';
//actions
import { clearAuthError, updateNewPasswordStart, updateNewPasswordFailure } from '../../redux/auth/auth.actions';
//route constants
import { LANDING_PATH, GO_TO_SIGNIN } from '../../utilities/route.paths';
//constants
import { UPDATE_PASSWORD_NOT_MATCH_MESSAGE } from '../../utilities//auth.messages';


const UpdatePassword = ({ currentUser, fetching, userMessage, errorMessage, updateNewPasswordStart, updateNewPasswordFailure, clearAuthErrorMessage }) => {

    const INITIAL_STATE = { currentPassword: '', newPassword: '', confirmNewPassword: '' };
    const history = useHistory();
    const [passwordDetails, setPasswordDetails] = useState(INITIAL_STATE);

    const { currentPassword, newPassword, confirmNewPassword } = passwordDetails;

    const btnClass = fetching ? 'disable-btn' : '';

    const handleUpdatePasswordSubmit = (e) => {
        e.preventDefault();
        if ((newPassword === confirmNewPassword) && newPassword.length) {
            updateNewPasswordStart({ currentPassword, newPassword });
            setPasswordDetails({ ...INITIAL_STATE });
            return;
        }
        updateNewPasswordFailure(UPDATE_PASSWORD_NOT_MATCH_MESSAGE);
    };

    const handleValueChange = ({ value, name }) => {
        if (errorMessage) {
            clearAuthErrorMessage();
        }
        setPasswordDetails({ ...passwordDetails, [name]: value });
    };

    useEffect(() => {
        if (!currentUser?.uid) {
            history.replace(GO_TO_SIGNIN);
        }
    });

    if (!currentUser?.uid) return null;

    return (
        <form className={styles.container} autoComplete="on" onSubmit={handleUpdatePasswordSubmit}>
            <h3 className={styles.header}>Update password</h3>
            {userMessage ? <p className={styles.userMessage}>{userMessage}</p> : null}
            <FormInputPassword label="Current Password" name="currentPassword" value={currentPassword} handleValueChange={handleValueChange} />
            <FormInputPassword label="New Password" name="newPassword" value={newPassword} handleValueChange={handleValueChange} />
            <FormInputPassword label="Confirm New Password" name="confirmNewPassword" value={confirmNewPassword} handleValueChange={handleValueChange} />
            <div className={`${styles.errorContainer} perfect-cen`}>
                <span className={styles.errorText}>{errorMessage}</span>
            </div>
            <div className={`${styles.buttonCon} ${btnClass} perfect-cen`}>
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
    fetching: selectWaitingForData,
    userMessage: selectUserMessage,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        clearAuthErrorMessage: () => dispatch(clearAuthError()),
        updateNewPasswordStart: (newPassword) => dispatch(updateNewPasswordStart(newPassword)),
        updateNewPasswordFailure: (message) => dispatch(updateNewPasswordFailure(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
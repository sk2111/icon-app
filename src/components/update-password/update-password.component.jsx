//libs
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './update-password.module.css';
//components
import LoadingButton from '../loading-button/loading-button.component';
import FormInputPassword from '../reusables/form-input-password/form-input-password.component';
import ProtectedRoute from '../protected-route/protected-route.component';
import RenderView from '../render-view/render-view.component';
//reselect
import { selectWaitingForData, selectUserMessage, selectErrorMessage } from '../../redux/auth/auth.selectors';
//actions
import { clearAuthError, updateNewPasswordStart, updateNewPasswordFailure } from '../../redux/auth/auth.actions';
//route constants
import { LANDING_ROUTE_PATH } from '../../utilities/route.paths';
//constants
import { UPDATE_PASSWORD_NOT_MATCH_MESSAGE } from '../../utilities//auth.messages';


const UpdatePassword = ({ fetching, userMessage, errorMessage, updateNewPasswordStart, updateNewPasswordFailure, clearAuthErrorMessage }) => {

    const INITIAL_STATE = { currentPassword: '', newPassword: '', confirmNewPassword: '' };
    const [passwordDetails, setPasswordDetails] = useState(INITIAL_STATE);

    const { currentPassword, newPassword, confirmNewPassword } = passwordDetails;

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

    return (
        <form className={styles.container} autoComplete="on" onSubmit={handleUpdatePasswordSubmit}>
            <h3 className={styles.header}>Update password</h3>
            <RenderView renderIfTrue={userMessage}>
                <p className={styles.userMessage}>{userMessage}</p>
            </RenderView>
            <FormInputPassword label="Current Password" name="currentPassword"
                value={currentPassword} handleValueChange={handleValueChange} />
            <FormInputPassword label="New Password" name="newPassword"
                value={newPassword} handleValueChange={handleValueChange} />
            <FormInputPassword label="Confirm New Password" name="confirmNewPassword"
                value={confirmNewPassword} handleValueChange={handleValueChange} />
            <div className={styles.errorContainer}>
                <span className={styles.errorText}>{errorMessage}</span>
            </div>
            <div className={styles.buttonCon}>
                <LoadingButton loading={fetching} type="submit">Reset password</LoadingButton>
            </div>
            <div className={styles.actionLabel}>
                Back to
                <Link to={LANDING_ROUTE_PATH} className={styles.homeLink} onClick={clearAuthErrorMessage}>Home Page?</Link>
            </div>
        </form>
    );
};

const mapStateToProps = createStructuredSelector({
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute(UpdatePassword));
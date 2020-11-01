//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './toast-message.module.css';
//reselect
import { createStructuredSelector } from 'reselect';
import { selectShowToastMessage, selectIsSuccess, selectMessage, selectTimeInSeconds } from '../../redux/toast-message/toast-message.selectors';
//static Image
import successImage from '../../assests/flat-tick.png';
import failureImage from '../../assests/flat-cross.png';

const ToastMessage = ({ showToast, message, isSuccess }) => {
    return (
        <div className={`${styles.toastbar} ${showToast ? styles.showToastbar : ''}`}>
            <div className="flex-row align-cen">
                <div className={`${styles.round} perfect-cen`}>
                    {isSuccess ?
                        <img className={styles.icon} alt="success" src={successImage} /> :
                        <img className={styles.icon} alt="success" src={failureImage} />
                    }
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    showToast: selectShowToastMessage,
    message: selectMessage,
    isSuccess: selectIsSuccess,
    timeInSeconds: selectTimeInSeconds
});

export default connect(mapStateToProps)(ToastMessage);
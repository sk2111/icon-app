//libs
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
//css
import styles from './toast-message.module.css';
//actions
import { resetToastMessageState } from '../../redux/toast-message/toast-message.actions';
//reselect
import { createStructuredSelector } from 'reselect';
import { selectShowToastMessage, selectIsSuccess, selectMessage, selectTimeInSeconds } from '../../redux/toast-message/toast-message.selectors';
//static Image
import successImage from '../../assests/flat-tick.png';
import failureImage from '../../assests/flat-cross.png';

const ToastMessage = ({ showToast, message, isSuccess, timeInSeconds, resetToastMessageState }) => {

    const toastContainerRef = useRef(null);
    const animProp = `${showToast ? `fadein 0.5s, fadeout 0.5s ${timeInSeconds - 0.35}s, linear 0.5s` : ''}`;
    const styleObj = {
        visibility:`${showToast ? 'visible' : 'hidden'}`,
        animation: animProp,
        'WebkitAnimation': animProp
    };

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                toastContainerRef.current.classList.remove(styles.showToastbar);
                resetToastMessageState();
            }, timeInSeconds * 1000);
        }
    }, [showToast, timeInSeconds, resetToastMessageState]);

    return (
        <div ref={toastContainerRef} style={styleObj} className={`${styles.toastbar} `}>
            <div className="flex-row align-cen">
                <div className={`${styles.round} perfect - cen`}>
                    <img src={(isSuccess ? successImage : failureImage)} key={successImage} className={styles.icon} alt="toast-img" />
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

const mapDispatchToProps = (dispatch) => {
    return {
        resetToastMessageState: () => dispatch(resetToastMessageState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
import React from 'react';
import styles from './loading-button.module.css';
//static
import { ReactComponent as LoadingSpinner } from '../../../assests/loading-for-btn.svg';

const LoadingButton = ({ children, className, loading, ...otherProps }) => {

    const containerClass = loading ? styles.containerLoading : styles.container;
    const buttonClass = styles.button + ' ' + className;

    return (
        <div className={containerClass}>
            <button className={buttonClass} {...otherProps}>{children}</button>
            {loading ? <LoadingSpinner className={styles.loading} /> : null}
        </div>
    );
};

export default LoadingButton;
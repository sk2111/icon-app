import React from 'react';
import styles from './custom-button.module.css';
//static
import { ReactComponent as LoadingSpinner } from '../../assests/loading-for-btn.svg';

const CustomButton = ({ children, loading, ...otherProps }) => {

    const containerClass = loading ? styles.containerLoading : styles.container;

    return (
        <div className={containerClass}>
            <button className={styles.button} {...otherProps}>{children}</button>
            {loading ? <LoadingSpinner className={styles.loading} /> : null}
        </div>
    );
};

export default CustomButton;
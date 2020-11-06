import React from 'react';
import styles from './custom-button.module.css';
//static
import { ReactComponent as LoadingSpinner } from '../../assests/loading-for-btn.svg';

const CustomButton = ({ className, setStyle, children, loading, ...otherProps }) => {
    return (
        <div className={styles.btnContainer}>
            <button styles={setStyle} className={`${className ? styles[className] : styles.button}`} {...otherProps}>{children}</button>
            {loading ? <LoadingSpinner className={styles.loading} /> : null}
        </div>
    );
}

export default CustomButton;
import React from 'react';
import styles from './custom-button.module.css';
//static
import loading from '../../assests/loading-for-btn.svg';

const CustomButton = ({ className, setStyle, children, ...otherProps }) => {
    return (
        <div className={styles.btnContainer}>
            <button styles={setStyle} className={`${className ? styles[className] : styles.button}`} {...otherProps}>{children}</button>
            <img className={styles.loading} alt="rotate" src={loading}></img>
        </div>
    );
}

export default CustomButton;
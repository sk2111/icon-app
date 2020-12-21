//libs
import React from 'react';
//css
import styles from './custom-button.module.css';

const CustomButton = ({ children, className, primary, onClick }) => {

    const btnClass = (primary ? styles.primary : styles.secondary) + ' ' + styles.button + ' ' + className;

    return (
        <button className={btnClass} onClick={onClick}>{children}</button>
    );
};

export default CustomButton;
//libs
import React from 'react';
//css
import styles from './custom-button.module.css';

const CustomButton = ({ children, className, primary, secondary, onClick }) => {

    const btnType = primary ? styles.primary : (secondary ? styles.secondary : '');
    const btnClass = btnType + ' ' + styles.button + ' ' + className;

    return (
        <button className={btnClass} onClick={onClick}>{children}</button>
    );
};

export default CustomButton;
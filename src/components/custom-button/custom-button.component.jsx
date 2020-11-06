import React from 'react';
import styles from './custom-button.module.css';

const CustomButton = ({ className, setStyle, children, ...otherProps }) => {
    return (
        <button styles={setStyle} className={`${className ? styles[className] : styles.button}`} {...otherProps}>{children}</button>
    );
}

export default CustomButton;
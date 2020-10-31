import React from 'react';
import styles from './custom-button.module.css';

const CustomButton = ({ className, label, setStyle, ...otherProps }) => {
    return (
        <button styles={setStyle} className={`${className ? className : styles.button}`} {...otherProps}>{label}</button>
    );
}

export default CustomButton;
//libs
import React from 'react';
//css
import styles from './custom-button.module.css';

const CustomButton = ({ children, className, height, width, primary }) => {
    
    const btnStyle = { height, width };
    const btnClass = (primary ? styles.primary : styles.secondary) + ' ' + styles.button + ' ' + className;
    return (
        <button style={btnStyle} className={btnClass}>{children}</button>
    );
};

CustomButton.defaultProps = {
    height: '28px',
    width: '100px'
}
export default CustomButton;
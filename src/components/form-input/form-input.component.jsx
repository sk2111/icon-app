import React from 'react';
import styles from './form-input.module.css';

const FormInput = ({ rootClass, inpClass, handleInputChange, label, ...otherProps }) => {
    const inputClass = inpClass ? `${styles[inpClass]} ${styles.formInput}` : styles.formInput;
    return (
        <div className={rootClass}>
            {label ? <label className={styles.formLabel}>{label}</label> : null}
            <input className={inputClass} {...otherProps} onChange={handleInputChange} />
        </div>
    );
}

export default FormInput
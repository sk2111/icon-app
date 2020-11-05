import React from 'react';
import styles from './form-input.module.css';

const FormInput = ({ rootClass, handleInputChange, label, ...otherProps }) => {
    return (
        <div className={rootClass}>
            {label ? <label className={styles.formLabel}>{label}</label> : null}
            <input className={styles.formInput} {...otherProps} onChange={handleInputChange} />
        </div>
    );
}

export default FormInput
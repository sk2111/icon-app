import React from 'react';
import styles from './form-input.module.css';

const FormInput = ({handleInputChange,label,...otherProps})=>{
    return(
        <div>
            <input className={styles.formInput} {...otherProps} onChange={handleInputChange}/>
            {
                label?<label className={styles.formLabel}>{label}</label>:null
            }
        </div>
    );  
}

export default FormInput
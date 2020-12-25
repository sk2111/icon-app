//libs
import React, { useState } from 'react';
//css
import styles from './form-input-password.module.css';
//components
import FormInput from '../form-input/form-input.component';
//static
import HideImg from '../../../assests/webp/hide-password.webp';
import ShowImg from '../../../assests/webp/show-password.webp';

const FormInputPassword = ({ label, inpClass, className, name, value, handleValueChange }) => {

    const PASSWORD = 'password';
    const TEXT = 'text';

    const [formType, setFormType] = useState(PASSWORD);

    const handleInputChange = (e) => {
        const { value } = e.target;
        handleValueChange(name ? { name, value } : { value });
    };

    const handleViewHidePassword = () => {
        setFormType((formType === PASSWORD) ? TEXT : PASSWORD);
    };

    return (
        <div className={styles.container}>
            <FormInput
                className={className}
                inpClass={inpClass}
                value={value}
                label={label}
                type={formType}
                required
                autoComplete="on"
                handleInputChange={handleInputChange}
            />
            {formType === TEXT ? <img className={styles.passwordSvg} src={HideImg} alt="" onClick={handleViewHidePassword} /> :
                <img className={styles.passwordSvg} src={ShowImg} alt="" onClick={handleViewHidePassword} />}
        </div>
    )
};

FormInputPassword.defaultProps = {
    label: '',
    name: '',
    value: '',
    className: '',
    inpClass: '',
    handleValueChange: () => { },
};

export default FormInputPassword;
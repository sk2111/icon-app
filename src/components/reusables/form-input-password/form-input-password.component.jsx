//libs
import React, { useState } from 'react';
//css
import styles from './form-input-password.module.css';
//components
import FormInput from '../form-input/form-input.component';
//static
import { ReactComponent as HideSvg } from '../../../assests/hide-password.svg';
import { ReactComponent as ShowSvg } from '../../../assests/show-password.svg';

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
            {formType === TEXT ? <HideSvg className={styles.passwordSvg} onClick={handleViewHidePassword} /> :
                <ShowSvg className={styles.passwordSvg} onClick={handleViewHidePassword} />}
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
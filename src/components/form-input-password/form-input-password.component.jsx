//libs
import React, { useState } from 'react';
//css
import styles from './form-input-password.module.css';
//components
import FormInput from '../form-input/form-input.component';
//static
import { ReactComponent as HideSvg } from '../../assests/hide-password.svg';
import { ReactComponent as ShowSvg } from '../../assests/show-password.svg';

const FormInputPassword = ({ label, className, name, handleValueChange }) => {

    const PASSWORD = 'password';
    const TEXT = 'text';

    const [formType, setFormType] = useState(PASSWORD);
    const [formValue, setFormValue] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;
        setFormValue(value);
        handleValueChange(name ? { name, value } : { value });
    };

    const handleViewHidePassword = () => {
        const newFormType = formType === PASSWORD ? TEXT : PASSWORD;
        setFormType(newFormType);
    };

    return (
        <div className={styles.container}>
            <FormInput
                className={className}
                value={formValue}
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
    className: '',
    handleValueChange: () => { },
};

export default FormInputPassword;
//libs
import React from 'react';
//styles
import styles from './custom-button-group.module.css';
//component
import CustomButton from '../custom-button/custom-button.component';


const CustomButtonGroup = ({ buttons, buttonClass, selectedButton, handleButtonChange }) => {

    const checkButtonChange = (currentButton) => {
        if (currentButton !== selectedButton) {
            handleButtonChange(currentButton);
        }
    };

    const getBtnClass = (currentButton) => {
        const defaultClass = buttonClass ? buttonClass : styles.button;
        const highlightedButton = defaultClass + ' ' + styles.highlightedButton;
        return (selectedButton === currentButton) ? highlightedButton : defaultClass;
    };

    return (
        <React.Fragment>
            {
                buttons.map(({ label, value }) => (
                    <CustomButton key={value}
                        className={getBtnClass(value)}
                        primary
                        onClick={() => checkButtonChange(value)}>{label}</CustomButton>
                ))
            }
        </React.Fragment>
    );
};

CustomButtonGroup.defaultProps = {
    buttons: [],
    buttonClass: '',
    selectedButton: 'png',
    handleButtonChange: () => { }
};


export default CustomButtonGroup;
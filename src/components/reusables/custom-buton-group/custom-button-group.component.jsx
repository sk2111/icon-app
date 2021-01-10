//libs
import React from 'react';

//component
import CustomButton from '../custom-button/custom-button.component';


const CustomButtonGroup = ({ buttons, highlightClass, selectedButton, handleButtonChange }) => {

    const checkButtonChange = (currentButton) => {
        if (currentButton !== selectedButton) {
            handleButtonChange(currentButton);
        }
    };

    const getBtnClass = (currentButton) => {
        return (selectedButton === currentButton) ? highlightClass : '';
    };

    return (
        <React.Fragment>
            {
                buttons.map(({ label, value }) => (
                    <CustomButton key={value}
                        className={getBtnClass(value)}
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
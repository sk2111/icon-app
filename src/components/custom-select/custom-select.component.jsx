import React, { useState, useEffect } from 'react';
//css
import styles from './custom-select.module.css';
//static 
import { ReactComponent as ArrowDownLogo } from '../../assests/arrow-down.svg';

const CustomSelect = ({ label, options, defaultSelectValue, handleSelectValueChange }) => {

    const [selectValue, setSelectValue] = useState(defaultSelectValue);
    const [selectHidden, setSelectHidden] = useState(true);

    const containerStyle = selectHidden ? { maxHeight: '0px' } : {};

    useEffect(() => {
        handleSelectValueChange(selectValue);
    }, [selectValue, handleSelectValueChange]);

    return (
        <React.Fragment>
            <span className={styles.dropLabel}>{label}</span>
            <div className={styles.dropdown}>
                <div className={styles.valueCon} tabIndex="0" onBlur={() => setSelectHidden(true)} onClick={() => setSelectHidden(!selectHidden)}>
                    <div className={styles.selectedValue}>{selectValue}</div>
                    <ArrowDownLogo className={styles.arrowDown} />
                </div>
                <div style={containerStyle} className={styles.optionsCon}>
                    {
                        options.map((option) => {
                            const matchedOption = (option === selectValue) && (!selectHidden) ? styles.selectedOption : '';
                            return <p key={option} className={`${matchedOption} ${styles.option}`}
                                onMouseDown={() => { setSelectValue(option) }}>{option}</p>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

CustomSelect.defaultProps = {
    defaultSelectValue: '',
    options: [],
    handleSelectValueChange: () => { }
};

export default CustomSelect;


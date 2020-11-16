import React, { useState } from 'react';
//css
import styles from './custom-select.module.css';

const CustomSelect = ({ options }) => {
    const [selectValue, setSelectValue] = useState('All');
    const [selectHidden, setSelectHidden] = useState(true);

    const containerStyle = selectHidden ? { height: '0px' } : {};

    return (
        <React.Fragment>
            <span className={styles.dropLabel}>Categories</span>
            <div className={styles.dropdown} onClick={() => setSelectHidden(!selectHidden)}>
                <span className={styles.selectedValue}>{selectValue}</span>
                <div style={containerStyle} className={styles.optionsCon}>
                    {options.map((option) =>
                        <p className={styles.option} onClick={() => { setSelectValue(option) }}>{option}</p>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
};


export default CustomSelect;


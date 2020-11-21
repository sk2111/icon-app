import React, { useState } from 'react';
//css
import styles from './custom-select.module.css';

const CustomSelect = ({ options }) => {

    const [selectValue, setSelectValue] = useState('All');
    const [selectHidden, setSelectHidden] = useState(true);

    const containerStyle = selectHidden ? { maxHeight: '0px' } : {};

    return (
        <React.Fragment>
            <span className={styles.dropLabel}>Categories</span>
            <div className={styles.dropdown}>
                <input className={styles.selectedValue}
                    readOnly
                    value={selectValue}
                    onFocus={() => setSelectHidden(!selectHidden)}
                    onBlur={() => setSelectHidden(true)}
                    onClick={() => setSelectHidden(!selectHidden)} />
                <div style={containerStyle} className={styles.optionsCon}>
                    {options.map((option) =>
                        <p className={styles.option} onMouseDown={() => { setSelectValue(option) }}>{option}</p>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
};


export default CustomSelect;


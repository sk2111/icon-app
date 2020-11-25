import React, { useState } from 'react';
//css
import styles from './custom-select.module.css';
//static 
import  {ReactComponent as ArrowDownLogo} from '../../assests/arrow-down.svg';

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
                    onBlur={() => setSelectHidden(true)}
                    onClick={() => setSelectHidden(!selectHidden)} />
                <ArrowDownLogo className={styles.arrowDown}/>
                <div style={containerStyle} className={styles.optionsCon}>
                    {
                        options.map((option) => {
                            const matchedOption = option === selectValue ? styles.selectedOption : '';
                            return <p key={option} className={`${matchedOption} ${styles.option}`} onMouseDown={() => { setSelectValue(option) }}>{option}</p>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
};


export default CustomSelect;


import React, { useState, useEffect, useRef } from 'react';
//css
import styles from './custom-select.module.css';
//component
import RenderView from '../render-view/render-view.component';
//static 
import { ReactComponent as ArrowDownLogo } from '../../../assests/arrow-down.svg';

const CustomSelect = ({ label, style, options, value, handleValueChange }) => {

    const parentContainerRef = useRef(null);
    const selectedOptionRef = useRef(null);
    const [optionsHidden, setOptionsHidden] = useState(true);

    const containerStyle = optionsHidden ? { maxHeight: '0px', transition: 'none' } : {};
    const selectStyles = style ? style : {};

    useEffect(() => {
        if (!optionsHidden && selectedOptionRef.current && parentContainerRef.current) {
            parentContainerRef.current.scrollBy(0, selectedOptionRef.current.offsetTop);
        }
    }, [parentContainerRef, selectedOptionRef, optionsHidden]);

    return (
        <React.Fragment>
            <RenderView renderIfTrue={label}>
                <span className={styles.dropLabel}>{label}</span>
            </RenderView>
            <div className={styles.dropdown}>
                <div
                    className={styles.valueCon}
                    tabIndex="0"
                    onBlur={() => setOptionsHidden(true)}
                    onClick={() => setOptionsHidden(!optionsHidden)}>
                    <div style={selectStyles} className={styles.selectedValue}>{value}</div>
                    <ArrowDownLogo className={styles.arrowDown} />
                </div>
                <div ref={parentContainerRef} style={containerStyle} className={styles.optionsCon}>
                    {
                        options.map((option) => {
                            const matchedOption = ((option === value) && (!optionsHidden)) ? styles.selectedOption : '';
                            const otherProps = (option === value) ? { ref: selectedOptionRef } : {};
                            return (
                                <p key={option}
                                    className={`${matchedOption} ${styles.option}`}
                                    onMouseDown={() => { handleValueChange(option) }}
                                    {...otherProps}>
                                    {option}
                                </p>
                            );
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

CustomSelect.defaultProps = {
    label: '',
    options: [],
    value: '',
    handleValueChange: () => { }
};

export default CustomSelect;


//libs
import React from 'react';
//css
import styles from './custom-number-box.module.css';
//component
import RenderView from '../render-view/render-view.component';



const CustomNumberBox = ({label, unit, value, handleValueChange}) => {
    return (
        <div className={styles.container}>
            <RenderView renderIfTrue={!!label}>
                <p className={styles.label}>{label}</p>
            </RenderView>
            <input className={styles.numberBox} type="number" value={value} onChange={(e) => handleValueChange(e.target.value)} />
            <RenderView renderIfTrue={!!unit}>
                <div className={styles.unit}>{unit}</div>
            </RenderView>
        </div>
    );
};

CustomNumberBox.defaultProps = {
    label: '',
    unit: '',
    value: 0,
    handleValueChange: () => { }
}

export default CustomNumberBox;
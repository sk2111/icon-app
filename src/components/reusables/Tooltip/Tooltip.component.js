//libs
import React from 'react';
//styles 
import styles from './Tooltip.module.css';



const Tooltip = ({ children, title }) => {
    return (
        <div className={styles.tooltipBox}>
            {children}
            <div className={styles.tooltip}>{title}</div>
        </div>
    );
};


export default Tooltip;
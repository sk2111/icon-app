//libs
import React from 'react';
//css
import styles from './icon-card.component';




const IconCard = ({ iconName, iconBase64 }) => {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
            </div>
            <div className={styles.iconName}>{iconName}</div>
        </div>
    );
};


export default IconCard;
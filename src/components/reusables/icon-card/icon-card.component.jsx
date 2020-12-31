//libs
import React from 'react';
//css
import styles from './icon-card.module.css';


const IconCard = ({ iconId, iconName, iconBase64, confirmDelete }) => {
    return (
        <div className={styles.card} onClick={() => { confirmDelete({ iconIdToDelete: iconId, isVisible: true }) }}>
            <div className={styles.iconContainer}>
                <img className={styles.iconImg} src={`data:image/svg+xml;base64,${iconBase64}`} alt="" />
            </div>
            <div className={styles.iconName}>{iconName}</div>
        </div>
    );
};


export default IconCard;
//libs
import React from 'react';
//css
import styles from './lazy-loading-card.module.css';




const LazyLoadingCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.iconContainer}>
                <div className={styles.iconImg}></div>
            </div>
            <div className={styles.iconName}></div>
            <div className={styles.overlay}></div>
        </div>
    );
};


export default LazyLoadingCard;
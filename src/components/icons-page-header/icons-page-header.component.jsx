import React from 'react';
//css
import styles from './icons-page-header.module.css';

const IconsPageHeader = ({ showButton }) => {
    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>All Icons</h4>
            {
                showButton ? <button className={styles.uploadBtn}>Upload Icon</button> : null
            }
        </div>
    );
};

export default IconsPageHeader;
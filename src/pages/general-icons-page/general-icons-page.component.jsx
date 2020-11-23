import React from 'react';
//css
import styles from './general-icons-page.module.css';

const GeneralIconsPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerContainer}>
                <h4 className={styles.header}>All Icons</h4>
                <button className={styles.uploadBtn}>Upload Icon</button>
            </div>
        </div>
    );
};


export default GeneralIconsPage;
import React from 'react';
//css
import styles from './icons-page-header.module.css';
//static
import { ReactComponent as ArrowUp } from '../../assests/applogo.svg';

const IconsPageHeader = ({ showUploadButton }) => {
    const renderUploadButton = () => {
        return (
            <div className={styles.btnContainer}>
                <ArrowUp className={styles.arrow} />
                <button className={styles.uploadBtn}>Upload Icon</button>
            </div>
        );
    }
    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>All Icons</h4>
            {
                showUploadButton ? renderUploadButton() : null
            }
        </div>
    );
};

export default IconsPageHeader;
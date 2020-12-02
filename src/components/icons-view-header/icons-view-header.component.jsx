import React from 'react';
//css
import styles from './icons-page-header.module.css';
//static
import { ReactComponent as ArrowUp } from '../../assests/upload-arrow.svg';

const IconsViewHeader = ({ label, showUploadButton }) => {
    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>{label}</h4>
            {
                showUploadButton ?
                    (
                        <div className={styles.btnContainer}>
                            <ArrowUp className={styles.arrow} />
                            <button className={styles.uploadBtn}>Upload Icon</button>
                        </div>
                    )
                    : null
            }
        </div>
    );
};

export default IconsViewHeader;
//libs
import React from 'react';
//css
import styles from './icons-view-header.module.css';
//component
import RenderView from '../render-view/render-view.component';
//static
import { ReactComponent as ArrowUp } from '../../assests/upload-arrow.svg';

const IconsViewHeader = ({ label, showUploadButton }) => {
    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>{label}</h4>
            <RenderView renderIfTrue={showUploadButton}>
                <div className={styles.btnContainer}>
                    <ArrowUp className={styles.arrow} />
                    <button className={styles.uploadBtn}>Upload Icon</button>
                </div>
            </RenderView>
        </div>
    );
};

export default IconsViewHeader;
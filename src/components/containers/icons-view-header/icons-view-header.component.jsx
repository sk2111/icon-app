//libs
import React from 'react';
//css
import styles from './icons-view-header.module.css';
//component
import RenderView from '../../reusables/render-view/render-view.component';
import LoadingButton from '../../reusables/loading-button/loading-button.component';

const IconsViewHeader = ({ label, showUploadButton, handleUploadIcon }) => {

    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>{label}</h4>
            <RenderView renderIfTrue={showUploadButton}>
                <LoadingButton className={styles.uploadBtn} onClick={() => handleUploadIcon(label)}>Upload icon</LoadingButton>
            </RenderView>
        </div>
    );
};

export default IconsViewHeader;
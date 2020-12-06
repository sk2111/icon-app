//libs
import React from 'react';
//css
import styles from './icons-view-header.module.css';
//component
import RenderView from '../render-view/render-view.component';
import CustomButton from '../custom-button/custom-button.component';

const IconsViewHeader = ({ label, showUploadButton }) => {

    const buttonStyle = { fontWeight: '300', height: '30px', width: '108px' };
    return (
        <div className={styles.headerContainer}>
            <h4 className={styles.header}>{label}</h4>
            <RenderView renderIfTrue={showUploadButton}>
                <CustomButton style={buttonStyle}>Upload icon</CustomButton>
            </RenderView>
        </div>
    );
};

export default IconsViewHeader;
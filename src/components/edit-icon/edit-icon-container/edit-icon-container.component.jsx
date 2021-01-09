//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-container.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
//actions
import { closeEditModal } from '../../../redux/edit-icon/edit-icon.actions';

const EditIconContainer = ({ iconName, iconSvgData, showClose, closeModal }) => {
    return (
        <div className={styles.container}>
            <div className={styles.svgContainer}>
                <div className={styles.svgInfo}>{iconName}</div>
                <div className={styles.svgPreview}></div>
                <div className={styles.usageInfo}></div>
            </div>
            <div className={styles.configContainer}>

            </div>
            <RenderView renderIfTrue={showClose}>
                <div className={styles.close} onClick={closeModal}>close</div>
            </RenderView>
        </div>
    );
};

EditIconContainer.defaultProps = {
    showClose: true
};



const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeEditModal())
    }
}
export default connect(null, mapDispatchToProps)(EditIconContainer);
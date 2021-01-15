//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './edit-icon-container.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
import EditIconPreview from '../../edit-icon/edit-icon-preview/edit-icon-preview.component';
import EditIconConfig from '../edit-icon-config/edit-icon-config.component';
//actions
import { closeEditModal } from '../../../redux/edit-icon/edit-icon.actions';
//selectors



const EditIconContainer = ({ showClose, closeModal }) => {

    const renderSvgWithUpdatedColor = (color) => {
        console.log(" Hai i am color", color)
    };

    return (
        <div className={styles.editContainer}>
            <div className={styles.previewContainer}>
                <EditIconPreview />
            </div>
            <div className={styles.configContainer}>
                <EditIconConfig renderSvgWithUpdatedColor={renderSvgWithUpdatedColor} />
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
};

export default connect(null, mapDispatchToProps)(EditIconContainer);
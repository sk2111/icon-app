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
//static
import { ReactComponent as CloseIcon } from '../../../assests/edit-icon-close.svg';



const EditIconContainer = ({ showClose, closeModal }) => {

    return (
        <div className={styles.editContainer}>
            <div className={styles.previewContainer}>
                <EditIconPreview />
            </div>
            <div className={styles.configContainer}>
                <EditIconConfig />
            </div>
            <RenderView renderIfTrue={showClose}>
                <CloseIcon className={styles.close} src={CloseIcon} alt="x" onClick={closeModal} />
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
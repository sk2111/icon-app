//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-container.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
import EditIconPreview from '../../edit-icon/edit-icon-preview/edit-icon-preview.component';
import EditIconConfig from '../edit-icon-config/edit-icon-config.component';
//actions
import { closeEditModal } from '../../../redux/edit-icon/edit-icon.actions';
//selectors
import { selectIconToEdit } from '../../../redux/edit-icon/edit-icon.selectors';


const EditIconContainer = ({ iconToEdit, showClose, closeModal }) => {

    const { iconName, iconData } = iconToEdit;

    return (
        <div className={styles.editContainer}>
            <div className={styles.previewContainer}>
                <EditIconPreview />
            </div>
            <div className={styles.configContainer}>
                <EditIconConfig />
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



const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit
});

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeEditModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditIconContainer);
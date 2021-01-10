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
//selectors
import { selectIconToEdit } from '../../../redux/edit-icon/edit-icon.selectors';


const EditIconContainer = ({ iconToEdit, showClose, closeModal }) => {
    const { iconName, iconData } = iconToEdit;
    console.log("Test Icon name and svga data", iconName, iconData);

    return (
        <div className={styles.container}>
            <div className={styles.svgContainer}>
                <div className={styles.svgInfo}>{iconName}</div>
                <div className={styles.svgPreview}>
                    <div className={styles.editSvg} dangerouslySetInnerHTML={{ __html: iconData }}>

                    </div>
                </div>
                <div className={styles.usageInfo}>
                    <div className={styles.recommendText}>RECOMMENDED FOR</div>
                </div>
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



const mapStateToProps = createStructuredSelector({
    iconToEdit: selectIconToEdit
});

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeEditModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditIconContainer);
//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../../reusables/custom-button/custom-button.component';
import RenderView from '../../reusables/render-view/render-view.component';
import UploadZone from '../upload-zone/upload-zone.component';
import PreviewUploadIcons from '../preview-upload-icons/preview-upload-icons.component';
import ConfigureUploadIcons from '../configure-upload-icons/configure-upload-icons.component';
import MessageModalCard from '../message-modal-card/message-modal-card.component';
//actions
import {
    uploadFilesToStore, deleteUploadedIcon, changeModalView, closeUploadModal,
    showHideCloseConfirmationModal
} from '../../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectUploadedIcons, selectCurrentModalView, selectIsUserEditedUploadedIcons } from '../../../redux/upload-icons/upload-icons.selectors';
//helpers
import { normalizeUploadFileIconsStructure } from '../../../utilities/helper.functions';
//constants
import { MODAL_IN_UPLOAD_VIEW, MODAL_IN_CONFIGURE_VIEW } from '../../../utilities/app.constants';


const UploadIcons = ({ uploadedIcons, uploadFilesToStore, deleteUploadedIcon, isUserEditedIcons,
    closeUploadModal, currentModalView, changeModalView, showHideCloseConfirmationModal }) => {

    console.log("Current Modal view", currentModalView);

    const isUserUploadedIcons = !!uploadedIcons.length;
    const nextBtnClass = styles.nextBtn + ' ' + (isUserUploadedIcons ? '' : styles.disabled);

    const handleIconsFileUpload = (uploadedFiles) => {
        const normalizedIconData = normalizeUploadFileIconsStructure(uploadedFiles);
        uploadFilesToStore(normalizedIconData);
    };

    const handleNextBtnView = () => {
        if (uploadedIcons.length) {
            changeModalView(MODAL_IN_CONFIGURE_VIEW);
        }
    };

    const closeUploadModalView = () => {
        if (isUserEditedIcons) {
            showHideCloseConfirmationModal({ show: true });
            return;
        }
        closeUploadModal();
    };

    return (
        <div className={styles.uploadContainer}>
            <RenderView renderIfTrue={currentModalView === MODAL_IN_UPLOAD_VIEW}>
                <UploadZone validFileNameExtension=".svg" acceptType="image/svg+xml" handleFileUpload={handleIconsFileUpload} />
                <div className={styles.horizonLine}></div>
                <h4 className={styles.viewHeaderText}>Added files</h4>
                <PreviewUploadIcons iconList={uploadedIcons} deleteIcon={deleteUploadedIcon} />
                <div className={styles.buttonContainer}>
                    <CustomButton className={nextBtnClass} primary onClick={handleNextBtnView}>Next</CustomButton>
                    <CustomButton secondary onClick={closeUploadModalView}>Cancel</CustomButton>
                </div>
            </RenderView>
            <RenderView renderIfTrue={currentModalView === MODAL_IN_CONFIGURE_VIEW}>
                <ConfigureUploadIcons closeUploadModalView={closeUploadModalView} />
            </RenderView>
            <MessageModalCard closeUploadModal={closeUploadModal} showHideCloseConfirmationModal={showHideCloseConfirmationModal} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadedIcons: selectUploadedIcons,
    currentModalView: selectCurrentModalView,
    isUserEditedIcons: selectIsUserEditedUploadedIcons,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFilesToStore: (icons) => dispatch(uploadFilesToStore(icons)),
        deleteUploadedIcon: (iconId) => dispatch(deleteUploadedIcon(iconId)),
        changeModalView: (view) => dispatch(changeModalView(view)),
        showHideCloseConfirmationModal: (view) => dispatch(showHideCloseConfirmationModal(view)),
        closeUploadModal: () => dispatch(closeUploadModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadIcons);
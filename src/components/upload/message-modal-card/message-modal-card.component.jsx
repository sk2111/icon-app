//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './message-modal-card.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
//actions
import { closeUploadStatusModal } from '../../../redux/upload-icons/upload-icons.actions';
//reselect 
import { selectShowCloseConfirmation, selectIsUploadingModalOpen, selectIsUploading, selectUploadErrorMessage } from '../../../redux/upload-icons/upload-icons.selectors';
//static
import { ReactComponent as FailedSvg } from '../../../assests/failed-cross.svg';
import { ReactComponent as SuccessSvg } from '../../../assests/success-tick.svg';



const MessageModalCard = ({ closeConfirmation, isUploadingToDbModalOpen, isUploading, uploadErrorMessage,
    showHideCloseConfirmationModal, closeUploadModal, closeUploadStatusModal }) => {
    return (
        <React.Fragment>
            <RenderView renderIfTrue={closeConfirmation}>
                <CreateModalCard>
                    <h6 className={styles.confirmHeader}>Warning !</h6>
                    <p className={styles.confirmDetails}>Your Updates will be lost.</p>
                    <div className={styles.confirmBtnContainer}>
                        <button className={styles.cancelButton} onClick={() => showHideCloseConfirmationModal({ show: false })}>Cancel</button>
                        <button className={styles.proceedButton} onClick={() => closeUploadModal()}>Proceed</button>
                    </div>
                </CreateModalCard>
            </RenderView>
            <RenderView renderIfTrue={isUploadingToDbModalOpen}>
                <RenderView renderIfTrue={isUploading}>
                    <CreateModalCard>
                        <h6 className={styles.confirmHeader}>Uploading </h6>
                        <p className={styles.details}>Icons are uploading to database...</p>
                    </CreateModalCard>
                </RenderView>
                <RenderView renderIfTrue={uploadErrorMessage}>
                    <CreateModalCard>
                        <div className={styles.failedHeader}><FailedSvg className={styles.failedSvg} /></div>
                        <p className={styles.errorText}>Upload failed.{uploadErrorMessage}</p>
                        <div className={styles.uploadFailedbtn}>
                            <button className={styles.cancelButton} onClick={() => closeUploadStatusModal()}>Cancel</button>
                        </div>
                    </CreateModalCard>
                </RenderView>
                <RenderView renderIfTrue={(!uploadErrorMessage && !isUploading)}>
                    <CreateModalCard>
                        <div className={styles.successHeader}><SuccessSvg className={styles.successSvg} /></div>
                        <p className={styles.successText}>Upload Success</p>
                        <div className={styles.uploadSuccessbtn}>
                            <button className={styles.cancelButton} onClick={() => closeUploadStatusModal()}>Cancel</button>
                        </div>
                    </CreateModalCard>
                </RenderView>
            </RenderView>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    closeConfirmation: selectShowCloseConfirmation,
    isUploadingToDbModalOpen: selectIsUploadingModalOpen,
    isUploading: selectIsUploading,
    uploadErrorMessage: selectUploadErrorMessage,
});

const mapDispatchToProps = (dispatch) => {
    return {
        closeUploadStatusModal: () => dispatch(closeUploadStatusModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModalCard);
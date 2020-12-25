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
import { selectShowCloseConfirmation, selectIsUserMessageCardOpen, selectIsUploading, selectUploadErrorMessage } from '../../../redux/upload-icons/upload-icons.selectors';
//static
import FailedImg from '../../../assests/webp/failed-cross.webp';
import SuccessImg from '../../../assests/webp/success-tick.webp';



const MessageModalCard = ({ closeConfirmation, isUserMesssageCardOpen, isUploading, uploadErrorMessage,
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
            <RenderView renderIfTrue={isUserMesssageCardOpen}>
                <RenderView renderIfTrue={isUploading}>
                    <CreateModalCard>
                        <h6 className={styles.confirmHeader}>Uploading </h6>
                        <p className={styles.details}>Icons are uploading to database...</p>
                    </CreateModalCard>
                </RenderView>
                <RenderView renderIfTrue={uploadErrorMessage}>
                    <CreateModalCard>
                        <div className={styles.failedHeader}><img className={styles.failedSvg} src={FailedImg} alt="x" /></div>
                        <p className={styles.errorText}>{uploadErrorMessage}</p>
                        <div className={styles.uploadFailedbtn}>
                            <button className={styles.cancelButton} onClick={() => closeUploadStatusModal()}>Cancel</button>
                        </div>
                    </CreateModalCard>
                </RenderView>
                <RenderView renderIfTrue={(!uploadErrorMessage && !isUploading)}>
                    <CreateModalCard>
                        <div className={styles.successHeader}><img className={styles.successSvg} src={SuccessImg} alt="-" /></div>
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
    isUserMesssageCardOpen: selectIsUserMessageCardOpen,
    isUploading: selectIsUploading,
    uploadErrorMessage: selectUploadErrorMessage,
});

const mapDispatchToProps = (dispatch) => {
    return {
        closeUploadStatusModal: () => dispatch(closeUploadStatusModal()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModalCard);
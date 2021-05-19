//libs
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './message-modal-card.module.css';
//components
import RenderView from '../../reusables/render-view/render-view.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
//actions
import { closeUploadStatusModal, closeAddNewClassificationModal } from '../../../redux/upload-icons/upload-icons.actions';
//reselect 
import {
    selectShowCloseConfirmation, selectIsUserMessageCardOpen, selectUploadIconDBPath,
    selectIsUploading, selectUploadErrorMessage, selectIsAddNewClassificationSuccess
} from '../../../redux/upload-icons/upload-icons.selectors';
//static
import FailedImg from '../../../assests/webp/failed-cross.webp';
import SuccessImg from '../../../assests/webp/success-tick.webp';



const MessageModalCard = ({ uploadIconDBPath, closeConfirmation, isUserMesssageCardOpen, isUploading, uploadErrorMessage,
    closeAddNewClassificationModal, showHideCloseConfirmationModal, closeUploadModal, closeUploadStatusModal,
    isAddNewClassificationSuccess }) => {


    useEffect(() => {
        if (isAddNewClassificationSuccess) {
            setTimeout(() => {
                closeAddNewClassificationModal(uploadIconDBPath);
            }, 2000);
        }
    }, [isAddNewClassificationSuccess, closeAddNewClassificationModal, uploadIconDBPath]);

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
                <RenderView renderIfTrue={isAddNewClassificationSuccess}>
                    <CreateModalCard>
                        <div className={styles.successHeader}><img className={styles.successSvg} src={SuccessImg} alt="-" /></div>
                        <p className={styles.successText}>Creation Success</p>
                        <div className={styles.uploadSuccessbtn}>
                            <button className={styles.cancelButton} onClick={() => closeAddNewClassificationModal(uploadIconDBPath)}>Cancel</button>
                        </div>
                    </CreateModalCard>
                </RenderView>
            </RenderView>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadIconDBPath: selectUploadIconDBPath,
    closeConfirmation: selectShowCloseConfirmation,
    isUserMesssageCardOpen: selectIsUserMessageCardOpen,
    isUploading: selectIsUploading,
    uploadErrorMessage: selectUploadErrorMessage,
    isAddNewClassificationSuccess: selectIsAddNewClassificationSuccess
});

const mapDispatchToProps = (dispatch) => {
    return {
        closeUploadStatusModal: () => dispatch(closeUploadStatusModal()),
        closeAddNewClassificationModal: (dbPath) => { dispatch(closeAddNewClassificationModal(dbPath)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModalCard);
//libs
import React from 'react';
//css
import styles from './modal.module.css';


const Modal = ({ children, isModalOpen, heightInPx, widthInPx }) => {

    const modalViewClass = isModalOpen ? styles.showModal : styles.hideModal;

    const contentStyle = { maxHeight: heightInPx, width: widthInPx };
    const modalBackgroundClass = `${styles.shadow} ${modalViewClass}`;
    const contentClass = `${styles.content} ${modalViewClass}`;

    return (
        <div className={modalBackgroundClass}>
            <div style={contentStyle} className={contentClass}>
                {children}
            </div>
        </div>
    );
};

Modal.defaultProps = {
    heightInPx: '750px',
    widthInPx: '600px'
}

export default Modal;
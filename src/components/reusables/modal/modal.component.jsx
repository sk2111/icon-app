//libs
import React from 'react';
//css
import styles from './modal.module.css';


const Modal = ({ children, isModalOpen, contentContainerClass }) => {

    const modalViewClass = isModalOpen ? styles.showModal : styles.hideModal;

    const modalBackgroundClass = `${styles.shadow} ${modalViewClass}`;
    const contentClass = `${styles.content} ${modalViewClass} ${contentContainerClass}`;

    return (
        <div className={modalBackgroundClass}>
            <div className={contentClass}>
                {children}
            </div>
        </div>
    );
};


Modal.defaultProps = {
    contentContainerClass: ''
};

export default Modal;
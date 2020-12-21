//libs
import React from 'react';
//css
import styles from './modal.module.css';


const Modal = ({ children, isModalOpen }) => {

    const modalViewClass = isModalOpen ? styles.showModal : styles.hideModal;

    const modalBackgroundClass = `${styles.shadow} ${modalViewClass}`;
    const contentClass = `${styles.content} ${modalViewClass}`;

    return (
        <div className={modalBackgroundClass}>
            <div className={contentClass}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
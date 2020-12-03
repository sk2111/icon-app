//libs
import React from 'react';
//css
import styles from './modal.module.css';


const Modal = ({ children, isModalOpen, height, width }) => {
    const contentStyle = { height: `${height || '600px'}`, width: `${width || '600px'}` };
    const viewClass = isModalOpen ? styles.showModal : styles.hideModal;
    return (
        <div className={`${styles.shadow} ${viewClass}`}>
            <div style={contentStyle} className={`${styles.content} ${viewClass}`}>
                {children}
            </div>
        </div>
    );
};


export default Modal;
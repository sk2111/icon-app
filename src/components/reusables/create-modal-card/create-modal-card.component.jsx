//libs
import React, { useState } from 'react';
//css
import styles from './create-modal-card.module.css';




const CreateModalCard = (heading, inputType, defaultValue, handleSubmit, handleCancel) => {

    const [input, setInput] = useState(defaultValue);

    const submitBtnClass = styles.submitBtn + ' ' + styles.button;
    const cancelBtnClass = styles.cancelBtn + ' ' + styles.button;

    return (
        <div className={styles.popupView}>
            <h6 className={styles.popupHeader}>{heading}</h6>
            <input className={styles.nameInput} type={inputType} value={input} onChange={(e) => setInput(e.target.value)} />
            <div className={styles.actionCon}>
                <button className={cancelBtnClass} onClick={() => handleCancel(false)}>Cancel</button>
                <button className={submitBtnClass} onClick={() => handleSubmit()}>Ok</button>
            </div>
        </div>
    );
};


export default CreateModalCard;
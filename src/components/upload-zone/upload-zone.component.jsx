//libs
import React, { useRef, useState } from 'react';
//css
import styles from './upload-zone.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
//static
import { ReactComponent as UploadSvg } from '../../assests/upload-icons.svg';
//helpers
import { readFiles } from '../../utilities/helper.functions';


const UploadZone = ({ validFileNameExtension, acceptType, handleFileUpload }) => {

    const uploadFilesInpRef = useRef(null);
    const dragCounter = useRef({ count: 0 });
    const [dragging, setDragging] = useState(false);

    const dropContainer = styles.dropContainer + (dragging ? ` ${styles.dragHighlight}` : '');

    const handleSvgFilesUpload = async (e) => {
        try {

            const files = await readFiles(e.target.files, acceptType, validFileNameExtension);
            if (files) {
                handleFileUpload(files);
            }
        }
        catch (e) {
            console.log("upload failed", e);
        }
        e.target.value = null;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current.count++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
        }
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current.count--;
        if (dragCounter.current.count === 0) {
            setDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleSvgFilesUpload({ target: { files: e.dataTransfer.files } });
            e.dataTransfer.clearData();
            dragCounter.current.count = 0;
            setDragging(false);
        }
    };

    const triggerFileUpload = () => {
        uploadFilesInpRef.current.click();
    };

    return (
        <React.Fragment>
            <h4 className={styles.headerText}>Upload files to Common Icons</h4>
            <div className={dropContainer}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDragOver}
                onDrop={handleDrop}>
                <div className={styles.dropContent}>
                    <UploadSvg />
                    <p className={styles.dropText1}>Drag and drop your files here</p>
                    <p className={styles.dropText2}>or</p>
                    <input ref={uploadFilesInpRef} type="file" multiple accept={validFileNameExtension} hidden onChange={handleSvgFilesUpload} />
                    <CustomButton primary onClick={triggerFileUpload}>Browse</CustomButton>
                </div>
            </div>
        </React.Fragment>
    );
};


UploadZone.defaultProps = {
    validFileNameExtension: '.svg',
    acceptType: 'image/svg+xml',
    handleFileUpload: () => { }
};


export default UploadZone;
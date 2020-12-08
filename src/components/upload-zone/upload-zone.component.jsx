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


const UploadZone = ({ validFileNameExtension, acceptType }) => {

    const uploadFilesInpRef = useRef(null);
    const dragCounter = useRef({ count: 0 });
    const [dragging, setDragging] = useState(false);

    const dropContainer = styles.dropContainer + (dragging ? ` ${styles.dragHighlight}` : '');

    const handleSvgFilesUpload = (e) => {
        const files = readFiles(e.target.files, acceptType, validFileNameExtension);
        console.log("Browse files", files);
        //filter only the required files
        //
        // files.forEach((icon) => {
        //     const reader = new FileReader();
        //     reader.onload = ({ target: { result } }) => {
        //         // setUploadedIcons((uploadedIcons) => [...uploadedIcons, result]);
        //     };
        //     reader.readAsText(icon);
        // });

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
            // handleDrop(e.dataTransfer.files)
            console.log(" The drop event", e.dataTransfer.files);
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


export default UploadZone;
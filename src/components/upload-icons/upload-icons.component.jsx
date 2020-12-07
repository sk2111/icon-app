//libs
import React, { useState, useRef } from 'react';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
//static
import { ReactComponent as UploadSvg } from '../../assests/upload-icons.svg';
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';


const UploadIcons = () => {
    const [uploadedIcons, setUploadedIcons] = useState([]);
    const uploadFilesInpRef = useRef(null);

    const handleSvgFilesUpload = (eve) => {
        try {
            const files = Array.from(eve.target.files) || [];
            files.forEach((icon) => {
                const reader = new FileReader();
                reader.onload = ({ target: { result } }) => {
                    setUploadedIcons((uploadedIcons) => [...uploadedIcons, result]);
                };
                reader.readAsText(icon);
            });
        }
        catch (e) {
            console.log("Error in file upload", e);
        }
        eve.target.value = null;
    }
    const dropEvent = (eve) => {
        eve.preventDefault();
        console.log(" The drop event", eve.dataTransfer.files);
    }
    const triggerFileUpload = () => {
        uploadFilesInpRef.current.click();
    };
    console.log("Testing uploaded icons", uploadedIcons);
    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.headerText}>Upload files to Common Icons</h4>
            <div className={styles.dropContainer} onDrop={dropEvent} onDragOver={e => e.preventDefault()}>
                <div className={styles.dropContent}>
                    <UploadSvg />
                    <p className={styles.dropText1}>Drag and drop your files here</p>
                    <p className={styles.dropText2}>or</p>
                    <input ref={uploadFilesInpRef} type="file" multiple accept=".svg" hidden onChange={handleSvgFilesUpload} />
                    <CustomButton primary onClick={triggerFileUpload}>Browse</CustomButton>
                </div>
            </div>
            <div className={styles.horizonLine}></div>
            <h4 className={styles.viewHeaderText}>Added files</h4>
            <div className={styles.viewZone}>
                <div className={styles.viewContent}>
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
                {
                    uploadedIcons.map((svgIconString) => {
                        console.log("I am incoming");
                        const buff = Buffer.from(svgIconString);
                        const base64data = buff.toString('base64');
                        return (<img style={{
                            height: '50px', width: '50px'
                        }} src={`data:image/svg+xml;base64,${base64data}`} alt="icon" />);
                        // return <div dangerouslySetInnerHTML={{ __html: svgIconString }} />
                    })
                }
            </div>
            <div className={styles.buttonContainer}>
                <CustomButton className={styles.nextBtn} primary>Next</CustomButton>
                <CustomButton secondary>Cancel</CustomButton>
            </div>
        </div>
    );
};

export default UploadIcons;
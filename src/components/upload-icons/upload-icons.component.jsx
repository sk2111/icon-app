//libs
import React, { useState, useRef } from 'react';
//styles
import styles from './upload-icons.module.css';
//components
import CustomButton from '../custom-button/custom-button.component';
import UploadZone from '../upload-zone/upload-zone.component';
//static

import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';


const UploadIcons = () => {
    const [uploadedIcons, setUploadedIcons] = useState([]);



    console.log("Testing uploaded icons", uploadedIcons);
    return (
        <div className={styles.uploadContainer}>
            <UploadZone validFileNameExtension=".svg" acceptType="image/svg+xml" />
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
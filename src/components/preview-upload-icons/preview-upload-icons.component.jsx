//libs
import React from 'react';
//css
import styles from './preview-upload-icons.module.css';
//components
import RenderView from '../render-view/render-view.component';
//static
import { ReactComponent as NoFileFoundSvg } from '../../assests/no-files-found.svg';


const PreviewUploadIcons = ({ iconList }) => {
    return (
        <div className={styles.viewZone}>
            <RenderView renderIfFalse={iconList.length}>
                <div className={styles.viewContent}>
                    <NoFileFoundSvg />
                    <p className={styles.noFileText}>There are no files added yet!</p>
                </div>
            </RenderView>
            <RenderView renderIfTrue={iconList.length}>
                {
                    iconList.map(({ iconData }) => {
                        const buff = Buffer.from(iconData);
                        const base64data = buff.toString('base64');
                        // return (<img style={{
                        //     height: '50px', width: '50px'
                        // }} src={`data:image/svg+xml;base64,${base64data}`} alt="icon" />);
                        // return <div dangerouslySetInnerHTML={{ __html: iconData }} />
                    })
                }
            </RenderView>
        </div>
    );
};


export default PreviewUploadIcons;
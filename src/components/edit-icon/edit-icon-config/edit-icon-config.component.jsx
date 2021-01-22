//libs
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-config.module.css';
//components
import CustomButtonGroup from '../../reusables/custom-buton-group/custom-button-group.component';
import CustomNumberBox from '../../reusables/custom-number-box/custom-number-box.component';
import EditIconColorSelector from '../edit-icon-color-selector/edit-icon-color-selector.component';
import LoadingButton from '../../reusables/loading-button/loading-button.component';
//actions
import { changeDownloadFormat, changeStandardDownloadSize, changeCustomDownloadSize, triggerIconDownload } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectIconDownloadFormat, selectDownloadSize, selectIsIconDownloading } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_BUTTONS, DEFAULT_DOWNLOAD_SIZE_BUTTONS, EDIT_ICON_INPUT_DEBOUNCE_TIME } from '../../../utilities/app.constants';

const EditIconConfig = ({ selectedDownloadType, changeDownloadType, downloadSize, changeStandardDownloadSize,
    changeCustomDownloadSize, triggerIconDownload, isIconDownloading }) => {

    const [customSize, setCustomSize] = useState({ height: downloadSize.height, width: downloadSize.width });
    const debounceRef = useRef({ timerId: null });

    const downloadButtontext = `Download ${selectedDownloadType.toUpperCase()}`;
    const selectedDefaultSizeGroup = (downloadSize.height === downloadSize.width) ? downloadSize.height : '';


    const handleStandardSizeChange = (size) => {
        setCustomSize({ height: size, width: size });
        changeStandardDownloadSize(size);
    };

    const handleCustomSizeChange = (newHeight, newWidth) => {
        const validHeight = Number(newHeight) >= 0 ? newHeight : 0;
        const validWidth = Number(newWidth) >= 0 ? newWidth : 0;
        setCustomSize({ height: validHeight, width: validWidth });
        if (debounceRef.current.timerId) {
            clearTimeout(debounceRef.current.timerId);
        }
        debounceRef.current.timerId = setTimeout(() => {
            changeCustomDownloadSize({ height: validHeight, width: validWidth });
        }, EDIT_ICON_INPUT_DEBOUNCE_TIME);
    };

    return (
        <div className={styles.container}>
            <div className={styles.configurationZone}>
                <div className={styles.downloadSelection}>
                    <CustomButtonGroup
                        buttons={EDIT_ICON_BUTTONS}
                        highlightClass={styles.highlightedButton}
                        selectedButton={selectedDownloadType}
                        handleButtonChange={changeDownloadType}
                    />
                </div>
                <h6 className={styles.groupHeader}>SIZE</h6>
                <div className={styles.sizeGroup}>
                    <CustomButtonGroup
                        buttons={DEFAULT_DOWNLOAD_SIZE_BUTTONS}
                        highlightClass={styles.highlightedButton}
                        selectedButton={selectedDefaultSizeGroup}
                        handleButtonChange={handleStandardSizeChange}
                    />
                </div>
                <h6 className={styles.groupHeader}>CUSTOM SIZE</h6>
                <div className={styles.configSizeContainer}>
                    <CustomNumberBox label="H" unit="px" value={customSize.height}
                        handleValueChange={(height) => handleCustomSizeChange(height, customSize.width)} />
                    <CustomNumberBox label="W" unit="px" value={customSize.width}
                        handleValueChange={(width) => handleCustomSizeChange(customSize.height, width)} />
                </div>
                <div className={styles.colorPickerContainer}>
                    <EditIconColorSelector />
                </div>
            </div>
            <div className={styles.downloadZone}>
                <LoadingButton className={styles.downloadButton} loading={isIconDownloading} onClick={triggerIconDownload}>{downloadButtontext}</LoadingButton>
            </div>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    selectedDownloadType: selectIconDownloadFormat,
    downloadSize: selectDownloadSize,
    isIconDownloading: selectIsIconDownloading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeDownloadType: (format) => dispatch(changeDownloadFormat(format)),
        changeStandardDownloadSize: (size) => dispatch(changeStandardDownloadSize(size)),
        changeCustomDownloadSize: (sizeConfig) => dispatch(changeCustomDownloadSize(sizeConfig)),
        triggerIconDownload: () => dispatch(triggerIconDownload()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconConfig);
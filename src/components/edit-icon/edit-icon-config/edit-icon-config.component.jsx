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
import { changeDownloadFormat, changeStandardDownloadSize, changeCustomDownloadSize } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectIconDownloadFormat, selectDownloadSize } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_BUTTONS, DEFAULT_DOWNLOAD_SIZE_BUTTONS, EDIT_ICON_INPUT_DEBOUNCE_TIME } from '../../../utilities/app.constants';

const EditIconConfig = ({ selectedDownloadType, changeDownloadType, downloadSize, changeStandardDownloadSize,
    changeCustomDownloadSize }) => {

    const [customSize, setCustomSize] = useState({ height: 0, width: 0 });
    const debounceRef = useRef({ timerId: null });

    const downloadButtontext = `Download ${selectedDownloadType.toUpperCase()}`;
    const selectedDefaultSizeGroup = (downloadSize.height === downloadSize.width) ? downloadSize.height : '';

    const handleCustomSizeChange = (newHeight, newWidth) => {
        const validHeight = newHeight >= 0 ? Number(newHeight) : 0;
        const validWidth = newWidth >= 0 ? Number(newWidth) : 0;
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
                <CustomButtonGroup
                    buttons={EDIT_ICON_BUTTONS}
                    highlightClass={styles.highlightedButton}
                    selectedButton={selectedDownloadType}
                    handleButtonChange={changeDownloadType}
                />
                <h6 className={styles.groupHeader}>SIZE</h6>
                <div className={styles.sizeGroup}>
                    <CustomButtonGroup
                        buttons={DEFAULT_DOWNLOAD_SIZE_BUTTONS}
                        highlightClass={styles.highlightedButton}
                        selectedButton={selectedDefaultSizeGroup}
                        handleButtonChange={changeStandardDownloadSize}
                    />
                </div>
                <h6 className={styles.groupHeader}>CUSTOM SIZE</h6>
                <div className={styles.configSizeContainer}>
                    <CustomNumberBox label="H" unit="px" value={customSize.height}
                        handleValueChange={(height) => handleCustomSizeChange(height, customSize.width)} />
                    <CustomNumberBox label="W" unit="px" value={customSize.width}
                        handleValueChange={(width) => handleCustomSizeChange(customSize.height, width)} />
                </div>
                <div>
                    <EditIconColorSelector />
                </div>
            </div>
            <div className={styles.downloadZone}>
                <LoadingButton className={styles.downloadButton}>{downloadButtontext}</LoadingButton>
            </div>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    selectedDownloadType: selectIconDownloadFormat,
    downloadSize: selectDownloadSize
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeDownloadType: (format) => dispatch(changeDownloadFormat(format)),
        changeStandardDownloadSize: (size) => dispatch(changeStandardDownloadSize(size)),
        changeCustomDownloadSize: (sizeConfig) => dispatch(changeCustomDownloadSize(sizeConfig))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconConfig);
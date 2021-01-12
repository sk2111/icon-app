//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-config.module.css';
//components
import CustomButtonGroup from '../../reusables/custom-buton-group/custom-button-group.component';
import CustomNumberBox from '../../reusables/custom-number-box/custom-number-box.component';
//actions
import { changeDownloadFormat, changeStandardDownloadSize } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectIconDownloadFormat, selectDownloadSize } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_BUTTONS, DEFAULT_DOWNLOAD_SIZE_BUTTONS } from '../../../utilities/app.constants';

const EditIconConfig = ({ selectedDownloadType, changeDownloadType, downloadSize, changeStandardDownloadSize }) => {

    const { height, width } = downloadSize;
    const selectedDefaultSizeGroup = (height === width) ? height : '';

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
                    <CustomNumberBox label="H" unit="px" value={height} handleValueChange={() => { }} />
                    <CustomNumberBox label="W" unit="px" value={width} handleValueChange={() => { }} />
                </div>
            </div>
            <div className={styles.downloadZone}>

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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconConfig);
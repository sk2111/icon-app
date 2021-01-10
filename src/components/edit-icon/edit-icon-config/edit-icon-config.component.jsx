//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './edit-icon-config.module.css';
//components
import CustomButtonGroup from '../../reusables/custom-buton-group/custom-button-group.component';
//actions
import { changeDownloadFormat } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectIconDownloadFormat } from '../../../redux/edit-icon/edit-icon.selectors';
//constants
import { EDIT_ICON_BUTTONS } from '../../../utilities/app.constants';

const EditIconConfig = ({ selectedDownloadType, changeDownloadType }) => {
    return (
        <div className={styles.container}>
            <div className={styles.configurationZone}>
                <CustomButtonGroup
                    buttons={EDIT_ICON_BUTTONS}
                    highlightClass={styles.highlightedButton}
                    selectedButton={selectedDownloadType}
                    handleButtonChange={changeDownloadType}
                />
            </div>
            <div className={styles.downloadZone}>

            </div>
        </div>
    );
};



const mapStateToProps = createStructuredSelector({
    selectedDownloadType: selectIconDownloadFormat
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeDownloadType: (format) => dispatch(changeDownloadFormat(format)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditIconConfig);
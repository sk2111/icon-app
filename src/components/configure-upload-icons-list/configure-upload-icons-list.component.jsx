//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons-list.module.css';
//component
import CustomSelect from '../custom-select/custom-select.component';
//reselect selectors
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';
//static
import { ReactComponent as EditSvg } from '../../assests/edit-name.svg';



const ConfigureUploadIconsList = ({ uploadedIcons }) => {

    const selectStyles = { height: "27px", width: "160px" };
    const okayBtnClass = styles.okayBtn + ' ' + styles.button;
    const cancelBtnClass = styles.cancelBtn + ' ' + styles.button;

    return (
        <div className={styles.topContainer}>
            {
                uploadedIcons.map(({ id, iconsBase64, iconTags, iconName, iconClassfication }) => {

                    return (
                        <div key={id} className={styles.listContainer}>
                            <div className={styles.imgContainer}>
                                <img className={styles.previewImage} src={`data:image/svg+xml;base64,${iconsBase64}`} alt="Invalid" />
                            </div>
                            <div className={styles.selectionZone}>
                                <div className={styles.iconNameCon}>
                                    <div className={styles.iconName}>{iconName}</div>
                                    <EditSvg className={styles.editSvg} />
                                </div>
                                <CustomSelect style={selectStyles} options={["All", "1", "2", "3"]} defaultSelectValue={"1"} />
                            </div>
                            <div></div>
                        </div>
                    )
                })
            }
            <div className={styles.popupView}>
                <h6 className={styles.popupHeader}>Create New Name</h6>
                <input className={styles.nameInput} type="text" />
                <div className={styles.actionCon}>
                    <button className={cancelBtnClass}>Cancel</button>
                    <button className={okayBtnClass}>Ok</button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadedIcons: selectUploadedCommonIcons,
});

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFilesToCommonIcons: (icons) => { dispatch((icons)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIconsList);
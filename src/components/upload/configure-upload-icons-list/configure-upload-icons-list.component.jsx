//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons-list.module.css';
//component
import CustomSelect from '../reusables/custom-select/custom-select.component';
import RenderView from '../render-view/render-view.component';
//actions
import { editUploadIconName, editUploadIconClassification } from '../../redux/upload-icons/upload-icons.actions';
//reselect selectors
import { selectUploadedCommonIcons } from '../../redux/upload-icons/upload-icons.selectors';
//static
import { ReactComponent as EditSvg } from '../../assests/edit-name.svg';



const ConfigureUploadIconsList = ({ uploadedIcons, editUploadIconName, filteredSelectOptions, editUploadIconClassification }) => {

    const [createNewNameOpen, setCreateNewNameOpen] = useState(false);
    const [iconName, setIconName] = useState({ newName: '', oldName: '', id: '' });

    const selectStyles = { fontSize: "13px", height: "27px", width: "160px" };
    const okayBtnClass = styles.okayBtn + ' ' + styles.button;
    const cancelBtnClass = styles.cancelBtn + ' ' + styles.button;

    const handleEditName = (oldName, id) => {
        setIconName({ newName: oldName, oldName, id });
        setCreateNewNameOpen(true);
    };

    const handleIconNameChange = (eve) => {
        const newNameValue = eve.target.value;
        setIconName({ ...iconName, newName: newNameValue });
    };

    const handleIconNameUpdate = () => {
        const { id, newName, oldName } = iconName;
        if (newName !== oldName) {
            editUploadIconName({ id, value: newName, key: "iconName" });
        }
        setCreateNewNameOpen(false);
    };

    const handleClassificationChange = (id, oldVal, newVal) => {
        if (oldVal !== newVal) {
            editUploadIconClassification({ id, value: [newVal], key: "iconClassification" });
        }
    };

    return (
        <div className={styles.topContainer}>
            {
                uploadedIcons.map(({ id, iconsBase64, iconTags, iconName, iconClassification }) => {
                    const defaultSelectValue = iconClassification[0];
                    return (
                        <div key={id} className={styles.listContainer}>
                            <div className={styles.imgContainer}>
                                <img className={styles.previewImage} src={`data:image/svg+xml;base64,${iconsBase64}`} alt="Invalid" />
                            </div>
                            <div className={styles.selectionZone}>
                                <div className="re-uploadname-container">
                                    <div className={styles.iconName}>{iconName}</div>
                                    <EditSvg className="re-upload-editSvg" onClick={() => handleEditName(iconName, id)} />
                                </div>
                                <CustomSelect
                                    style={selectStyles}
                                    options={filteredSelectOptions}
                                    value={defaultSelectValue}
                                    handleValueChange={(val) => handleClassificationChange(id, defaultSelectValue, val)} />
                            </div>
                            <div></div>
                        </div>
                    )
                })
            }
            <RenderView renderIfTrue={createNewNameOpen}>
                <div className={styles.popupView}>
                    <h6 className={styles.popupHeader}>Create New Name</h6>
                    <input className={styles.nameInput} type="text" value={iconName.newName} onChange={handleIconNameChange} />
                    <div className={styles.actionCon}>
                        <button className={cancelBtnClass} onClick={() => setCreateNewNameOpen(false)}>Cancel</button>
                        <button className={okayBtnClass} onClick={() => handleIconNameUpdate()}>Ok</button>
                    </div>
                </div>
            </RenderView>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadedIcons: selectUploadedCommonIcons,
});

const mapDispatchToProps = (dispatch) => {
    return {
        editUploadIconName: (config) => { dispatch(editUploadIconName(config)) },
        editUploadIconClassification: (config) => { dispatch(editUploadIconClassification(config)) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIconsList);
//libs
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './configure-upload-icons-list.module.css';
//component
import CustomSelect from '../../reusables/custom-select/custom-select.component';
import CustomTags from '../../reusables/custom-tags/custom-tags.component';
import RenderView from '../../reusables/render-view/render-view.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
//actions
import { editUploadIconName, editUploadIconClassification, updateIconTags } from '../../../redux/upload-icons/upload-icons.actions';
//reselect selectors
import { selectUploadedIcons } from '../../../redux/upload-icons/upload-icons.selectors';
//static
import EditPencilWebp from '../../../assests/webp/edit-pencil.webp';
//contants 
import { ICON_PROP } from '../../../utilities/app.constants';
//destructure ICON PROP
const { ICON_ID, ICON_NAME, ICON_CLASSIFICATION, ICON_BASE_64, ICON_TAGS } = ICON_PROP;


const ConfigureUploadIconsList = ({ uploadedIcons, editUploadIconName, classificationOptions,
    tagSuggestionOptions, editUploadIconClassification, updateIconTags }) => {

    const [createNewNameOpen, setCreateNewNameOpen] = useState(false);
    const [iconName, setIconName] = useState({ oldName: '', id: '' });

    const handleEditName = (oldName, id) => {
        setIconName({ oldName, id });
        setCreateNewNameOpen(true);
    };

    const handleIconNameUpdate = (newName) => {
        const { id, oldName } = iconName;
        if (newName !== oldName) {
            editUploadIconName({ [ICON_ID]: id, value: newName, key: ICON_NAME });
        }
        setCreateNewNameOpen(false);
    };

    const handleClassificationChange = (id, oldVal, newVal) => {
        if (oldVal !== newVal) {
            editUploadIconClassification({
                [ICON_ID]: id,
                key: ICON_CLASSIFICATION,
                value: newVal
            });
        }
    };

    const handleIconTagsUpdate = (id, tags) => {
        if (id && tags) {
            updateIconTags({ [ICON_ID]: id, value: tags, key: ICON_TAGS });
        }
    };

    return (
        <div className={styles.topContainer}>
            {
                uploadedIcons.map((icon) => {
                    const selectValue = icon[ICON_CLASSIFICATION];
                    const iconId = icon[ICON_ID];
                    const iconName = icon[ICON_NAME];
                    return (
                        <div key={iconId} className={styles.listContainer}>
                            <div className={styles.nameIconPreview}>
                                <div className={styles.imgContainer}>
                                    <img className={styles.previewImage} src={`data:image/svg+xml;base64,${icon[ICON_BASE_64]}`} alt="Invalid" />
                                </div>
                                <div className={styles.selectionZone}>
                                    <div className={styles.uploadnameContainer}>
                                        <div className={styles.iconName}>{iconName}</div>
                                        <img className={styles.uploadEditPencil} src={EditPencilWebp} alt="edit" onClick={() => handleEditName(iconName, iconId)} />
                                    </div>
                                    <CustomSelect
                                        className={styles.dropdown}
                                        options={classificationOptions}
                                        value={selectValue}
                                        handleValueChange={(val) => handleClassificationChange(iconId, selectValue, val)} />
                                </div>
                            </div>
                            <div className={styles.tagSection}>
                                <CustomTags
                                    className={styles.tagsContainer}
                                    suggestionOptions={tagSuggestionOptions}
                                    tags={icon[ICON_TAGS]}
                                    handleTagsUpdate={(tags) => handleIconTagsUpdate(iconId, tags)} />
                            </div>
                        </div>
                    )
                })
            }
            <RenderView renderIfTrue={createNewNameOpen}>
                <CreateModalCard
                    heading="Create new name"
                    inputType="text"
                    defaultValue={iconName.oldName}
                    handleSubmit={handleIconNameUpdate}
                    handleCancel={() => setCreateNewNameOpen(false)} />
            </RenderView>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadedIcons: selectUploadedIcons,
});

const mapDispatchToProps = (dispatch) => {
    return {
        editUploadIconName: (config) => dispatch(editUploadIconName(config)),
        editUploadIconClassification: (config) => dispatch(editUploadIconClassification(config)),
        updateIconTags: (config) => dispatch(updateIconTags(config))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureUploadIconsList);
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
import { ReactComponent as EditSvg } from '../../../assests/edit-name.svg';
//contants 
import { ICON_PROP } from '../../../utilities/app.constants';


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
            editUploadIconName({ [ICON_PROP.ICON_ID]: id, value: newName, key: ICON_PROP.ICON_NAME });
        }
        setCreateNewNameOpen(false);
    };

    const handleClassificationChange = (id, oldVal, newVal) => {
        if (oldVal !== newVal) {
            editUploadIconClassification({ [ICON_PROP.ICON_ID]: id, value: [newVal], key: ICON_PROP.ICON_CLASSIFICATION });
        }
    };

    const handleIconTagsUpdate = (id, tags) => {
        if (id && tags) {
            updateIconTags({ [ICON_PROP.ICON_ID]: id, value: tags, key: ICON_PROP.ICON_TAGS });
        }
    };

    return (
        <div className={styles.topContainer}>
            {
                uploadedIcons.map((icon) => {
                    const selectValue = icon[ICON_PROP.ICON_CLASSIFICATION][0];
                    const iconId = icon[ICON_PROP.ICON_ID];
                    return (
                        <div key={iconId} className={styles.listContainer}>
                            <div className={styles.imgContainer}>
                                <img className={styles.previewImage} src={`data:image/svg+xml;base64,${icon[ICON_PROP.ICON_BASE_64]}`} alt="Invalid" />
                            </div>
                            <div className={styles.selectionZone}>
                                <div className="re-uploadname-container">
                                    <div className={styles.iconName}>{iconName}</div>
                                    <EditSvg className="re-upload-editSvg" onClick={() => handleEditName(iconName, iconId)} />
                                </div>
                                <CustomSelect
                                    className={styles.dropdown}
                                    options={classificationOptions}
                                    value={selectValue}
                                    handleValueChange={(val) => handleClassificationChange(iconId, selectValue, val)} />
                            </div>
                            <div className={styles.tagSection}>
                                <CustomTags
                                    className={styles.tagsContainer}
                                    suggestionOptions={tagSuggestionOptions}
                                    tags={icon[ICON_PROP.ICON_TAGS]}
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
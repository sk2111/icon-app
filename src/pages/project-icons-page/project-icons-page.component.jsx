//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './project-icons-page.module.css';
//components
import HomeHeader from '../../components/containers/home-header/home-header.component';
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
import IconsDisplayContainer from '../../components/containers/icons-display-container/icons-display-container.component';
//actions
import { openUploadModal } from '../../redux/upload-icons/upload-icons.actions';
import { editSelectedIcon } from '../../redux/edit-icon/edit-icon.actions';
import {
    setProjectIconsTabSearchValue, setProjectIconsTabSelectValue, deleteProjectIconFromDbStart,
    fetchProjectIconsFromDatabaseStart, toggleProjectIconFavoriteModeStart
} from '../../redux/project-icons/project-icons.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../redux/user/user.selectors';
import {
    selectProjectIconsSearchValue, selectProjectIconsSelectValue, selectProjectIconsSearchKeywords,
    selectProjectIconsSelectOptions, selectProjectIconsListToDisplay, selectIsMoreIconsAvailableToFetch
} from '../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_ICONS_HEADER_LABEL, PROJECT_ICONS_INPUT_PLACEHOLDER, PROJECT_ICONS_SELECT_LABEL } from '../../utilities/app.constants';


const ProjectIconsPage = ({ isCurrentUserAdmin, searchKeywords, searchValue, setSearchValue, selectValue, toggleProjectIconFavoriteMode,
    selectOptions, setSelectValue, openUploadModal, iconsList, isMoreIconsAvaliableToFetch,
    fetchMoreProjectIcons, deleteProjectIconFromDb, handleEditIcon }) => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_PLACEHOLDER}
                searchKeywords={searchKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                selectLabelText={PROJECT_ICONS_SELECT_LABEL}
                selectValue={selectValue}
                selectOptions={selectOptions}
                handleSelectValueChange={setSelectValue}
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader
                    label={PROJECT_ICONS_HEADER_LABEL}
                    showUploadButton={isCurrentUserAdmin}
                    handleUploadIcon={openUploadModal}
                />
                <div className={styles.iconsContainer}>
                    <IconsDisplayContainer
                        iconList={iconsList}
                        isMoreIconsAvaliableToFetch={isMoreIconsAvaliableToFetch}
                        fetchMoreIcons={fetchMoreProjectIcons}
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        handleFavoriteSelection={toggleProjectIconFavoriteMode}
                        handleDeleteIcon={deleteProjectIconFromDb}
                        handleEditIcon={handleEditIcon}
                    />
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    searchValue: selectProjectIconsSearchValue,
    selectValue: selectProjectIconsSelectValue,
    searchKeywords: selectProjectIconsSearchKeywords,
    selectOptions: selectProjectIconsSelectOptions,
    iconsList: selectProjectIconsListToDisplay,
    isMoreIconsAvaliableToFetch: selectIsMoreIconsAvailableToFetch
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setProjectIconsTabSearchValue(searchValue)),
        setSelectValue: (selectValue) => dispatch(setProjectIconsTabSelectValue(selectValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
        fetchMoreProjectIcons: () => dispatch(fetchProjectIconsFromDatabaseStart()),
        deleteProjectIconFromDb: (id) => dispatch(deleteProjectIconFromDbStart(id)),
        toggleProjectIconFavoriteMode: (config) => dispatch(toggleProjectIconFavoriteModeStart(config)),
        handleEditIcon: (iconProps) => dispatch(editSelectedIcon(iconProps))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIconsPage);
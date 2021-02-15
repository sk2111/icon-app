//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './project-icons-display.module.css';
//components
import HomeHeader from '../home-header/home-header.component';
import IconsViewHeader from '../icons-view-header/icons-view-header.component';
import IconsDisplayContainer from '../icons-display-container/icons-display-container.component';
//actions
import {
    setProjectIconsTabIconsSearchValue, toggleProjectIconFavoriteModeStart,
    fetchProjectIconsFromDatabaseStart, deleteProjectIconFromDbStart
} from '../../../redux/project-icons/project-icons.actions';
import { editSelectedIcon } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
import {
    selectProjectIconsSearchKeywords, selectProjectIconsSearchValue,
    selectProjectIconsListToDisplay, selectIsMoreIconsAvailableToFetch,
} from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER, PROJECT_ICONS_HEADER_LABEL } from '../../../utilities/app.constants.js';


const ProjectIconsDisplay = ({ iconSearchKeywords, iconSearchValue, setIconSearchValue, iconsList, isMoreIconsAvaliableToFetch,
    fetchMoreProjectIcons, isCurrentUserAdmin, toggleProjectIconFavoriteMode, deleteProjectIconFromDb, handleEditIcon }) => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER}
                searchKeywords={iconSearchKeywords}
                searchValue={iconSearchValue}
                handleSearchValueChange={setIconSearchValue}
                hideSelect
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader
                    label={PROJECT_ICONS_HEADER_LABEL}
                    showUploadButton={false}
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
    iconSearchKeywords: selectProjectIconsSearchKeywords,
    iconSearchValue: selectProjectIconsSearchValue,
    iconsList: selectProjectIconsListToDisplay,
    isMoreIconsAvaliableToFetch: selectIsMoreIconsAvailableToFetch,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setIconSearchValue: (searchValue) => dispatch(setProjectIconsTabIconsSearchValue(searchValue)),
        fetchMoreProjectIcons: () => dispatch(fetchProjectIconsFromDatabaseStart()),
        toggleProjectIconFavoriteMode: (config) => dispatch(toggleProjectIconFavoriteModeStart(config)),
        deleteProjectIconFromDb: (id) => dispatch(deleteProjectIconFromDbStart(id)),
        handleEditIcon: (iconProps) => dispatch(editSelectedIcon(iconProps))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIconsDisplay);
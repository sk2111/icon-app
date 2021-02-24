//libs
import React, { useEffect } from 'react';
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
    fetchProjectIconsFromDatabaseStart, deleteProjectIconFromDbStart,
    setRouteBasedProjectValue
} from '../../../redux/project-icons/project-icons.actions';
import { editSelectedIcon } from '../../../redux/edit-icon/edit-icon.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
import {
    selectProjectIconsSearchValue, selectProjectIconsListToDisplay,
    selectIsMoreIconsAvailableToFetch, selectUserSelectedProject,
} from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER, PROJECT_ICONS_HEADER_LABEL } from '../../../utilities/app.constants.js';


const ProjectIconsDisplay = ({ iconSearchValue, setIconSearchValue, iconsList, isMoreIconsAvaliableToFetch,
    fetchMoreProjectIcons, isCurrentUserAdmin, toggleProjectIconFavoriteMode, deleteProjectIconFromDb, handleEditIcon,
    match, userSelectedProject, setRouteBasedProjectValue }) => {

    useEffect(() => {
        const { projectId } = match.params;
        if (!userSelectedProject && projectId) {
            setRouteBasedProjectValue(projectId);
        }
    }, [match, userSelectedProject, setRouteBasedProjectValue]);

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER}
                searchKeywords={[]}
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
    iconSearchValue: selectProjectIconsSearchValue,
    iconsList: selectProjectIconsListToDisplay,
    isMoreIconsAvaliableToFetch: selectIsMoreIconsAvailableToFetch,
    userSelectedProject: selectUserSelectedProject,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setIconSearchValue: (searchValue) => dispatch(setProjectIconsTabIconsSearchValue(searchValue)),
        setRouteBasedProjectValue: (projectValue) => dispatch(setRouteBasedProjectValue(projectValue)),
        fetchMoreProjectIcons: () => dispatch(fetchProjectIconsFromDatabaseStart()),
        toggleProjectIconFavoriteMode: (config) => dispatch(toggleProjectIconFavoriteModeStart(config)),
        deleteProjectIconFromDb: (id) => dispatch(deleteProjectIconFromDbStart(id)),
        handleEditIcon: (iconProps) => dispatch(editSelectedIcon(iconProps))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIconsDisplay);
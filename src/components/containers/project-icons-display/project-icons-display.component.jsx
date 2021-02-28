//libs
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
//styles
import styles from './project-icons-display.module.css';
//components
import HomeHeader from '../home-header/home-header.component';
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
import { PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER, PROJECT_DISPLAY_HEADER_LABEL } from '../../../utilities/app.constants.js';
import { PROJECTS_ROUTE_PATH } from '../../../utilities/route.paths';
// static assests
import CheveronImg from '../../../assests/webp/cheveron.webp';

const ProjectIconsDisplay = ({ iconSearchValue, setIconSearchValue, iconsList, isMoreIconsAvaliableToFetch,
    fetchMoreProjectIcons, isCurrentUserAdmin, toggleProjectIconFavoriteMode, deleteProjectIconFromDb, handleEditIcon,
    match, userSelectedProject, setRouteBasedProjectValue }) => {

    const history = useHistory();

    useEffect(() => {
        const { projectId } = match.params;
        if (!userSelectedProject && projectId) {
            setRouteBasedProjectValue(projectId);
        }
    }, [match, userSelectedProject, setRouteBasedProjectValue]);

    const goBackToProjects = () => {
        history.goBack();
        history.push(PROJECTS_ROUTE_PATH)
    };

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
                <div className={styles.titleContainer}>
                    <div className={styles.title}>
                        <span className={styles.backBtnTitle} onClick={goBackToProjects}>{PROJECT_DISPLAY_HEADER_LABEL}</span>
                        <img className={styles.titleSplitter} src={CheveronImg} alt=">"/>
                        <span className={styles.titleProjectName}>{userSelectedProject}</span>
                    </div>
                </div>
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
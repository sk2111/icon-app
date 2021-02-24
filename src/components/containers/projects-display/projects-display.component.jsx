//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
//styles
import styles from './projects-display.module.css';
//component
import HomeHeader from '../home-header/home-header.component';
import IconsViewHeader from '../icons-view-header/icons-view-header.component';
import RenderView from '../../reusables/render-view/render-view.component';
//actions
import { setProjectIconsTabProjectSearchValue, setUserSelectedProjectValue } from '../../../redux/project-icons/project-icons.actions';
import { openUploadModal } from '../../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
import { selectProjectSearchValue, selectFilteredProjectsList, selectAllProjectsList } from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_ICONS_HEADER_LABEL, PROJECT_DISPLAY_HEADER_LABEL, PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER, PROJECT_TILE_STY_LENGTH_LIMIT } from '../../../utilities/app.constants';
import { PROJECTS_ROUTE_PATH } from '../../../utilities/route.paths';
//assests
import ProjectTileImg from '../../../assests/webp/project-tile.webp';
import ProjectsNotFoundImg from '../../../assests/webp/not-found-projects.webp';

const ProjectsDisplay = ({ searchValue, setSearchValue, isCurrentUserAdmin, openUploadModal,
    filteredProjectsList, allProjectsList, setProjectValue }) => {

    const displayContainer = styles.container + ' ' +
        (filteredProjectsList.length < PROJECT_TILE_STY_LENGTH_LIMIT ? styles.smallList : styles.largeList);

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER}
                searchKeywords={allProjectsList}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                hideSelect
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader
                    label={PROJECT_DISPLAY_HEADER_LABEL}
                    uploadMode={PROJECT_ICONS_HEADER_LABEL}
                    showUploadButton={isCurrentUserAdmin}
                    handleUploadIcon={openUploadModal}
                />
                <div className={styles.overflowContainer}>
                    <div className={displayContainer}>
                        {
                            filteredProjectsList.map((projectName) => {
                                return (
                                    <Link key={projectName}
                                        to={`${PROJECTS_ROUTE_PATH}/${projectName.toLowerCase()}`}
                                        onClick={() => { setProjectValue(projectName) }}>
                                        <div className={styles.projectTileContainer}>
                                            <img className={styles.projectTile} src={ProjectTileImg} alt="" />
                                            <p className={styles.projectName} title={projectName}>{projectName}</p>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
                <RenderView renderIfTrue={(filteredProjectsList.length === 0)}>
                    <div>
                        <img className={styles.notFoundImg} src={ProjectsNotFoundImg} alt="" />
                    </div>
                </RenderView>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    searchValue: selectProjectSearchValue,
    filteredProjectsList: selectFilteredProjectsList,
    allProjectsList: selectAllProjectsList,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setProjectIconsTabProjectSearchValue(searchValue)),
        setProjectValue: (projectValue) => dispatch(setUserSelectedProjectValue(projectValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDisplay);


//libs
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
//styles
import styles from './projects-display.module.css';
//component
import HomeHeader from '../home-header/home-header.component';
import IconsViewHeader from '../icons-view-header/icons-view-header.component';
import RenderView from '../../reusables/render-view/render-view.component';
import CreateModalCard from '../../reusables/create-modal-card/create-modal-card.component';
//actions
import {
    setProjectIconsTabProjectSearchValue, deleteProjectStart,
    setUserSelectedProjectValue, openDeleteProjectModal, closeDeleteProjectModal
} from '../../../redux/project-icons/project-icons.actions';
import { openUploadModal } from '../../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
import { selectProjectSearchValue, selectFilteredProjectsList, selectAllProjectsList, selectShowDeleteProjectModal } from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_ICONS_HEADER_LABEL, PROJECT_DISPLAY_HEADER_LABEL, PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER, PROJECT_TILE_STY_LENGTH_LIMIT } from '../../../utilities/app.constants';
import { PROJECTS_ROUTE_PATH } from '../../../utilities/route.paths';
//assests
import ProjectTileImg from '../../../assests/webp/project-tile.webp';
import ProjectsNotFoundImg from '../../../assests/webp/not-found-projects.webp';
import DeleteIcon from '../../../assests/png/delete-icon-white.png';

const ProjectsDisplay = ({ searchValue, setSearchValue, isCurrentUserAdmin,
    openUploadModal, filteredProjectsList, allProjectsList, setProjectValue,
    showDeleteProjectModal, openDeleteProjectModal, closeDeleteProjectModal,
    deleteProjectStart
}) => {

    const projectRef = useRef({});
    const displayContainer = styles.container + ' ' +
        (filteredProjectsList.length < PROJECT_TILE_STY_LENGTH_LIMIT ? styles.smallList : styles.largeList);

    const handleProjectDelete = (e, projectName) => {
        e.preventDefault();
        e.stopPropagation();
        projectRef.current.name = projectName;
        openDeleteProjectModal();
    };
    const handleDeleteProjectCancel = () => {
        closeDeleteProjectModal();
    };
    const handleDeleteProject = () => {
        closeDeleteProjectModal();
        deleteProjectStart({ projectName: projectRef.current.name });
    };

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
                                            <RenderView renderIfTrue={isCurrentUserAdmin}>
                                                <div className={styles.deleteZone} onClick={(e) => handleProjectDelete(e, projectName)}>
                                                    <img className={styles.deleteIcon} alt="D" src={DeleteIcon} />
                                                </div>
                                            </RenderView>
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
                <RenderView renderIfTrue={showDeleteProjectModal && isCurrentUserAdmin}>
                    <CreateModalCard className={styles.deleteCard}>
                        <h6 className={styles.confirmHeader}>Are you sure you want to delete Project?</h6>
                        <div className={styles.confirmBtnContainer}>
                            <button className={styles.cancelButton} onClick={handleDeleteProjectCancel}>Cancel</button>
                            <button className={styles.proceedButton} onClick={handleDeleteProject} >OK</button>
                        </div>
                    </CreateModalCard>
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
    showDeleteProjectModal: selectShowDeleteProjectModal,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setProjectIconsTabProjectSearchValue(searchValue)),
        setProjectValue: (projectValue) => dispatch(setUserSelectedProjectValue(projectValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
        openDeleteProjectModal: () => dispatch(openDeleteProjectModal()),
        closeDeleteProjectModal: () => dispatch(closeDeleteProjectModal()),
        deleteProjectStart: (name) => dispatch(deleteProjectStart(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDisplay);


//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//styles
import styles from './projects-display.module.css';
//component
import HomeHeader from '../home-header/home-header.component';
import IconsViewHeader from '../icons-view-header/icons-view-header.component';
//actions
import { setProjectIconsTabProjectSearchValue } from '../../../redux/project-icons/project-icons.actions';
import { openUploadModal } from '../../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
import { selectProjectSearchValue, selectProjectsList, selectProjectIconsSelectOptions } from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_DISPLAY_HEADER_LABEL, PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER, PROJECT_TILE_STY_LENGTH_LIMIT } from '../../../utilities/app.constants';
//assests
import ProjectTileImg from '../../../assests/webp/project-tile.webp';

const ProjectsDisplay = ({ searchValue, setSearchValue, isCurrentUserAdmin, openUploadModal,
    projectList, projectKeywords }) => {

    const displayContainer = styles.container + ' ' +
        (projectList.length < PROJECT_TILE_STY_LENGTH_LIMIT ? styles.smallList : styles.largeList);

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER}
                searchKeywords={projectKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                hideSelect
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader
                    label={PROJECT_DISPLAY_HEADER_LABEL}
                    showUploadButton={isCurrentUserAdmin}
                    handleUploadIcon={openUploadModal}
                />
                <div className={styles.overflowContainer}>
                    <div className={displayContainer}>
                        {
                            projectList.map((projectName) => {
                                return (
                                    <div key={projectName} className={styles.projectTileContainer}>
                                        <img className={styles.projectTile} src={ProjectTileImg} alt="" />
                                        <p className={styles.projectName} title={projectName}>{projectName}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    searchValue: selectProjectSearchValue,
    projectList: selectProjectsList,
    projectKeywords: selectProjectIconsSelectOptions,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setProjectIconsTabProjectSearchValue(searchValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDisplay);


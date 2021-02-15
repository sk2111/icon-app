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
import { selectProjectSearchValue } from '../../../redux/project-icons/project-icons.selectors';
//constants
import { PROJECT_DISPLAY_HEADER_LABEL, PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER } from '../../../utilities/app.constants';


const ProjectsDisplay = ({ searchKeywords, searchValue, setSearchValue, isCurrentUserAdmin, openUploadModal }) => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER}
                searchKeywords={searchKeywords}
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
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    searchValue: selectProjectSearchValue
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setProjectIconsTabProjectSearchValue(searchValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDisplay);


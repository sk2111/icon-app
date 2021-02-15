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

//reselect
import { selectCurrentUserAdminRole } from '../../../redux/user/user.selectors';
//constants
import { PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER, PROJECT_ICONS_HEADER_LABEL } from '../../../utilities/app.constants.js';


const ProjectIconsDisplay = ({ searchKeywords, searchValue, setSearchValue, iconsList = [], isMoreIconsAvaliableToFetch,
    fetchMoreProjectIcons, isCurrentUserAdmin, toggleProjectIconFavoriteMode, deleteProjectIconFromDb, handleEditIcon }) => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER}
                searchKeywords={searchKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
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
    isCurrentUserAdmin: selectCurrentUserAdminRole
});

const mapDispatchToProps = () => {

};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectIconsDisplay);
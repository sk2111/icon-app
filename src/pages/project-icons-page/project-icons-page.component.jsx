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
//reselect
import { selectCurrentUserAdminRole } from '../../redux/user/user.selectors';
//constants
import { PROJECT_ICONS_HEADER_LABEL, PROJECT_ICONS_INPUT_PLACEHOLDER, PROJECT_ICONS_SELECT_LABEL } from '../../utilities/app.constants';


const ProjectIconsPage = ({ isCurrentUserAdmin, searchKeywords, searchValue, setSearchValue, selectValue, selectOptions, setSelectValue,
    openUploadModal, iconsList, isMoreIconsAvaliableToFetch, fetchMoreCommonIcons }) => {
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
                    <IconsDisplayContainer iconList={[]}
                        isMoreIconsAvaliableToFetch={isMoreIconsAvaliableToFetch}
                        fetchMoreIcons={fetchMoreCommonIcons} />
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole
});

export default connect(mapStateToProps)(ProjectIconsPage);
//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './common-icons-page.module.css';
//components
import HomeHeader from '../../components/containers/home-header/home-header.component';
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
import IconsDisplayContainer from '../../components/containers/icons-display-container/icons-display-container.component';
//actions
import {
    fetchCommonIconsFromDatabaseStart, setCommonIconsTabSearchValue, deleteCommonIconFromDbStart,
    setCommonIconsTabSelectValue, toggleCommonIconFavoriteModeStart
} from '../../redux/common-icons/common-icons.actions';
import { editSelectedIcon } from '../../redux/edit-icon/edit-icon.actions';
import { openUploadModal } from '../../redux/upload-icons/upload-icons.actions';
//reselect
import { selectCurrentUserAdminRole } from '../../redux/user/user.selectors';
import {
    selectCommonIconsSearchKeywords, selectCommonIconsSelectOptions, selectIsMoreIconsAvailableToFetch,
    selectCommonIconsSearchValue, selectCommonIconsSelectValue, selectCommonIconsListToDisplay
} from '../../redux/common-icons/common-icons.selectors';
//constants
import { COMMON_ICONS_HEADER_LABEL, COMMON_ICONS_INPUT_PLACEHOLDER, COMMON_ICONS_SELECT_LABEL } from '../../utilities/app.constants';


const CommonIconsPage = ({ isCurrentUserAdmin, searchKeywords, searchValue, setSearchValue, selectOptions, selectValue,
    setSelectValue, openUploadModal, iconsList, isMoreIconsAvaliableToFetch, deleteCommonIconFromDb,
    fetchMoreCommonIcons, toggleCommonIconFavoriteMode, handleEditIcon }) => {
    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                hideSelect
                searchPlaceHolder={COMMON_ICONS_INPUT_PLACEHOLDER}
                searchKeywords={searchKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                selectLabelText={COMMON_ICONS_SELECT_LABEL}
                selectValue={selectValue}
                selectOptions={selectOptions}
                handleSelectValueChange={setSelectValue}
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader
                    label={COMMON_ICONS_HEADER_LABEL}
                    uploadMode={COMMON_ICONS_HEADER_LABEL}
                    showUploadButton={isCurrentUserAdmin}
                    handleUploadIcon={openUploadModal}
                />
                <div className={styles.iconsContainer}>
                    <IconsDisplayContainer
                        iconList={iconsList}
                        isMoreIconsAvaliableToFetch={isMoreIconsAvaliableToFetch}
                        fetchMoreIcons={fetchMoreCommonIcons}
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        handleFavoriteSelection={toggleCommonIconFavoriteMode}
                        handleDeleteIcon={deleteCommonIconFromDb}
                        handleEditIcon={handleEditIcon}
                    />

                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    searchValue: selectCommonIconsSearchValue,
    selectValue: selectCommonIconsSelectValue,
    searchKeywords: selectCommonIconsSearchKeywords,
    selectOptions: selectCommonIconsSelectOptions,
    iconsList: selectCommonIconsListToDisplay,
    isMoreIconsAvaliableToFetch: selectIsMoreIconsAvailableToFetch
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setCommonIconsTabSearchValue(searchValue)),
        setSelectValue: (selectValue) => dispatch(setCommonIconsTabSelectValue(selectValue)),
        openUploadModal: (tabName) => dispatch(openUploadModal(tabName)),
        fetchMoreCommonIcons: () => dispatch(fetchCommonIconsFromDatabaseStart()),
        deleteCommonIconFromDb: (id) => dispatch(deleteCommonIconFromDbStart(id)),
        toggleCommonIconFavoriteMode: (config) => dispatch(toggleCommonIconFavoriteModeStart(config)),
        handleEditIcon: (iconProps) => dispatch(editSelectedIcon(iconProps))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonIconsPage);
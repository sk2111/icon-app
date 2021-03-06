//libs
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './favorites-icons-page.module.css';
//components
import IconsDisplayContainer from '../../components/containers/icons-display-container/icons-display-container.component';
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
import HomeHeader from '../../components/containers/home-header/home-header.component';
//actions
import {
    fetchCurrentUserFavoriteIconsStart, setFavoriteTabSearchValue,
    deleteIconFromFavoriteTabStart, toggleIconFavoriteModeStart, syncFavoriteTabIconsWithFetchMap
} from '../../redux/favorite-icons/favorite-icons.actions';
import { editSelectedIcon } from '../../redux/edit-icon/edit-icon.actions';
//selectors
import { selectCurrentUserAdminRole, selectIsMoreFavoriteIconsAvailableToFetch } from '../../redux/user/user.selectors';
import { selectFavoriteIconsListToDisplay, selectFavoriteIconsSearchValue } from '../../redux/favorite-icons/favorite-icons.selectors';
//constants
import { FAVORITES_ICONS_HEADER_LABEL, FAVORITES_ICONS_INPUT_PLACEHOLDER } from '../../utilities/app.constants';


const FavoritesIconsPage = ({ searchKeywords, searchValue, setSearchValue, iconsList, isMoreIconsAvaliableToFetch,
    fetchMoreFavoriteIcons, isCurrentUserAdmin, toggleFavoriteMode, deleteIconFromDb, syncFavoriteIcons, handleEditIcon }) => {

    useEffect(() => {
        syncFavoriteIcons();
    }, [syncFavoriteIcons]);

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={FAVORITES_ICONS_INPUT_PLACEHOLDER}
                searchKeywords={searchKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                hideSelect={true}
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader label={FAVORITES_ICONS_HEADER_LABEL} showUploadButton={false} />
                <div className={styles.iconsContainer}>
                    <IconsDisplayContainer
                        iconList={iconsList}
                        isMoreIconsAvaliableToFetch={isMoreIconsAvaliableToFetch}
                        fetchMoreIcons={fetchMoreFavoriteIcons}
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        handleFavoriteSelection={toggleFavoriteMode}
                        handleDeleteIcon={deleteIconFromDb}
                        handleEditIcon={handleEditIcon}
                    />
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    isCurrentUserAdmin: selectCurrentUserAdminRole,
    isMoreIconsAvaliableToFetch: selectIsMoreFavoriteIconsAvailableToFetch,
    iconsList: selectFavoriteIconsListToDisplay,
    searchValue: selectFavoriteIconsSearchValue,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (value) => dispatch(setFavoriteTabSearchValue(value)),
        fetchMoreFavoriteIcons: () => dispatch(fetchCurrentUserFavoriteIconsStart()),
        deleteIconFromDb: (id) => dispatch(deleteIconFromFavoriteTabStart(id)),
        toggleFavoriteMode: (config) => dispatch(toggleIconFavoriteModeStart(config)),
        syncFavoriteIcons: () => dispatch(syncFavoriteTabIconsWithFetchMap()),
        handleEditIcon: (iconProps) => dispatch(editSelectedIcon(iconProps))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesIconsPage);
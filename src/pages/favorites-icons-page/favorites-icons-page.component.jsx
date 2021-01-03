//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './favorites-icons-page.module.css';
//components
import IconsViewHeader from '../../components/containers/icons-view-header/icons-view-header.component';
import HomeHeader from '../../components/containers/home-header/home-header.component';
//constants
import { FAVORITES_ICONS_HEADER_LABEL, FAVORITES_ICONS_INPUT_PLACEHOLDER } from '../../utilities/app.constants';


const FavoritesIconsPage = ({ searchKeywords, searchValue, setSearchValue }) => {
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
                <IconsViewHeader label={FAVORITES_ICONS_HEADER_LABEL} />
                <div className={styles.iconsContainer}>

                </div>
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    test: () => 'test'
});

export default connect(mapStateToProps)(FavoritesIconsPage);
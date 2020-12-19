//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './home-header.module.css';
//components
import SearchSelectDropdown from '../../components/search-select-dropdown/search-select-dropdown.component';
import CustomSelect from '../reusables/custom-select/custom-select.component';
import UserProfile from '../user-profile/user-profile.component';
import RenderView from '../render-view/render-view.component';
//actions
import { toggleNavigationMenuView } from '../../redux/app-data/app-data.actions';
//static
import { ReactComponent as HamSvg } from '../../assests/ham-menu.svg';


const HomeHeader = ({ toggleNavigationMenuView, hideSelect,
    searchPlaceHolder, searchValue, searchKeywords, handleSearchValueChange,
    selectLabelText, selectOptions, handleSelectValueChange, selectValue }) => {

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg className={styles.hamsvg} onClick={toggleNavigationMenuView} />
                <SearchSelectDropdown
                    className={styles.searchAlign}
                    placeholder={searchPlaceHolder}
                    defaultSearchValue={searchValue}
                    searchList={searchKeywords}
                    handleSearchValueChange={handleSearchValueChange}
                />
                <RenderView renderIfFalse={!!hideSelect}>
                    <CustomSelect
                        label={selectLabelText}
                        options={selectOptions}
                        value={selectValue}
                        handleValueChange={handleSelectValueChange}
                    />
                </RenderView>
            </div>
            <div className={styles.headerRightSec}>
                <UserProfile />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNavigationMenuView: () => dispatch(toggleNavigationMenuView())
    }
}
export default connect(null, mapDispatchToProps)(HomeHeader);
//libs
import React from 'react';
import { connect } from 'react-redux';
//css
import styles from './home-header.module.css';
//components
import SearchSelectDropdown from '../../components/search-select-dropdown/search-select-dropdown.component';
import CustomSelect from '../custom-select/custom-select.component';
import UserProfile from '../user-profile/user-profile.component';
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
                    className="ml-24"
                    placeholder={searchPlaceHolder}
                    defaultSearchValue={searchValue}
                    searchList={searchKeywords}
                    handleSearchValueChange={handleSearchValueChange}
                />
                {
                    hideSelect ? null :
                        (
                            <CustomSelect
                                label={selectLabelText}
                                options={selectOptions}
                                defaultSelectValue={selectValue}
                                handleSelectValueChange={handleSelectValueChange}
                            />
                        )
                }
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
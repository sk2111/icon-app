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


const HomeHeader = ({ toggleNavigationMenuView, searchPlaceHolder, searchOptions,
    selectLabelText, selectOptions, hideSelect }) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg
                    className={styles.hamsvg}
                    onClick={toggleNavigationMenuView}
                ></HamSvg>
                <SearchSelectDropdown
                    className="ml-24"
                    placeholder={searchPlaceHolder}
                    searchList={searchOptions}
                />
                {
                    hideSelect ? null :
                        (
                            <CustomSelect
                                label={selectLabelText}
                                options={selectOptions}
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
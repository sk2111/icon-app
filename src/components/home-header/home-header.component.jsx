//libs
import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './home-header.module.css';
//components
import SearchSelectDropdown from '../../components/search-select-dropdown/search-select-dropdown.component';
import CustomSelect from '../custom-select/custom-select.component';
import UserProfile from '../user-profile/user-profile.component';
//reselect
import {
    selectCommonIconsSearchKeywords, selectCommonIconsSelectOptions
} from '../../redux/common-icons/common-icons.selectors';
//utils
import { ROUTE_MATCH_LIST, PLACEHOLDERMAP, LABELTEXTMAP, KEYWORDS, SELECT_OPTIONS } from './home-header.util';
//route constants
import { COMMON_ROUTE, PROJECTS_ROUTE, FAVORITES_ROUTE, EDIT_ROUTE } from '../../utilities/route.paths';
//static
import { ReactComponent as HamSvg } from '../../assests/ham-menu.svg';


const HomeHeader = ({ navMenuExpanded, setNavMenuExpanded, commonIconsKeywords,
    commonIconsSelectOptions }) => {

    const { pathname } = useLocation();
    const commonIconsMap = {
        [COMMON_ROUTE + KEYWORDS]: commonIconsKeywords,
        [COMMON_ROUTE + SELECT_OPTIONS]: commonIconsSelectOptions
    };
    // const projectIconsMap = {
    //     [PROJECTS_ROUTE + KEYWORDS]: commonIconsKeywords,
    //     [PROJECTS_ROUTE + SELECT_OPTIONS]: commonIconsSelectOptions
    // };

    const isMatchFound = ROUTE_MATCH_LIST.includes(pathname);
    const placeHolderText = isMatchFound ? PLACEHOLDERMAP[pathname] : '';
    const selectLabelText = isMatchFound ? LABELTEXTMAP[pathname] : '';
    const searchOptions = commonIconsMap[pathname + KEYWORDS] || [];
    const selectOptions = commonIconsMap[pathname + SELECT_OPTIONS] || ['All']; //default show some value

    console.log("My testing select options", searchOptions, selectOptions);

    const renderHelper = () => {
        if ((pathname === EDIT_ROUTE) || !isMatchFound) return null;
        return (
            <React.Fragment>
                <SearchSelectDropdown className="ml-24" placeholder={placeHolderText} searchList={searchOptions} />
                {pathname !== FAVORITES_ROUTE ? <CustomSelect label={selectLabelText} options={selectOptions} /> : null}
            </React.Fragment>
        );
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg className={styles.hamsvg} onClick={() => setNavMenuExpanded(!navMenuExpanded)}></HamSvg>
                {renderHelper()}
            </div>
            <div className={styles.headerRightSec}>
                <UserProfile />
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    commonIconsKeywords: selectCommonIconsSearchKeywords,
    commonIconsSelectOptions: selectCommonIconsSelectOptions
});

export default connect(mapStateToProps)(HomeHeader);
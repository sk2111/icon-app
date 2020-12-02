//libs
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './common-icons-page.module.css';
//components
import HomeHeader from '../../components/home-header/home-header.component';
import IconsViewHeader from '../../components/icons-view-header/icons-view-header.component';
//actions
import { setCommonIconsTabSearchValue, setCommonIconsTabSelectValue } from '../../redux/common-icons/common-icons.actions';
//reselect
import { selectCurrentUserAccessRole } from '../../redux/user/user.selectors';
import {
    selectCommonIconsSearchKeywords, selectCommonIconsSelectOptions,
    selectCommonIconsSearchValue, selectCommonIconsSelectValue
} from '../../redux/common-icons/common-icons.selectors';
//constants
import { COMMON_ICONS_HEADER_LABEL, COMMON_ICONS_INPUT_PLACEHOLDER, COMMON_ICONS_SELECT_LABEL } from '../../utilities/app.constants';


const CommonIconsPage = ({ currentUserAccessRole, searchKeywords, searchValue, setSearchValue,
    selectOptions, setSelectValue }) => {

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
                searchPlaceHolder={COMMON_ICONS_INPUT_PLACEHOLDER}
                searchKeywords={searchKeywords}
                searchValue={searchValue}
                handleSearchValueChange={setSearchValue}
                selectLabelText={COMMON_ICONS_SELECT_LABEL}
                selectOptions={selectOptions}
            />
            <div className={styles.viewContainer}>
                <IconsViewHeader label={COMMON_ICONS_HEADER_LABEL} showUploadButton={currentUserAccessRole} />
            </div>
        </div>
    );
};


const mapStateToProps = createStructuredSelector({
    currentUserAccessRole: selectCurrentUserAccessRole,
    searchValue: selectCommonIconsSearchValue,
    selectValue: selectCommonIconsSelectValue,
    searchKeywords: selectCommonIconsSearchKeywords,
    selectOptions: selectCommonIconsSelectOptions
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setCommonIconsTabSearchValue(searchValue)),
        setSelectValue: (selectValue) => dispatch(setCommonIconsTabSelectValue(selectValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonIconsPage);
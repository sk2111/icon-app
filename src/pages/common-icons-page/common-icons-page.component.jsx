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
import { selectCurrentUserAdminRole } from '../../redux/user/user.selectors';
import {
    selectCommonIconsSearchKeywords, selectCommonIconsSelectOptions,
    selectCommonIconsSearchValue, selectCommonIconsSelectValue, selectCommonIconsToDisplay
} from '../../redux/common-icons/common-icons.selectors';
//constants
import { COMMON_ICONS_HEADER_LABEL, COMMON_ICONS_INPUT_PLACEHOLDER, COMMON_ICONS_SELECT_LABEL } from '../../utilities/app.constants';


const CommonIconsPage = ({ isCurrentUserAdmin, searchKeywords, searchValue, setSearchValue,
    selectOptions, selectValue, setSelectValue, icons }) => {

    return (
        <div className={styles.pageContainer}>
            <HomeHeader
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
                <IconsViewHeader label={COMMON_ICONS_HEADER_LABEL} showUploadButton={isCurrentUserAdmin} />
                <div>
                    {
                        icons.map((icon) => {
                            return <div>{icon.name}</div>;
                        })
                    }
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
    icons: selectCommonIconsToDisplay
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (searchValue) => dispatch(setCommonIconsTabSearchValue(searchValue)),
        setSelectValue: (selectValue) => dispatch(setCommonIconsTabSelectValue(selectValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonIconsPage);
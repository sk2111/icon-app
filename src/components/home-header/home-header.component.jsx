//libs
import React from 'react';
//css
import styles from './home-header.module.css';
//components
import SearchSelectDropdown from '../../components/search-select-dropdown/search-select-dropdown.component';
import CustomSelect from '../custom-select/custom-select.component';
import UserProfile from '../user-profile/user-profile.component';
//static
import { ReactComponent as HamSvg } from '../../assests/ham-menu.svg';


const HomeHeader = ({ navMenuExpanded, setNavMenuExpanded }) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg className={styles.hamsvg} onClick={() => setNavMenuExpanded(!navMenuExpanded)}></HamSvg>
                <SearchSelectDropdown className="ml-24" placeholder="Search for your favourite icon" />
                <CustomSelect options={['All', 'Human', 'Flower', 'Bridge', 'Arrow']} />
            </div>
            <div className={styles.headerRightSec}>
                <UserProfile />
            </div>
        </div>
    );
};

export default HomeHeader;
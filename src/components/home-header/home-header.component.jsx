//libs
import React from 'react';
//css
import styles from './home-header.module.css';
//components
import SearchSelectDropdown from '../../components/search-select-dropdown/search-select-dropdown.component';
//static
import { ReactComponent as HamSvg } from '../../assests/ham-menu.svg';


const HomeHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg></HamSvg>
                <SearchSelectDropdown className="ml-24" placeholder="Search for your favourite icon" />
                <span className={styles.dropLabel}>Categories</span>
                <select className={styles.dropdown}>
                    <option>All</option>
                    <option>Home</option>
                    <option>Human</option>
                    <option>Arrows</option>
                    <option>All</option>
                    <option>Home</option>
                    <option>Human</option>
                    <option>Arrows</option>
                    <option>All</option>
                    <option>Home</option>
                    <option>Human</option>
                    <option>Arrows</option>
                </select>
            </div>
            <div className={styles.headerRightSec}>

            </div>
        </div>
    );
};

export default HomeHeader;
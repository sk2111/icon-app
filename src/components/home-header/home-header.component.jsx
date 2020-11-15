import React from 'react';
import styles from './home-header.module.css';
import { ReactComponent as HamSvg } from '../../assests/ham-menu.svg';

const HomeHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeftSec}>
                <HamSvg></HamSvg>

            </div>
            <div className={styles.headerRightSec}>

            </div>
        </div>
    );
};

export default HomeHeader;
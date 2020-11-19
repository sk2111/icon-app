//libs
import React from 'react';
import { Link } from 'react-router-dom';
//css
import styles from './navigation-menu.module.css';
//static
import { ReactComponent as AppLogo } from '../../assests/applogo.svg';
//constants
import { NAVI_LINKS } from './navigation-menu.utilities';

const NavigationMenu = () => {
    return (
        <div className={styles.navContainer}>
            <div className={`${styles.headerCon} flex-row-acen`}>
                <AppLogo className={styles.appLogo} />
                <h2 className={styles.navTitle}>Soliton Icons</h2>
            </div>
            <div className={styles.routeLinks}>
                {
                    NAVI_LINKS.map((link) => {
                        return (
                            <div className={`${styles.naviLinkCon} flex-row-acen`}>
                                <AppLogo className={styles.navLogo} />
                                <Link className={styles.navLink} to={`${link.route}`}>{link.name}</Link>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default NavigationMenu;
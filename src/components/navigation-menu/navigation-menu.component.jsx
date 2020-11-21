//libs
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//css
import styles from './navigation-menu.module.css';
//static
import { ReactComponent as AppLogo } from '../../assests/applogo.svg';
//constants
import { NAVI_LINKS } from './navigation-menu.utilities';

const NavigationMenu = () => {
    
    const history = useHistory();
    const { pathname } = useLocation();

    return (
        <div className={styles.navContainer}>
            <div className={`${styles.headerCon} flex-row-acen`}>
                <AppLogo className={styles.appLogo} />
                <h2 className={styles.navTitle}>Soliton Icons</h2>
            </div>
            <div className={styles.routeLinks}>
                {
                    NAVI_LINKS.map(({ name, route }) => {
                        return (
                            <div key={name}
                                className={`${styles.naviLinkCon} ${pathname === route ? styles.highlightNavi : ''}`}
                                onClick={() => history.push(route)}>
                                <AppLogo className={styles.navLogo} />
                                <p className={styles.navLink}>{name}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default NavigationMenu;
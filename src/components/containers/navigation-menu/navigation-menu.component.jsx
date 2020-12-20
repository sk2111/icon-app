//libs
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//css
import styles from './navigation-menu.module.css';
//static
import { ReactComponent as AppLogo } from '../../../assests/applogo.svg';
//constants
import { NAVI_LINKS, MESSAGE_LINK } from './navigation-menu.utilities';

const NavigationMenu = () => {

    const history = useHistory();
    const { pathname } = useLocation();

    const getNaviConClass = (pathname, route) => {
        return `${styles.naviLinkCon} ${pathname === route ? styles.highlightNaviCon : styles.notHighlightNaviCon}`;
    };

    const getIconClass = (pathname, route) => {
        return `${styles.navLogo} ${pathname === route ? styles.logoHighlight : styles.logoNotHighlight}`;
    };

    return (
        <div className={styles.navContainer}>
            <div className={styles.headerCon}>
                <AppLogo className={styles.appLogo} />
                <h2 className={styles.navTitle}>Soliton Icons</h2>
            </div>
            <div className={styles.routeLinks}>
                {
                    NAVI_LINKS.map(({ name, route, IconComp }) => {
                        return (
                            <div key={name} className={getNaviConClass(pathname, route)} onClick={() => history.push(route)}>
                                <IconComp className={getIconClass(pathname, route)} />
                                <p className={styles.navLink}>{name}</p>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.messageContainer} onClick={() => history.push(MESSAGE_LINK)}>

            </div>
        </div>
    );
};

export default NavigationMenu;
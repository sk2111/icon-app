//libs
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
//css
import styles from './navigation-menu.module.css';
//static
import AppLogoImg from '../../../assests/webp/applogo.webp';
import OtherResourcesImg from '../../../assests/webp/other-resources.webp';
import { ReactComponent as MessageSvg } from '../../../assests/message.svg';
//constants
import { NAVI_LINKS, MESSAGE_LINK, OTHER_RESOURCES_LINK } from './navigation-menu.utilities';

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
                <img className={styles.appLogo} src={AppLogoImg} alt="" />
                <h2 className={styles.navTitle}>Soliton Icons</h2>
            </div>
            <div className={styles.routeLinks}>
                {
                    NAVI_LINKS.map(({ name, route, IconComp }) => {
                        return (
                            <div key={name} className={getNaviConClass(pathname, route)} onClick={() => history.push(route)}>
                                <IconComp className={getIconClass(pathname, route)} />
                                <label className={styles.navLink}>{name}</label>
                            </div>
                        );
                    })
                }
                <a className={getNaviConClass('otherresources', '')} href={OTHER_RESOURCES_LINK} target="_blank" rel="noopener noreferrer">
                    <img className={styles.navLogo} src={OtherResourcesImg} alt="-" />
                    <label className={styles.navLink}>Other Resources</label>
                </a>
            </div>
            <a className={styles.messageAnchor} href={MESSAGE_LINK} target="_blank" rel="noopener noreferrer">
                <MessageSvg />
            </a>
        </div>
    );
};

export default NavigationMenu;
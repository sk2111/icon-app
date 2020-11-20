//libs
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//css
import styles from './navigation-menu.module.css';
//static
import { ReactComponent as AppLogo } from '../../assests/applogo.svg';
//constants
import { NAVI_LINKS } from './navigation-menu.utilities';

const NavigationMenu = () => {
    const [selectedLink, setSelectedLink] = useState(0);

    const handleSelectedLink = (e) => {
        console.log("I am selected link",e.currentTarget.dataset.index);
        //setSelectedLink(index)
    }
    return (
        <div className={styles.navContainer}>
            <div className={`${styles.headerCon} flex-row-acen`}>
                <AppLogo className={styles.appLogo} />
                <h2 className={styles.navTitle}>Soliton Icons</h2>
            </div>
            <div className={styles.routeLinks}>
                {
                    NAVI_LINKS.map((link, index) => {
                        return (
                            <div key={link.name} data-index={index} data-route={link.route}
                                className={`${styles.naviLinkCon} flex-row-acen`}
                                onClick={handleSelectedLink}>
                                <AppLogo className={styles.navLogo} />
                                <p className={styles.navLink}>{link.name}</p>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default NavigationMenu;
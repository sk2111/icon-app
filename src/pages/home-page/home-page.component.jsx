//libs
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//css
import styles from './home-page.module.css';
//component
import ProtectedRoute from '../../components/protected-route/protected-route.component';
import HomeHeader from '../../components/home-header/home-header.component';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.component';

const HomePage = () => {
    const [navMenuExpanded, setNavMenuExpanded] = useState(true);

    const navigationStyle = navMenuExpanded ? { width: '250px' } : { width: '80px' };

    return (
        <div className={styles.rootContainer}>
            <section style={navigationStyle} className={styles.leftContainer}>
                <NavigationMenu />
            </section>
            <section className={styles.rightContainer}>
                <section className={styles.rightHeader}>
                    <HomeHeader navMenuExpanded={navMenuExpanded} setNavMenuExpanded={setNavMenuExpanded} />
                </section>
                <section className={styles.rightContent}>
                    <Switch>
                        <Route />
                    </Switch>
                </section>
            </section>
        </div>
    );
};

export default ProtectedRoute(HomePage);
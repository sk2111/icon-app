//libs
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
//css
import styles from './home-page.module.css';
//pages
import GeneralIconsPage from '../general-icons-page/general-icons-page.component';
import ProjectIconsPage from '../project-icons-page/project-icons-page.component';
import FavoritesIconsPage from '../favorites-icons-page/favorites-icons-page.component';
import EditIconPage from '../edit-icon-page/edit-icon-page.component';
//component
import ProtectedRoute from '../../components/protected-route/protected-route.component';
import HomeHeader from '../../components/home-header/home-header.component';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.component';
import RouteNotFound from '../../components/route-not-found/route-not-found.component';
//route paths
import { ALL_ICONS, PROJECTS, FAVORITES, EDIT, MESSAGES } from '../../utilities/route.paths';
//constants
import { NAV_MENU_EXPANDED_WIDTH, NAV_MENU_COLLAPSED_WIDTH } from '../../utilities/app.constants';

const HomePage = () => {

    const [navMenuExpanded, setNavMenuExpanded] = useState(true);

    const navigationStyle = navMenuExpanded ? { width: NAV_MENU_EXPANDED_WIDTH } : { width: NAV_MENU_COLLAPSED_WIDTH };

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
                        <Route path={ALL_ICONS} component={GeneralIconsPage} />
                        <Route exact path={PROJECTS} component={ProjectIconsPage} />
                        <Route exact path={FAVORITES} component={FavoritesIconsPage} />
                        <Route exact path={EDIT} component={EditIconPage} />
                        <Route exact path={MESSAGES} render={() => { return <div>I am messages page</div> }} />
                        <Route component={RouteNotFound}></Route>
                    </Switch>
                </section>
            </section>
        </div>
    );
};

export default ProtectedRoute(HomePage);
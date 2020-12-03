//libs
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './home-page.module.css';
//pages
import CommonIconsPage from '../common-icons-page/common-icons-page.component';
import ProjectIconsPage from '../project-icons-page/project-icons-page.component';
import FavoritesIconsPage from '../favorites-icons-page/favorites-icons-page.component';
import EditIconPage from '../edit-icon-page/edit-icon-page.component';
//component
import ProtectedRoute from '../../components/protected-route/protected-route.component';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.component';
import RouteNotFound from '../../components/route-not-found/route-not-found.component';
import Modal from '../../components/modal/modal.component';
//reselect
import { selectIsNavMenuExpanded } from '../../redux/app-data/app-data.selectors';
//route paths
import { COMMON_ROUTE, PROJECTS_ROUTE, FAVORITES_ROUTE, EDIT_ROUTE, MESSAGES_ROUTE } from '../../utilities/route.paths';
//constants
import { NAV_MENU_EXPANDED_WIDTH, NAV_MENU_COLLAPSED_WIDTH } from '../../utilities/app.constants';

const HomePage = ({ isNavMenuExpanded, isCurrentUserAdmin }) => {

    const navigationStyle = isNavMenuExpanded ? { width: NAV_MENU_EXPANDED_WIDTH } : { width: NAV_MENU_COLLAPSED_WIDTH };

    return (
        <div className={styles.rootContainer}>
            <section style={navigationStyle} className={styles.leftContainer}>
                <NavigationMenu />
            </section>
            <section className={styles.rightContainer}>
                <Switch>
                    <Route path={COMMON_ROUTE} render={() => <CommonIconsPage />} />
                    <Route exact path={PROJECTS_ROUTE} component={ProjectIconsPage} />
                    <Route exact path={FAVORITES_ROUTE} component={FavoritesIconsPage} />
                    <Route exact path={EDIT_ROUTE} component={EditIconPage} />
                    <Route exact path={MESSAGES_ROUTE} render={() => { return <div>I am messages page</div> }} />
                    <Route component={RouteNotFound}></Route>
                </Switch>
            </section>
            {isCurrentUserAdmin ?
                <Modal>Sathish</Modal>
                : null
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isNavMenuExpanded: selectIsNavMenuExpanded
});

export default connect(mapStateToProps)(ProtectedRoute(HomePage));
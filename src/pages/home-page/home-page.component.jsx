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
import ProtectedRoute from '../../components/containers/protected-route/protected-route.component';
import NavigationMenu from '../../components/containers/navigation-menu/navigation-menu.component';
import RouteNotFound from '../../components/containers/route-not-found/route-not-found.component';
import Modal from '../../components/reusables/modal/modal.component';
import UploadIcons from '../../components/upload/upload-icons/upload-icons.component';
import EditIconContainer from '../../components/edit-icon/edit-icon-container/edit-icon-container.component';
//reselect
import { selectIsNavMenuExpanded } from '../../redux/app-data/app-data.selectors';
import { selectIsEditIconModalOpen } from '../../redux/edit-icon/edit-icon.selectors';
import { selectIsUploadModalOpen } from '../../redux/upload-icons/upload-icons.selectors';
//route paths
import {
    COMMON_ROUTE_PATH, PROJECTS_ROUTE_PATH, FAVORITES_ROUTE_PATH,
    EDIT_ROUTE_PATH, MESSAGES_ROUTE_PATH
} from '../../utilities/route.paths';

const HomePage = ({ isNavMenuExpanded, isUploadModalOpen, isEditIconModalOpen }) => {

    const navigationStyle = isNavMenuExpanded ? styles.navMenuExpanded : styles.navMenuCollapsed;
    const navigationContainerClass = styles.leftContainer + ' ' + navigationStyle;
    return (
        <div className={styles.rootContainer}>
            <section className={navigationContainerClass}>
                <NavigationMenu />
            </section>
            <section className={styles.rightContainer}>
                <Switch>
                    <Route path={COMMON_ROUTE_PATH} render={() => <CommonIconsPage />} />
                    <Route exact path={PROJECTS_ROUTE_PATH} render={() => <ProjectIconsPage />} />
                    <Route exact path={FAVORITES_ROUTE_PATH} render={() => <FavoritesIconsPage />} />
                    <Route exact path={EDIT_ROUTE_PATH} render={() => <EditIconPage />} />
                    <Route exact path={MESSAGES_ROUTE_PATH} render={() => <div>I am messages page</div>} />
                    <Route component={RouteNotFound} />
                </Switch>
            </section>
            <Modal isModalOpen={isUploadModalOpen}>
                <UploadIcons />
            </Modal>
            <Modal isModalOpen={isEditIconModalOpen}>
                <EditIconContainer />
            </Modal>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isNavMenuExpanded: selectIsNavMenuExpanded,
    isUploadModalOpen: selectIsUploadModalOpen,
    isEditIconModalOpen: selectIsEditIconModalOpen,
});

export default connect(mapStateToProps)(ProtectedRoute(HomePage));
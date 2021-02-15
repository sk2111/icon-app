//libs
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//css
import styles from './project-icons-page.module.css';
//components
import ProjectsDisplay from '../../components/containers/projects-display/projects-display.component';
import ProjectIconsDisplay from '../../components/containers/project-icons-display/project-icons-display.component';
//constants
import { PROJECTS_ROUTE_PATH } from '../../utilities/route.paths';

const ProjectIconsPage = () => {
    return (
        <div className={styles.pageContainer}>
            <Switch>
                <Route exact path={PROJECTS_ROUTE_PATH} render={() => <ProjectsDisplay />}></Route>
                <Route exact path={PROJECTS_ROUTE_PATH + '/:projectId'} render={() => <ProjectIconsDisplay />}></Route>
            </Switch>
        </div>
    );
};
export default (ProjectIconsPage);
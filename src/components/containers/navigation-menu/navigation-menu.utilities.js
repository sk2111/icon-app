import {
    COMMON_ROUTE_PATH, EDIT_ROUTE_PATH, FAVORITES_ROUTE_PATH, MESSAGES_ROUTE_PATH,
    PROJECTS_ROUTE_PATH, OTHER_RESOURCES_ROUTE_PATH
} from '../../../utilities/route.paths';

import { ReactComponent as CommonIconsLogo } from '../../../assests/navigation/common-icons-menu.svg';
import { ReactComponent as ProjectsLogo } from '../../../assests/navigation/projects-menu.svg';
import { ReactComponent as FavoritesLogo } from '../../../assests/navigation/favorites-menu.svg';
import { ReactComponent as EditLogo } from '../../../assests/navigation/edit-menu.svg';

export const NAVI_LINKS = [
    { name: 'Common', route: COMMON_ROUTE_PATH, IconComp: CommonIconsLogo },
    { name: 'Projects', route: PROJECTS_ROUTE_PATH, IconComp: ProjectsLogo },
    { name: 'Favorites', route: FAVORITES_ROUTE_PATH, IconComp: FavoritesLogo },
    { name: 'Edit', route: EDIT_ROUTE_PATH, IconComp: EditLogo },
];

export const MESSAGE_LINK = MESSAGES_ROUTE_PATH;

export const OTHER_RESOURCES_LINK = OTHER_RESOURCES_ROUTE_PATH;
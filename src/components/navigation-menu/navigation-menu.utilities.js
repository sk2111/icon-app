import { COMMON_ROUTE, EDIT_ROUTE, FAVORITES_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE } from '../../utilities/route.paths';

import { ReactComponent as CommonIconsLogo } from '../../assests/navigation/common-icons-menu.svg';
import { ReactComponent as ProjectsLogo } from '../../assests/navigation/projects-menu.svg';
import { ReactComponent as FavoritesLogo } from '../../assests/navigation/favorites-menu.svg';
import { ReactComponent as EditLogo } from '../../assests/navigation/edit-menu.svg';

export const NAVI_LINKS = [
    { name: 'Common', route: COMMON_ROUTE, IconComp: CommonIconsLogo },
    { name: 'Projects', route: PROJECTS_ROUTE, IconComp: ProjectsLogo },
    { name: 'Favorites', route: FAVORITES_ROUTE, IconComp: FavoritesLogo },
    { name: 'Edit', route: EDIT_ROUTE, IconComp: EditLogo },
];

export const MESSAGE_LINK = MESSAGES_ROUTE;
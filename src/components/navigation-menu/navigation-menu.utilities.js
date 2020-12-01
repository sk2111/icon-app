import { COMMON_ICONS, PROJECTS, FAVORITES, EDIT, MESSAGES } from '../../utilities/route.paths';

import { ReactComponent as CommonIconsLogo } from '../../assests/navigation/common-icons-menu.svg';
import { ReactComponent as ProjectsLogo } from '../../assests/navigation/projects-menu.svg';
import { ReactComponent as FavoritesLogo } from '../../assests/navigation/favorites-menu.svg';
import { ReactComponent as EditLogo } from '../../assests/navigation/edit-menu.svg';

export const NAVI_LINKS = [
    { name: 'Common', route: COMMON_ICONS, IconComp: CommonIconsLogo },
    { name: 'Projects', route: PROJECTS, IconComp: ProjectsLogo },
    { name: 'Favorites', route: FAVORITES, IconComp: FavoritesLogo },
    { name: 'Edit', route: EDIT, IconComp: EditLogo },
];

export const MESSAGE_LINK = MESSAGES;
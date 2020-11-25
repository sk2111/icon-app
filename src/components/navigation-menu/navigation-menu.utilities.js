import { ALL_ICONS, PROJECTS, FAVORITES, EDIT, MESSAGES } from '../../utilities/route.paths';

import { ReactComponent as AllIconsLogo } from '../../assests/navigation/all-icons-menu.svg';
import { ReactComponent as ProjectsLogo } from '../../assests/navigation/projects-menu.svg';
import { ReactComponent as FavouritesLogo } from '../../assests/navigation/favourites-menu.svg';
import { ReactComponent as EditLogo } from '../../assests/navigation/edit-menu.svg';

export const NAVI_LINKS = [
    { name: 'All Icons', route: ALL_ICONS, IconComp: AllIconsLogo },
    { name: 'Projects', route: PROJECTS, IconComp: ProjectsLogo },
    { name: 'Favorites', route: FAVORITES, IconComp: FavouritesLogo },
    { name: 'Edit', route: EDIT, IconComp: EditLogo },
];

export const MESSAGE_LINK = MESSAGES;
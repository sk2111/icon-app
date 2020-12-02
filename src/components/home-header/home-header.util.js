import { COMMON_ROUTE, PROJECTS_ROUTE, FAVORITES_ROUTE, EDIT_ROUTE } from '../../utilities/route.paths';
//contants
export const ROUTE_MATCH_LIST = [COMMON_ROUTE, PROJECTS_ROUTE, FAVORITES_ROUTE, EDIT_ROUTE];

export const KEYWORDS = 'keywords';

export const SELECT_OPTIONS = 'selectoptions';

export const PLACEHOLDERMAP = {
    [COMMON_ROUTE]: 'Search for common icons',
    [PROJECTS_ROUTE]: 'Search your project icons',
    [FAVORITES_ROUTE]: 'Search your favorites icons',
    [EDIT_ROUTE]: '',
};

export const LABELTEXTMAP = {
    [COMMON_ROUTE]: 'Categories',
    [PROJECTS_ROUTE]: 'Projects',
    [FAVORITES_ROUTE]: '',
    [EDIT_ROUTE]: '',
};
//helpers

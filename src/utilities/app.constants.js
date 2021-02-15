//auth setimeouts
export const LOADING_ANIM_LOGO_TIME = 500; // 0.5 second
export const SIGNOUT_ANIMATION_LOADING_TIME = 750; // 0.75 second
export const LOADING_PERSISTANT_CHECK_TIME = 500; // 0.5 sec

//placeholder text to show in home header inputs
export const COMMON_ICONS_INPUT_PLACEHOLDER = 'Search for common icons';
export const PROJECT_ICONS_INPUT_PROJECTS_PLACEHOLDER = 'Search for your project';
export const PROJECT_ICONS_INPUT_ICONS_PLACEHOLDER = 'Search for your project icons';
export const FAVORITES_ICONS_INPUT_PLACEHOLDER = 'Search for your favorites icons';
//select label text
export const COMMON_ICONS_SELECT_LABEL = 'Categories';
export const COMMON_ICONS_UPLOAD_INP_LABEL = 'Category';
export const PROJECT_ICONS_SELECT_LABEL = 'Projects';
export const PROJECT_ICONS_UPLOAD_INP_LABEL = 'Project';

//default select value for common icons in display UI
export const DEFAULT_CLASSIFICATION_VALUE_FOR_UPLOADED_ICONS = 'All';
export const COMMON_ICON_DEFAULT_CATEGORY_VALUE = 'All';
export const PROJECT_ICON_DEFAULT_PROJECT_VALUE = 'All';
export const UPLOAD_ICONS_DEFAULT_CLASSIFICATION = 'Not Selected';

// Page Names to display in Icon view header
export const COMMON_ICONS_HEADER_LABEL = "Common Icons";
export const PROJECT_DISPLAY_HEADER_LABEL = "Projects";
export const PROJECT_ICONS_HEADER_LABEL = "Project Icons";
export const FAVORITES_ICONS_HEADER_LABEL = "Favorites Icons";
export const EDIT_ICON_HEADER_LABEL = "Edit Icon";
//User profile prop constants
export const USER_PROFILE = {
    USER_FIRST_NAME: 'firstName',
    USER_LAST_NAME: 'lastName',
    USER_EMAIL: 'email',
    USER_CREATED_AT: 'createdAt',
    USER_FAVORITES: 'favoriteIconsDocId',
    USER_ADMIN: 'isAdmin',
    USER_FAVORITES_FETCH_STATUS: 'isFavoriteIconsAvailableToFetch'
};
//Favorites Prop constants
export const FAVORITES_PROP = {
    FAVORITES_IS_FETCHED: 'isFetched',
    FAVORITES_ID: 'id',
    FAVORITES_PATH: 'fetchPath'
};
// upload label map
export const UPLOAD_FORM_LABEL = {
    [COMMON_ICONS_HEADER_LABEL]: COMMON_ICONS_UPLOAD_INP_LABEL,
    [PROJECT_ICONS_HEADER_LABEL]: PROJECT_ICONS_UPLOAD_INP_LABEL
};
//upload success toast message
export const UPLOAD_SUCCESS_MESSAGE = 'Successfully uploaded icons';
//saga message constants
export const SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE = 'Failed to fetch user options for common or project icons';
export const SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE = 'Upload failed...Invalid Icon classification found';

//FIle upload Max limi
export const MAXIMUM_NUMBER_OF_FILES_FOR_UPLOAD = 150;
// Icon read maixmium limit at a time
export const MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD = 15;
export const USER_FAVORITES_FETCH_LIMIT = 10;
export const NUMBER_OF_LAZY_LOAD_ICONS_TO_DISPLAY = 15;
export const FETCHING_ICONS_THROTTLE_TIME = 500; //0.5sec
//Upload Modal view constants
export const MODAL_IN_UPLOAD_VIEW = 'MODAL_IN_UPLOAD_VIEW';
export const MODAL_IN_CONFIGURE_VIEW = 'MODAL_IN_CONFIGURE_VIEW';
//upload Icon property constants
export const ICON_PROP = {
    ICON_ID: 'id',
    ICON_NAME: 'iconName',
    ICON_CLASSIFICATION: 'iconClassification',
    ICON_TAGS: 'iconTags',
    CREATED_AT: 'createdAt',
    ICON_BASE_64: 'iconBase64',
    ICON_DATA: 'iconData',
    ICON_FAVORITE: 'isIconFavorite'
};

// user display Icon card messages
export const ICON_STY_LENGTH_LIMIT = 12;
export const NO_MORE_ICONS_MESSAGE = 'You have reached the end';


// edit icon button Image labels
export const PNG_FORMAT = { label: 'PNG', value: 'png' };
export const BMP_FORMAT = { label: 'BMP', value: 'bmp' };
export const SVG_FORMAT = { label: 'SVG', value: 'svg' };
export const JPEG_FORMAT = { label: 'JPEG', value: 'jpeg' };
export const WEBP_FORMAT = { label: 'WEBP', value: 'webp' };
export const DEFAULT_DOWNLOAD_FORMAT = SVG_FORMAT.value;
export const EDIT_ICON_BUTTONS = [PNG_FORMAT, BMP_FORMAT, SVG_FORMAT, JPEG_FORMAT, WEBP_FORMAT];
export const RECOMMENDATION_INFO = {
    [PNG_FORMAT.value]: ['Presentations', 'Labview Applications'],
    [BMP_FORMAT.value]: ['Printing'],
    [SVG_FORMAT.value]: ['Web Design'],
    [JPEG_FORMAT.value]: ['Lossy Quality'],
    [WEBP_FORMAT.value]: ['Alternate to Png'],
};
//edit icon download size
export const DEFAULT_DOWNLOAD_SIZE_BUTTONS = [
    { label: '16px', value: '16' }, { label: '25px', value: '25' }, { label: '30px', value: '30' },
    { label: '40px', value: '40' }, { label: '64px', value: '64' }, { label: '128px', value: '128' },
    { label: '256px', value: '256' }, { label: '512px', value: '512' }
];
export const DEFAULT_DOWNLOAD_SIZE = DEFAULT_DOWNLOAD_SIZE_BUTTONS[2].value;
export const DEFAULT_BLACK_COLOR = '#000';
//debounce time 
export const EDIT_ICON_INPUT_DEBOUNCE_TIME = 500; // 0.5ms
export const EDIT_ICON_APPLY_COLOR_DEBOUNCE_TIME = 150; // 0.15ms
//COLOR PCIKER OVERRIDE STYLE
export const PICKER_STYLE = {
    picker: {
        boxShadow: 'none',
        width: '235px'
    }
};
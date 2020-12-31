//libs
import { takeLatest, put, call, all, select, throttle } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore, getDocListByPagination, deleteDocById } from '../../firebase/firebase.utils';
import { PROJECT_ICONS_USER_OPTIONS_DATA_PATH, PROJECT_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//action types
import { projectIconsActionTypes } from './project-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchProjectIconsUserOptionsStart, fetchProjectIconsUserOptionsSuccess, fetchProjectIconsUserOptionsFailure,
    fetchProjectIconsFromDatabaseFailure, fetchProjectIconsFromDatabaseSuccess, setProjectIconsPaginationMap,
    deleteProjectIconFromDbSuccess, deleteProjectIconFromDbFailure
} from './project-icons.actions';
//selectors
import { selectProjectIcons } from './project-icons.selectors';
//constants
import {
    SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE, ICON_PROP, PROJECT_ICON_DEFAULT_PROJECT_VALUE,
    MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD, FETCHING_ICONS_THROTTLE_TIME, PROJECT_ICONS_HEADER_LABEL
} from '../../utilities/app.constants';
//helpers
import { getPaginateConfig, frameIconObjFromDocObj, getSpaceCombinationValue } from '../../utilities/helper.functions';

//destructure ICON PROP
const { CREATED_AT, ICON_CLASSIFICATION, ICON_TAGS } = ICON_PROP;

// Fetch config query param frame
const frameQueryParams = (selectValue, searchValue, existingPaginationMap) => {
    const searchCombination = getSpaceCombinationValue(searchValue);
    const isDefaultClassification = selectValue === PROJECT_ICON_DEFAULT_PROJECT_VALUE
    const queryOperator = isDefaultClassification ? '!=' : '==';
    const queryOrderByConfig = isDefaultClassification ? [ICON_CLASSIFICATION] : [CREATED_AT, "desc"];
    return {
        collectionPath: PROJECT_ICONS_LIST_PATH,
        classificationConfig: [ICON_CLASSIFICATION, queryOperator, selectValue],
        searchKeywordConfig: [ICON_TAGS, 'array-contains-any', searchCombination],
        orderConfig: [...queryOrderByConfig],
        listLimit: MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD,
        previousQueryEndDoc: existingPaginationMap ? existingPaginationMap.lastQueryEndRef : null
    }
};

// get project icons from database 
function* fetchProjectIconsFromDatabase() {
    try {
        const { paginationMap, searchValue, selectValue } = yield select(selectProjectIcons);
        const { paginateKey, existingPaginationMap, isMoreIconsAvailableToFetch } = yield call(getPaginateConfig, selectValue, searchValue, paginationMap);
        if (existingPaginationMap && !isMoreIconsAvailableToFetch) {
            console.log("All Icons fetched in this project");
            return;
        }
        else {
            const { docList, isMoreDocsAvailable, newEndDocRef } = yield call(getDocListByPagination,
                frameQueryParams(selectValue, searchValue, existingPaginationMap));
            const iconsMap = yield call(frameIconObjFromDocObj, docList);
            yield put(fetchProjectIconsFromDatabaseSuccess(iconsMap));
            yield put(setProjectIconsPaginationMap({
                key: paginateKey,
                isMoreIconsAvailableToFetch: isMoreDocsAvailable,
                lastQueryEndRef: newEndDocRef
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(fetchProjectIconsFromDatabaseFailure(e?.message));
    }

};

function* onFetchProjectIconsFromDatabase() {
    yield throttle(FETCHING_ICONS_THROTTLE_TIME, projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_START, fetchProjectIconsFromDatabase);
};

// delete particular icon from db
function* deleteCommonIconFromDB({ payload: iconId }) {
    try {
        yield call(deleteDocById, PROJECT_ICONS_LIST_PATH, iconId);
        yield put(deleteProjectIconFromDbSuccess(iconId));
    }
    catch (e) {
        console.log(e);
        yield put(deleteProjectIconFromDbFailure(e?.message));
    }
}

function* onDeleteProjectIconFromDB() {
    yield takeLatest(projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_START, deleteCommonIconFromDB);
}

//Get project icons search keyword and category options
function* fetchKeywordAndSelectOptions() {
    const userOptions = yield call(getDocDataFromFireStore, PROJECT_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        const { searchKeywordsList, selectOptionsList } = userOptions;
        yield put(fetchProjectIconsUserOptionsSuccess({
            searchKeywordsList: searchKeywordsList.sort(),
            selectOptionsList: selectOptionsList.sort()
        }));
        return;
    }
    console.error("Failed to fetch user options - empty data received");
    yield put(fetchProjectIconsUserOptionsFailure({ message: SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE }));

};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest(projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_START, fetchKeywordAndSelectOptions);
};

// on user auth completion success trigger fetch actions for project icons
export function* fetchUserOptions() {
    yield put(fetchProjectIconsUserOptionsStart());
};

export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, fetchUserOptions);
};
// trigger observer for options fetch
export function* triggerUserOptionsFetchAction({ payload }) {
    if (payload === PROJECT_ICONS_HEADER_LABEL) {
        yield put(fetchProjectIconsUserOptionsStart());
    }
};

export function* onTriggerUserOptionsFetch() {
    yield takeLatest(uploadIconsActionTypes.CLOSE_ADD_NEW_CLASSIFICATION_MODAL, triggerUserOptionsFetchAction);
};

//Group all sagas
export function* projectIconsSaga() {
    yield all([
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess),
        call(onFetchProjectIconsFromDatabase),
        call(onDeleteProjectIconFromDB),
        call(onTriggerUserOptionsFetch),
    ]);
};
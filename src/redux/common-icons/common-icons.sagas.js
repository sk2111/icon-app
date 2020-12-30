//libs
import { takeLatest, put, call, all, select, throttle } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore, getDocListByPagination } from '../../firebase/firebase.utils';
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH, COMMON_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchCommonIconsUserOptionsStart, fetchCommonIconsUserOptionsSuccess, fetchCommonIconsUserOptionsFailure,
    fetchCommonIconsFromDatabaseFailure, fetchCommonIconsFromDatabaseSuccess, setCommonIconsPaginationMap
} from './common-icons.actions';
//selectors
import { selectCommonIcons } from './common-icons.selectors';
//constants
import {
    SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE, ICON_PROP, COMMON_ICON_DEFAULT_CATEGORY_VALUE,
    MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD, FETCHING_ICONS_THROTTLE_TIME
} from '../../utilities/app.constants';
//helpers
import { getPaginateConfig, frameIconObjFromDocObj, getSpaceCombinationValue } from '../../utilities/helper.functions';

//destructure ICON PROP
const { CREATED_AT, ICON_CLASSIFICATION, ICON_TAGS } = ICON_PROP;

// Fetch config query param frame
const frameQueryParams = (selectValue, searchValue, existingPaginationMap) => {
    const searchCombination = getSpaceCombinationValue(searchValue);
    const isDefaultClassification = selectValue === COMMON_ICON_DEFAULT_CATEGORY_VALUE
    const queryOperator = isDefaultClassification ? '!=' : '==';
    const queryOrderByConfig = isDefaultClassification ? [ICON_CLASSIFICATION] : [CREATED_AT, "desc"];
    return {
        collectionPath: COMMON_ICONS_LIST_PATH,
        classificationConfig: [ICON_CLASSIFICATION, queryOperator, selectValue],
        searchKeywordConfig: [ICON_TAGS, 'array-contains-any', searchCombination],
        orderConfig: [...queryOrderByConfig],
        listLimit: MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD,
        previousQueryEndDoc: existingPaginationMap ? existingPaginationMap.lastQueryEndRef : null
    }
};
// get common icons from database 
function* fetchCommonIconsFromDatabase() {
    try {
        const { paginationMap, searchValue, selectValue } = yield select(selectCommonIcons);
        const { paginateKey, existingPaginationMap, isMoreIconsAvailableToFetch } = yield call(getPaginateConfig, selectValue, searchValue, paginationMap);
        if (existingPaginationMap && !isMoreIconsAvailableToFetch) {
            console.log("All Icons fetched in this category");
            return;
        }
        else {
            const { docList, isMoreDocsAvailable, newEndDocRef } = yield call(getDocListByPagination,
                frameQueryParams(selectValue, searchValue, existingPaginationMap));
            const iconsMap = yield call(frameIconObjFromDocObj, docList);
            yield put(fetchCommonIconsFromDatabaseSuccess(iconsMap));
            yield put(setCommonIconsPaginationMap({
                key: paginateKey,
                isMoreIconsAvailableToFetch: isMoreDocsAvailable,
                lastQueryEndRef: newEndDocRef
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(fetchCommonIconsFromDatabaseFailure(e?.message));
    }

};

function* onFetchCommonIconsFromDatabase() {
    yield throttle(FETCHING_ICONS_THROTTLE_TIME, commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_START, fetchCommonIconsFromDatabase);
};

//Get common icons search keyword and category options to select saga
function* fetchKeywordAndSelectOptions() {
    const userOptions = yield call(getDocDataFromFireStore, COMMON_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        const { searchKeywordsList, selectOptionsList } = userOptions;
        yield put(fetchCommonIconsUserOptionsSuccess({
            searchKeywordsList: searchKeywordsList.sort(),
            selectOptionsList: selectOptionsList.sort()
        }));
        return;
    }
    console.error("Failed to fetch user options - empty data received");
    yield put(fetchCommonIconsUserOptionsFailure({ message: SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE }));

};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest(commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START, fetchKeywordAndSelectOptions);
};


// common generator for fetch triggering options
export function* triggerUserOptionsFetchActions() {
    yield put(fetchCommonIconsUserOptionsStart());
};
// on user auth completion success trigger fetch actions for common icons
export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, triggerUserOptionsFetchActions);
};
// trigger observer for options fetch
export function* onTriggerUserOptionsFetch() {
    yield takeLatest(uploadIconsActionTypes.CLOSE_ADD_NEW_CLASSIFICATION_MODAL, triggerUserOptionsFetchActions);
};


//Group all sagas
export function* commonIconsSaga() {
    yield all([
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess),
        call(onFetchCommonIconsFromDatabase),
        call(onTriggerUserOptionsFetch),
    ]);
};
//libs
import { takeLatest, put, call, all } from 'redux-saga/effects';
//action types
import { generalIconsActionsTypes } from './general-icons.type';
import { userActionTypes } from '../user/user.type';



//Get general icons search keyowrd and category saga
function* getSearchKeywordAndCategoryList() {
    yield console.log(" I am the caller of saga testing")
};
function* onGetSearchKeywordAndCategoryList() {
    yield takeLatest(generalIconsActionsTypes.FETCH_SEARCH_KEYWORD_AND_CATEGORY_LIST_SUCCESS, getSearchKeywordAndCategoryList);
};

// on user auth completion success trigger fetch actions for general icons
export function* triggerInitialDataFetchActions() {
    yield console.log("Hai i am triggering initial fetch actions");
};
export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, triggerInitialDataFetchActions);
};
//Group all sagas
export function* generalIconsSaga() {
    yield all([
        call(onGetSearchKeywordAndCategoryList),
        call(onCurrentUserInfoFetchSuccess)
    ]);
};
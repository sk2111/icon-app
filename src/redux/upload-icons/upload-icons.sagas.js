//libs
import {
    takeLatest, all, call, put, select
} from 'redux-saga/effects';
//actions
import { fetchCommonIconsUserOptionsStart } from '../common-icons/common-icons.actions';
import { fetchProjectIconsUserOptionsStart } from '../project-icons/project-icons.actions';
import { showSuccessToastMessage } from '../toast-message/toast-message.actions';
import { uploadIconsSuccess, uploadIconsFailure, readyToUploadIcons, addNewClassficationSuccess, addNewClassficationFailed } from '../upload-icons/upload-icons.actions';
//action type
import { uploadIconsActionTypes } from './upload-icons.type';
//selectors
import { selectUploadIcons } from './upload-icons.selectors';
//firebase 
import {
    COMMON_ICONS_USER_OPTIONS_DATA_PATH, CLASSIFICATION_SEARCH_KEYWORD_LIST, COMMON_ICONS_LIST_PATH,
    PROJECT_ICONS_USER_OPTIONS_DATA_PATH, PROJECT_ICONS_LIST_PATH, CLASSIFICATION_PROJECTS_LIST,
    CLASSIFICATION_SELECT_OPTIONS_LIST
} from '../../firebase/firebase.constants';
import { CreateNewClassfication, updateDocPropInFirestore, performUploadIconsInBatchedMode } from '../../firebase/firebase.utils';
//constants
import {
    COMMON_ICONS_HEADER_LABEL, PROJECT_ICONS_HEADER_LABEL, SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE,
    UPLOAD_SUCCESS_MESSAGE
} from '../../utilities/app.constants';
//helpers
import { capitalizeFirstLetter, prepareIconDataForUpload, } from '../../utilities/helper.functions';


//create new category or classfication in firebase
function* addNewClassficationInFirebase({ payload: { classification, uploadIconDBPath } }) {
    try {
        const capitalizedValue = yield call(capitalizeFirstLetter, classification);
        if ((uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) && capitalizedValue) {
            yield call(CreateNewClassfication, {
                classification: capitalizedValue.trim(),
                dbDocPath: COMMON_ICONS_USER_OPTIONS_DATA_PATH,
                property: CLASSIFICATION_SELECT_OPTIONS_LIST
            });

        }
        if ((uploadIconDBPath === PROJECT_ICONS_HEADER_LABEL) && capitalizedValue) {
            yield call(CreateNewClassfication, {
                classification: capitalizedValue.trim(),
                dbDocPath: PROJECT_ICONS_USER_OPTIONS_DATA_PATH,
                property: CLASSIFICATION_PROJECTS_LIST
            });
        }
        yield put(addNewClassficationSuccess());
    }
    catch (e) {
        yield put(addNewClassficationFailed(e?.message));
    }
};

function* addNewClassfication() {
    yield takeLatest(uploadIconsActionTypes.ADD_NEW_CLASSIFICATION_START, addNewClassficationInFirebase);
};

//upload icons to db
function* uploadIconsToDb({ payload: { keywordPath, keywordProp, keywordValue, uploadList, uploadPath, successAction } }) {
    try {
        yield call(updateDocPropInFirestore, keywordPath, { property: keywordProp, value: keywordValue });
        const isUploadSuccess = yield call(performUploadIconsInBatchedMode, uploadPath, uploadList);
        if (isUploadSuccess) {
            yield put(uploadIconsSuccess());
            yield put(successAction());
            yield put(showSuccessToastMessage({ message: UPLOAD_SUCCESS_MESSAGE }));
        }
    }
    catch (e) {
        console.log("Upload failed", e);
        uploadIconsFailure(e?.message);
    }
}
function* uploadIcons() {
    yield takeLatest(uploadIconsActionTypes.UPLOADING_ICONS_TO_DB, uploadIconsToDb);
};

//upload icons valid check
function* uploadIconsValidCheck() {
    try {
        const { uploadedIcons, uploadIconDBPath, commonRootTags } = yield select(selectUploadIcons);
        if (uploadedIcons) {
            const { isNotAllowed, iconsListToUpload, allTagValues } = yield call(prepareIconDataForUpload, uploadedIcons, commonRootTags);
            if (isNotAllowed) {
                throw new Error(SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE);
            }
            if (uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) {
                yield put(readyToUploadIcons({
                    keywordPath: COMMON_ICONS_USER_OPTIONS_DATA_PATH,
                    keywordProp: CLASSIFICATION_SEARCH_KEYWORD_LIST,
                    keywordValue: allTagValues,
                    uploadPath: COMMON_ICONS_LIST_PATH,
                    uploadList: iconsListToUpload,
                    successAction: fetchCommonIconsUserOptionsStart
                }));
            }
            if (uploadIconDBPath === PROJECT_ICONS_HEADER_LABEL) {
                yield put(readyToUploadIcons({
                    keywordPath: PROJECT_ICONS_USER_OPTIONS_DATA_PATH,
                    keywordProp: CLASSIFICATION_SEARCH_KEYWORD_LIST,
                    keywordValue: allTagValues,
                    uploadPath: PROJECT_ICONS_LIST_PATH,
                    uploadList: iconsListToUpload,
                    successAction: fetchProjectIconsUserOptionsStart
                }));
            }
        }
    }
    catch (e) {
        console.log(e);
        yield put(uploadIconsFailure(e?.message));
    }

};

function* uploadIconsStart() {
    yield takeLatest(uploadIconsActionTypes.UPLOAD_ICONS_START, uploadIconsValidCheck);
};

//Group all sagas
export function* uploadIconsSaga() {
    yield all([
        call(addNewClassfication),
        call(uploadIconsStart),
        call(uploadIcons),
    ]);
};



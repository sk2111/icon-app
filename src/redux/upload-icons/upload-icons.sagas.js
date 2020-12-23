//libs
import {
    takeLatest, all, call, put, select
} from 'redux-saga/effects';
//actions
import { fetchCommonIconsUserOptionsStart } from '../common-icons/common-icons.actions';
import { uploadIconsSuccess, uploadIconsFailure, readyToUploadIcons } from '../upload-icons/upload-icons.actions';
//action type
import { uploadIconsActionTypes } from './upload-icons.type';
//firebase 
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH, CLASSIFICATION_SEARCH_KEYWORD_LIST, COMMON_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
import { CreateNewClassfication, updateDocPropInFirestore, performUploadIconsInBatchedMode } from '../../firebase/firebase.utils';
//constants
import {
    COMMON_ICONS_HEADER_LABEL,
    SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE
} from '../../utilities/app.constants';
//helpers
import {
    capitalizeFirstLetter, prepareIconDataForUpload,
} from '../../utilities/helper.functions';


//create new category or classfication in firebase
function* addNewClassficationInFirebase({ payload: { classification, uploadIconDBPath } }) {
    const capitalizedValue = yield call(capitalizeFirstLetter, classification);
    if ((uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) && capitalizedValue) {
        const isSuccess = yield call(CreateNewClassfication, { classification: capitalizedValue, dbDocPath: COMMON_ICONS_USER_OPTIONS_DATA_PATH });
        if (isSuccess) {
            yield put(fetchCommonIconsUserOptionsStart());
            return;
        }
    }
};

function* addNewClassfication() {
    yield takeLatest(uploadIconsActionTypes.ADD_NEW_CLASSIFICATION, addNewClassficationInFirebase);
};

//upload icons to db
function* uploadIconsToDb({ payload: { keywordPath, keywordProp, keywordValue, uploadList, uploadPath, successAction } }) {
    try {
        yield call(updateDocPropInFirestore, keywordPath, { property: keywordProp, value: keywordValue });
        const isUploadSuccess = yield call(performUploadIconsInBatchedMode, uploadPath, uploadList);
        if (isUploadSuccess) {
            yield put(uploadIconsSuccess());
            yield put(successAction());
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
        const { uploadedIcons, uploadIconDBPath, commonRootTags } = yield select((state) => state.uploadIcons);
        if (uploadedIcons) {
            const { isNotAllowed, iconsWithAppendedTagsList, allTagValues } = yield call(prepareIconDataForUpload, uploadedIcons, commonRootTags);
            if (isNotAllowed) {
                throw new Error(SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE);
            }
            if (uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) {
                yield put(readyToUploadIcons({
                    keywordPath: COMMON_ICONS_USER_OPTIONS_DATA_PATH,
                    keywordProp: CLASSIFICATION_SEARCH_KEYWORD_LIST,
                    keywordValue: allTagValues,
                    uploadPath: COMMON_ICONS_LIST_PATH,
                    uploadList: iconsWithAppendedTagsList,
                    successAction: fetchCommonIconsUserOptionsStart
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



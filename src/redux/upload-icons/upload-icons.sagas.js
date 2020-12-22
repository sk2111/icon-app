//libs
import {
    takeLatest, all, call, put, select
} from 'redux-saga/effects';
//actions
import { fetchCommonIconsUserOptionsStart } from '../common-icons/common-icons.actions';
import { uploadIconsFailure } from '../upload-icons/upload-icons.actions';
//action type
import { uploadIconsActionTypes } from './upload-icons.type';
//firebase 
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH, CLASSIFICATION_SEARCH_KEYWORD_LIST } from '../../firebase/firebase.constants';
import { CreateNewClassfication, updateDocPropInFirestore } from '../../firebase/firebase.utils';
//constants
import {
    COMMON_ICONS_HEADER_LABEL,
    SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE, ICON_PROP
} from '../../utilities/app.constants';
//helpers
import {
    capitalizeFirstLetter, extractNeededPropsForUpload, isIconsAllowedToUpload,
    appendCommonTagsAndIconName, getAllTagValuesFromIcons
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


//upload icons to firestore db
function* uploadIconsToDb() {
    try {
        const uploadIcons = yield select((state) => state.uploadIcons);
        const uploadedIcons = uploadIcons.uploadedIcons;
        const commonRootTags = [...uploadIcons.commonRootTags];
        const uploadIconDBPath = uploadIcons.uploadIconDBPath;
        if (uploadedIcons) {
            const clonedIconsList = yield call(extractNeededPropsForUpload, Object.values(uploadedIcons));
            console.log("the cloned list", clonedIconsList);
            //check whether all icons have classification than Not selected
            const isNotAllowed = yield call(isIconsAllowedToUpload, clonedIconsList);
            if (isNotAllowed) {
                throw new Error(SAGA_UPLOAD_ICONS_INVALID_CLASSIFICATION_ERROR_MESSAGE);
            }
            //Append common tags to all icons and icon name as one of the tag to all icons
            const iconsWithAppendedTagsList = yield call(appendCommonTagsAndIconName, clonedIconsList, commonRootTags);
            // append tags values to search keyword options in firestore
            const allTagValues = yield call(getAllTagValuesFromIcons, iconsWithAppendedTagsList);
            if (uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) {
                yield call(
                    updateDocPropInFirestore,
                    COMMON_ICONS_USER_OPTIONS_DATA_PATH, { property: CLASSIFICATION_SEARCH_KEYWORD_LIST, value: allTagValues }
                );
                yield put(fetchCommonIconsUserOptionsStart());
            }

            //uplaod to firestire

        }
    }
    catch (e) {
        console.log(e);
        yield put(uploadIconsFailure(e?.message));
    }

};

function* uploadIcons() {
    yield takeLatest(uploadIconsActionTypes.UPLOAD_ICONS_START, uploadIconsToDb);
};
//Group all sagas
export function* uploadIconsSaga() {
    yield all([
        call(addNewClassfication),
        call(uploadIcons),
    ]);
};



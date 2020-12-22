//libs
import {
    takeLatest, all, call, put, select
} from 'redux-saga/effects';
//actions
import { fetchCommonIconsUserOptionsStart } from '../common-icons/common-icons.actions';
//action type
import { uploadIconsActionTypes } from './upload-icons.type';
//firebase 
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH } from '../../firebase/firebase.constants';
import { CreateNewClassfication } from '../../firebase/firebase.utils';
//constants
import { COMMON_ICONS_HEADER_LABEL } from '../../utilities/app.constants';
//helpers
import { capitalizeFirstLetter } from '../../utilities/helper.functions';


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
        if (uploadedIcons) {
            console.log(uploadedIcons);
            const uploadIconsList = Object.values(uploadedIcons);
            console.log(uploadIconsList);
            //step 1 : check whether all icons have classification than Not selected

            // step 2 : Append common tags to all icons and icon name as one of the tag to all icos

            // step 3 : check the path to upload to db

            // append tags values to search keyword options in firestore

            //uplaod to firestire

        }
    }
    catch (e) {

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



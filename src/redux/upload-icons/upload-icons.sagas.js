//libs
import {
    takeLatest, all, call, put
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
function* uploadIconsToDb({ payload }) {
    yield console.log("Testing Icons upload stsrt", payload);
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



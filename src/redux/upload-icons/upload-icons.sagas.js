//libs
import { takeLatest, all, call } from 'redux-saga/effects';
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
    if (uploadIconDBPath === COMMON_ICONS_HEADER_LABEL) {
        const capitalizedValue = yield call(capitalizeFirstLetter, classification);
        const isSuccess = yield call(CreateNewClassfication, { classification: capitalizedValue, dbDocPath: COMMON_ICONS_USER_OPTIONS_DATA_PATH });
        if (isSuccess) {
            // call actions to fetch optiosn from firestore
            return;
        }
        //perform failed condition
    }
};

function* addNewClassfication() {
    yield takeLatest(uploadIconsActionTypes.ADD_NEW_CLASSIFICATION, addNewClassficationInFirebase);
};

//Group all sagas
export function* uploadIconsSaga() {
    yield all([
        call(addNewClassfication),
    ]);
};



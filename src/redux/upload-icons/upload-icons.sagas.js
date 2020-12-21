//libs
import { takeLatest, all, call } from 'redux-saga/effects';

//action type
import { uploadIconsActionTypes } from './upload-icons.type';




//create new category or classfication in firebase
function* addNewClassficationInFirebase() {
    yield console.log("I am Tester runner saga check");
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



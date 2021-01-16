import { all, call, select, takeLatest } from "redux-saga/effects";
//action types
import { editIconActionTypes } from './edit-icon.type';
//selectors
import { selectEditIcon } from './edit-icon.selectors';










// download user icons
function* downloadIcon({ payload: { svgNode } }) {
    const { iconDownloadFormat, downloadSize } = yield select(selectEditIcon);
    yield console.log("Testing wireup ", svgNode, iconDownloadFormat, downloadSize);
};

function* onDownloadIconStart() {
    yield takeLatest(editIconActionTypes.ICON_DOWNLOAD_START, downloadIcon);
};


//export all sagas
export function* editIconSagas() {
    yield all([
        call(onDownloadIconStart)
    ]);
}
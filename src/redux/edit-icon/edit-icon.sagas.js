//libs
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import FileSaver from 'file-saver';
//action types
import { editIconActionTypes } from './edit-icon.type';
//actions
import { iconDownloadSuccess, iconDownloadFailure } from './edit-icon.actions';
//selectors
import { selectEditIcon } from './edit-icon.selectors';
//constants
import { SVG_FORMAT } from '../../utilities/app.constants';










// download user icons

function downloadSvg(svgNode, height, width, iconName) {
    svgNode.setAttribute("height", `${height}px`);
    svgNode.setAttribute("width", `${width}px`);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgNode);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    FileSaver.saveAs(blob, `${iconName}.svg`);
};

function* downloadIcon({ payload: { svgNode } }) {
    try {
        yield delay(500);
        const { iconDownloadFormat, downloadSize: { height, width }, iconToEdit: { iconName } } = yield select(selectEditIcon);
        if (iconDownloadFormat === SVG_FORMAT.value) {
            yield call(downloadSvg, svgNode, height, width, iconName);
        }
        yield put(iconDownloadSuccess());
    }
    catch (e) {
        yield put(iconDownloadFailure(e?.message));
    }
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
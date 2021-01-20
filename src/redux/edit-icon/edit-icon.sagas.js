//libs
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import Canvg from 'canvg';
import FileSaver from 'file-saver';
//action types
import { editIconActionTypes } from './edit-icon.type';
//actions
import { iconDownloadSuccess, iconDownloadFailure } from './edit-icon.actions';
//selectors
import { selectEditIcon } from './edit-icon.selectors';
//constants
import { PNG_FORMAT, SVG_FORMAT } from '../../utilities/app.constants';










// download user icons

function* downloadPng(svgString, canvasNode, iconName, iconDownloadSuccessAction) {
    if (canvasNode && svgString) {
        const ctx = canvasNode.getContext('2d');
        const renderRef = Canvg.fromString(ctx, svgString);
        renderRef.start();
        yield delay(1000);
        const image = canvasNode.toDataURL(); // defaults to "image/png"
        FileSaver.saveAs(image, `${iconName}.png`);
        yield delay(500);
        yield put(iconDownloadSuccessAction());
    }
    else {
        throw new Error('Not a valid canvas node or svg string');
    }
};

function* downloadSvg(svgString, iconName, iconDownloadSuccessAction) {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    FileSaver.saveAs(blob, `${iconName}.svg`);
    yield delay(500);
    yield put(iconDownloadSuccessAction());
};

function getSvgString(svgNode, height, width) {
    svgNode.setAttribute("height", `${height}px`);
    svgNode.setAttribute("width", `${width}px`);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgNode);
};

function* downloadIcon({ payload: { svgNode, canvasNode } }) {
    try {
        const { iconDownloadFormat, downloadSize: { height, width }, iconToEdit: { iconName } } = yield select(selectEditIcon);
        const svgString = yield call(getSvgString, svgNode, height, width);
        if (iconDownloadFormat === SVG_FORMAT.value) {
            yield call(downloadSvg, svgString, iconName, iconDownloadSuccess);
        }
        if (iconDownloadFormat === PNG_FORMAT.value) {
            yield call(downloadPng, svgString, canvasNode, iconName, iconDownloadSuccess);
        }

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
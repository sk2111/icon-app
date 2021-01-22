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
import { PNG_FORMAT, SVG_FORMAT, JPEG_FORMAT, WEBP_FORMAT } from '../../utilities/app.constants';








/*
    var imgData = ctx.getImageData(0, 0, canvasNode.width, canvasNode.height);
    var data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3]< 255) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);

*/
// const imgData = ctx.getImageData(0, 0, canvasNode.width, canvasNode.height);
// var data = imgData.data;
// console.log("canvas node test", imgData, data);

// download user icons
// download png webp jpeg
function* downloadCanvasAsImage(svgString, canvasNode, iconName, dataUrltype, fileExtension, iconDownloadSuccessAction) {
    if (canvasNode && svgString) {
        const ctx = canvasNode.getContext('2d');
        const renderRef = Canvg.fromString(ctx, svgString);
        renderRef.start();
        yield delay(1000);
        const image = canvasNode.toDataURL(dataUrltype, 1);
        FileSaver.saveAs(image, `${iconName}${fileExtension}`);
        yield delay(500);
        yield put(iconDownloadSuccessAction());
    }
    else {
        throw new Error('Not a valid canvas node or svg string');
    }
};

//download svg
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
        switch (iconDownloadFormat) {
            case SVG_FORMAT.value:
                return yield call(downloadSvg, svgString, iconName, iconDownloadSuccess);
            case PNG_FORMAT.value:
                return yield call(downloadCanvasAsImage, svgString, canvasNode, iconName, "image/png", ".png", iconDownloadSuccess);
            case JPEG_FORMAT.value:
                return yield call(downloadCanvasAsImage, svgString, canvasNode, iconName, "image/jpeg", ".jpeg", iconDownloadSuccess);
            case WEBP_FORMAT.value:
                return yield call(downloadCanvasAsImage, svgString, canvasNode, iconName, "image/webp", ".webp", iconDownloadSuccess);
            default:
                console.log("No match found");
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
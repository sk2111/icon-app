//libs
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import Canvg from 'canvg';
import FileSaver from 'file-saver';
import { CanvasToBMP } from '../../utilities/canvas-to-bmp';
//action types
import { editIconActionTypes } from './edit-icon.type';
//actions
import { iconDownloadSuccess, iconPreviewSuccess, iconDownloadFailure, iconPreviewFailure } from './edit-icon.actions';
//selectors
import { selectEditIcon } from './edit-icon.selectors';
//constants
import { PNG_FORMAT, SVG_FORMAT, BMP_FORMAT, JPEG_FORMAT, WEBP_FORMAT } from '../../utilities/app.constants';

// download jpeg as white color
function* downloadCanvasAsJpeg(svgString, canvasNode, iconName, dataUrltype, fileExtension, iconDownloadSuccessAction) {
    if (canvasNode && svgString) {
        const ctx = canvasNode.getContext("2d")
        const imgData = ctx.getImageData(0, 0, canvasNode.width, canvasNode.height);
        const data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 255) {
                data[i] = 255;
                data[i + 1] = 255; // convert non opaque pixels to white
                data[i + 2] = 255;
                data[i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        const imageUri = canvasNode.toDataURL(dataUrltype, 1);
        FileSaver.saveAs(imageUri, `${iconName}${fileExtension}`);
        yield delay(500);
        yield put(iconDownloadSuccessAction());
    }
    else {
        throw new Error('Not a valid canvas node or svg string');
    }
};

// download png webp 
function* downloadCanvasAsImage(svgString, canvasNode, iconName, dataUrltype, fileExtension, iconDownloadSuccessAction) {
    if (canvasNode && svgString) {
        const imageUri = canvasNode.toDataURL(dataUrltype, 1);
        FileSaver.saveAs(imageUri, `${iconName}${fileExtension}`);
        yield delay(500);
        yield put(iconDownloadSuccessAction());
    }
    else {
        throw new Error('Not a valid canvas node or svg string');
    }
};

//download bmp 
function* downloadBmp(canvasNode, iconName, iconDownloadSuccessAction) {
    CanvasToBMP.toDataURL(canvasNode, (dataUri) => {
        FileSaver.saveAs(dataUri, `${iconName}.bmp`);
    });
    yield delay(500);
    yield put(iconDownloadSuccessAction());
};

//download svg
function* downloadSvg(svgString, iconName, iconDownloadSuccessAction) {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    FileSaver.saveAs(blob, `${iconName}.svg`);
    yield delay(500);
    yield put(iconDownloadSuccessAction());
};

// helpers
function getSvgString(svgNode, height, width) {
    svgNode.setAttribute("height", `${height}px`);
    svgNode.setAttribute("width", `${width}px`);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgNode);
};

function* renderCanvas(canvasNode, svgString) {
    const ctx = canvasNode.getContext('2d');
    const renderRef = Canvg.fromString(ctx, svgString);
    renderRef.start();
    yield delay(1000);
}

function* downloadIcon({ payload: { svgNode, canvasNode } }) {
    try {
        const { iconDownloadFormat, downloadSize: { height, width }, iconToEdit: { iconName } } = yield select(selectEditIcon);
        const svgString = yield call(getSvgString, svgNode, height, width);
        yield call(renderCanvas, canvasNode, svgString);
        switch (iconDownloadFormat) {
            case SVG_FORMAT.value:
                return yield call(downloadSvg, svgString, iconName, iconDownloadSuccess);
            case BMP_FORMAT.value:
                return yield call(downloadBmp, canvasNode, iconName, iconDownloadSuccess);
            case PNG_FORMAT.value:
                return yield call(downloadCanvasAsImage, svgString, canvasNode, iconName, "image/png", ".png", iconDownloadSuccess);
            case WEBP_FORMAT.value:
                return yield call(downloadCanvasAsImage, svgString, canvasNode, iconName, "image/webp", ".webp", iconDownloadSuccess);
            case JPEG_FORMAT.value:
                return yield call(downloadCanvasAsJpeg, svgString, canvasNode, iconName, "image/jpeg", ".jpeg", iconDownloadSuccess);
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


// on previw icon size
function* previewIcon({ payload: { svgNode } }) {
    try {
        const { downloadSize: { height, width } } = yield select(selectEditIcon);
        const svgString = yield call(getSvgString, svgNode, height, width);
        const image = new Image();
        image.src = "data:image/svg+xml;base64," + btoa(svgString);
        const previewContent = `<div style="height:100%;">
        ${image.outerHTML}
        </div>`;
        const windowIns = window.open("");
        windowIns.document.title = 'Preview';
        windowIns.document.write(previewContent);
        windowIns.document.close();
        yield (put(iconPreviewSuccess()));
    }
    catch (e) {
        yield put(iconPreviewFailure(e?.message));
    }
};

function* onPreviewIconStart() {
    yield takeLatest(editIconActionTypes.ICON_PREVIEW_START, previewIcon);
};

//export all sagas
export function* editIconSagas() {
    yield all([
        call(onDownloadIconStart),
        call(onPreviewIconStart),
    ]);
}
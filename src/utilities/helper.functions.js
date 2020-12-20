//constants
import { UPLOAD_ICONS_DEFAULT_CLASSIFICATION } from './app.constants';

export const frameCurrentUserObject = (userObj) => {
    return {
        ...userObj, isAdmin: false
    };
};

export const compareProps = (a, b, aKey, bKey) => {
    if (a[aKey] < b[bKey]) {
        return -1;
    }
    if (a[aKey] > b[bKey]) {
        return 1;
    }
    return 0;
}

export const trimStr = (toTrimValue) => {
    return String(toTrimValue).replace(/\s/g, '').toLowerCase();
};

export const getAlphaOnly = (text, replaceChar, toLowerCase = true) => {
    const alphaString = String(text).replace(/[^a-zA-Z]/g, replaceChar);
    return toLowerCase ? alphaString.toLowerCase() : alphaString;
};

export const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomObjectProperty = (prop, index) => {
    return prop + getRandomInteger(getRandomInteger(index, 100000 * (index + 1)), getRandomInteger(index, 100000 * (index + 1)))
        + getRandomInteger(1, 100000000000000);
};

export default class ColorTheme {
    constructor(backgroundColor, color) {
        this.backgroundColor = backgroundColor;
        this.color = color;
    }
}

export const getRandomColorTheme = () => {
    const themes = [
        new ColorTheme("#F23EDC", "white"), new ColorTheme("#9D80E1", "white"), new ColorTheme("#EB5F35", "white"),
        new ColorTheme("#73A11E", "white"), new ColorTheme("#3254B7", "white"), new ColorTheme("#009ED5", "white"),
        new ColorTheme("#41A486", "white"), new ColorTheme("#B38E20", "white"), new ColorTheme("#FF5A5F", "white"),
        new ColorTheme("#95735F", "white"),
    ];
    return themes[getRandomInteger(0, themes.length)];
};


// file reading helpers 
export const readAsTextFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = ({ target: { result } }) => {
                resolve(result);
            };
            reader.readAsText(file);
        }
        catch (e) {
            reject(e);
        }
    });
}

export const readFiles = async (fileList, acceptType, validfileNameCheck = ".svg", maxmimumFiles = 100) => {
    try {
        if (fileList.length) {
            const fileData = [];
            const maxFileSizeInBytes = 800000; // 800kb
            const validFiles = Array.from(fileList).filter((file, index) => {
                return (index < maxmimumFiles) && (file.type === acceptType) && (file.name.includes(validfileNameCheck) && (file.size <= maxFileSizeInBytes))
            });
            for (let i = 0; i < validFiles.length; i++) {
                const fileName = String(validFiles[i].name).replace(validfileNameCheck, '');
                const textData = await readAsTextFile(validFiles[i]);
                fileData.push({ name: fileName, textData: textData });
            }
            return [...fileData];
        }
    }
    catch (e) {
        console.log("File reading failed", e);
        return;
    }
};


// upload normalize data helpers

export const normalizeUploadFileIconsStructure = (files) => {
    const normalizedData = {};
    if (!files) return normalizedData;
    files.forEach((file, index) => {
        const fileName = (String(file.name).split('.'))[0];
        const randomProperty = getRandomObjectProperty(fileName, index);
        const buff = Buffer.from(file.textData);
        const base64data = buff.toString('base64');
        normalizedData[randomProperty] = {
            id: randomProperty,
            iconName: fileName,
            iconClassification: [UPLOAD_ICONS_DEFAULT_CLASSIFICATION],
            iconTags: [],
            createdAt: new Date(),
            iconsBase64: base64data,
            iconData: file.textData
        };
    });
    return normalizedData;
}
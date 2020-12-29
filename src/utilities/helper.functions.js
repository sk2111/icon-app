//constants
import {
    UPLOAD_ICONS_DEFAULT_CLASSIFICATION, ICON_PROP,
    NUMBER_OF_LAZY_LOAD_ICONS_TO_DISPLAY
} from './app.constants';
// destructure icon prop
const { ICON_ID, ICON_NAME, ICON_CLASSIFICATION, ICON_BASE_64, ICON_DATA, ICON_TAGS, CREATED_AT } = ICON_PROP;

//helper functions
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

export const integerArray = len => Array.from(Array(len ?? NUMBER_OF_LAZY_LOAD_ICONS_TO_DISPLAY), (x, i) => i);

export const trimStr = (toTrimValue) => {
    return String(toTrimValue).replace(/\s/g, '').toLowerCase();
};

export const getAlphaOnly = (text, replaceChar, allowSpace = true, toLowerCase = true) => {
    const alphaString = allowSpace ? String(text).replace(/[^a-zA-Z\s]/g, replaceChar) : String(text).replace(/[^a-zA-Z]/g, replaceChar);
    return toLowerCase ? alphaString.toLowerCase() : alphaString;
};

export const capitalizeFirstLetter = (stringVal) => {
    return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
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

export const readFilesAsync = async (fileList, acceptType, validfileNameCheck = ".svg", maxmimumFiles = 100, handleFileUpload) => {
    try {
        if (fileList.length) {
            const maxFileSizeInBytes = 800000; // 800kb
            const validFiles = Array.from(fileList).filter((file, index) => {
                return (index < maxmimumFiles) && (file.type === acceptType) && (file.name.includes(validfileNameCheck) && (file.size <= maxFileSizeInBytes))
            });
            for (let i = 0; i < validFiles.length; i++) {
                const fileName = String(validFiles[i].name).replace(validfileNameCheck, '');
                const textData = await readAsTextFile(validFiles[i]);
                handleFileUpload([{ name: fileName, textData: textData }]);
            }
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
            [ICON_ID]: randomProperty,
            [ICON_NAME]: fileName,
            [ICON_CLASSIFICATION]: UPLOAD_ICONS_DEFAULT_CLASSIFICATION,
            [ICON_TAGS]: [],
            [CREATED_AT]: new Date(),
            [ICON_BASE_64]: base64data,
            [ICON_DATA]: file.textData
        };
    });
    return normalizedData;
};


export const extractNeededPropsForUpload = (list) => {
    return list.map((icon) => {
        const { [ICON_NAME]: iconName, [ICON_CLASSIFICATION]: iconClassification, [ICON_TAGS]: iconTags,
            [CREATED_AT]: createdAt, [ICON_DATA]: iconData } = icon;
        return {
            [ICON_NAME]: iconName,
            [ICON_CLASSIFICATION]: iconClassification,
            [ICON_TAGS]: [...iconTags],
            [CREATED_AT]: createdAt,
            [ICON_DATA]: iconData,
        }
    });
};

export const isIconsAllowedToUpload = (list) => {
    const isNotValid = list.filter((icon) => icon[ICON_CLASSIFICATION].includes(UPLOAD_ICONS_DEFAULT_CLASSIFICATION));
    return !!isNotValid.length;
};

export const appendCommonTagsAndIconName = (list, commonRootTags) => {
    return list.map((icon) => ({
        ...icon,
        [ICON_TAGS]: new Set([...commonRootTags, icon[ICON_NAME], ...icon[ICON_TAGS]].map((tag) => getAlphaOnly(tag, '')))
    }));
};

export const getAllTagValuesFromIcons = (list) => {
    const tags = [];
    list.forEach((icon) => {
        tags.push(...icon[ICON_TAGS]);
    });
    return [...new Set(tags)];
};

export const prepareIconDataForUpload = (uploadedIcons, commonRootTags) => {
    const clonedIconsList = extractNeededPropsForUpload(Object.values(uploadedIcons));
    const isNotAllowed = isIconsAllowedToUpload(clonedIconsList);
    const iconsListToUpload = appendCommonTagsAndIconName(clonedIconsList, commonRootTags);
    const allTagValues = getAllTagValuesFromIcons(iconsListToUpload);
    return { isNotAllowed, iconsListToUpload, allTagValues };
};


//pagination helpers
export const framePaginateKey = (classficationValue, searchKeywordValue) => {
    return (getAlphaOnly(classficationValue, '', false, true) + '-' + getAlphaOnly(searchKeywordValue, '', false, true));
};
//reading data from firestore to redux helpers
export const frameIconObjFromDocObj = (iconDocList) => {
    const returnObj = {};
    iconDocList.forEach((iconDoc) => {
        const iconId = iconDoc.id;
        const { [ICON_DATA]: iconData } = iconDoc.data();
        const buff = Buffer.from(iconData);
        const base64data = buff.toString('base64');
        returnObj[iconDoc.id] = {
            [ICON_ID]: iconId,
            [ICON_BASE_64]: base64data,
            ...iconDoc.data()
        };
    });
    return { ...returnObj };
}; 
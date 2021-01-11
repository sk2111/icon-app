//libs
import DOMPurify from 'dompurify';
//constants
import {
    UPLOAD_ICONS_DEFAULT_CLASSIFICATION, ICON_PROP, FAVORITES_PROP,
    NUMBER_OF_LAZY_LOAD_ICONS_TO_DISPLAY, COMMON_ICONS_HEADER_LABEL, PROJECT_ICONS_HEADER_LABEL
} from './app.constants';
import { COMMON_ICONS_LIST_PATH, PROJECT_ICONS_LIST_PATH } from '../firebase/firebase.constants';
// destructure icon prop
const { ICON_ID, ICON_NAME, ICON_CLASSIFICATION, ICON_BASE_64, ICON_DATA, ICON_TAGS, CREATED_AT, ICON_FAVORITE } = ICON_PROP;
const { FAVORITES_ID, FAVORITES_IS_FETCHED, FAVORITES_PATH } = FAVORITES_PROP;

//helper functions
export const frameCurrentUserObject = (userObj) => {
    return {
        ...userObj, isAdmin: false
    };
};

export const sanitizeSvg = (svg) => DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } });

export const integerArray = len => Array.from(Array(len ?? NUMBER_OF_LAZY_LOAD_ICONS_TO_DISPLAY), (x, i) => i);

export const trimStr = (toTrimValue) => {
    return String(toTrimValue).replace(/\s/g, '').toLowerCase();
};

export const getAlphaOnly = (text, replaceChar, allowSpace = true, toLowerCase = true) => {
    const alphaString = allowSpace ? String(text).replace(/[^a-zA-Z\s]/g, replaceChar) : String(text).replace(/[^a-zA-Z]/g, replaceChar);
    return toLowerCase ? alphaString.toLowerCase().trim() : alphaString.trim();
};

export const getSpaceCombinationValue = (strValue) => {
    if (strValue.length) {
        const spaceSeperatedArr = strValue.split(' ').map((val) => getAlphaOnly(val, '', false, true));
        return [...new Set([...spaceSeperatedArr, getAlphaOnly(strValue, '', true, true)])];
    }
    return [];
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
                handleFileUpload([{ name: fileName, textData: sanitizeSvg(textData) }]);
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
    return list.map((icon) => {
        const finalTagsArr = [...commonRootTags, icon[ICON_NAME], ...icon[ICON_TAGS]]
            .map((tag) => getSpaceCombinationValue(getAlphaOnly(tag, '', true, true)));
        return {
            ...icon,
            [ICON_TAGS]: [...new Set(finalTagsArr.flat())]
        };
    });
};

export const getAllTagValuesFromIcons = (list, commonRootTags) => {
    const tags = [];
    list.forEach((icon) => {
        tags.push(...icon[ICON_TAGS]);
    });
    return [...commonRootTags, ...new Set(tags)].map((tag) => getAlphaOnly(tag, '', true, true));
};

export const prepareIconDataForUpload = (uploadedIcons, commonRootTags) => {
    const clonedIconsList = extractNeededPropsForUpload(Object.values(uploadedIcons));
    const isNotAllowed = isIconsAllowedToUpload(clonedIconsList);
    if (isNotAllowed) {
        return { isNotAllowed, iconsListToUpload: [], allTagValues: [] };
    }
    const allTagValues = getAllTagValuesFromIcons(clonedIconsList, commonRootTags);
    const iconsListToUpload = appendCommonTagsAndIconName(clonedIconsList, commonRootTags);
    return { isNotAllowed, iconsListToUpload, allTagValues };
};


//pagination helpers
export const getPaginateConfig = (classficationValue, searchKeywordValue, paginationMap) => {
    const paginateKey = (classficationValue + '-' + getAlphaOnly(searchKeywordValue, '', true, true));
    const match = paginationMap[paginateKey];
    return {
        paginateKey,
        existingPaginationMap: match ? { ...paginationMap[paginateKey] } : null,
        isMoreIconsAvailableToFetch: match ? match.isMoreIconsAvailableToFetch : false
    };
};
// Fetch config query param frame
export const framePaginationQueryParams = (selectValue, searchValue, existingPaginationMap,
    defaultClassification, listPath, maxFiles) => {
    const searchCombination = getSpaceCombinationValue(searchValue);
    const isDefaultClassification = selectValue === defaultClassification
    const queryOperator = isDefaultClassification ? '!=' : '==';
    const queryOrderByConfig = isDefaultClassification ? [ICON_CLASSIFICATION] : [CREATED_AT, "desc"];
    return {
        collectionPath: listPath,
        classificationConfig: [ICON_CLASSIFICATION, queryOperator, selectValue],
        searchKeywordConfig: [ICON_TAGS, 'array-contains-any', searchCombination],
        orderConfig: [...queryOrderByConfig],
        listLimit: maxFiles,
        previousQueryEndDoc: existingPaginationMap ? existingPaginationMap.lastQueryEndRef : null
    }
};
//reading data from firestore to redux helpers
export const frameIconObjFromDocObj = (iconDocList, favoritesMap) => {
    const returnObj = {};
    const notFoundList = [];
    iconDocList.forEach((iconDoc) => {
        if (iconDoc.exists) {
            const iconId = iconDoc.id;
            const { [ICON_DATA]: iconData } = iconDoc.data();
            const buff = Buffer.from(iconData);
            const base64data = buff.toString('base64');
            returnObj[iconDoc.id] = {
                [ICON_ID]: iconId,
                [ICON_BASE_64]: base64data,
                [ICON_FAVORITE]: (!!favoritesMap[iconId]) ?? false,
                ...iconDoc.data()
            };
        }
        else {
            notFoundList.push(iconDoc.id);
        }
    });
    return {
        iconsMap: { ...returnObj },
        notFoundList
    };
};
// favorites tab pick selected items for fetching
export const getLimitedFetchList = (fetchMap, propName, equalsToValue, limit) => {
    const keys = Object.keys(fetchMap);
    const newFetchList = [];
    const fetchIdList = [];
    for (let i = 0; i < keys.length; i++) {
        const fetchItem = fetchMap[keys[i]];
        if (newFetchList.length === limit) {
            break;
        }
        if ((newFetchList.length < limit) && fetchItem[propName] === equalsToValue) {
            newFetchList.push(fetchItem);
            fetchIdList.push(keys[i]);
        }
    }
    return {
        fetchList: [...newFetchList],
        fetchIdList,
    };
};
// favourites Map frame db to client
export const frameFavoriteIconsMap = (favoriteIcons, oldFetchMap = {}) => {
    let favoritesMap = {};
    for (const [key, value] of Object.entries(favoriteIcons)) {
        let fetchPath;
        if (value === COMMON_ICONS_HEADER_LABEL) {
            fetchPath = COMMON_ICONS_LIST_PATH + '/' + key;
        }
        if (value === PROJECT_ICONS_HEADER_LABEL) {
            fetchPath = PROJECT_ICONS_LIST_PATH + '/' + key;
        }
        favoritesMap[key] = {
            [FAVORITES_ID]: key,
            [FAVORITES_IS_FETCHED]: oldFetchMap[key] ? oldFetchMap[key][FAVORITES_IS_FETCHED] : false,
            [FAVORITES_PATH]: fetchPath,
        }
    }
    return { ...favoritesMap };
};

export const extractSimplifiedMapFromFavoritesMap = (favoritesMap, newItem, label) => {
    // fetchmap :{id,fetchPath,isFetched} convert to => id:path
    // TO avoid much memory usage in db we are following this way of simplified mapping
    let newMap = {};
    const { id, value } = newItem;
    for (const [key, config] of Object.entries(favoritesMap)) {
        let fetchPath;
        if (config[FAVORITES_PATH].includes(COMMON_ICONS_LIST_PATH)) {
            fetchPath = COMMON_ICONS_HEADER_LABEL;
        }
        if (config[FAVORITES_PATH].includes(PROJECT_ICONS_LIST_PATH)) {
            fetchPath = PROJECT_ICONS_HEADER_LABEL;
        }
        newMap[key] = fetchPath;
    }
    if (value) {
        newMap[id] = label;
    }
    else {
        const { [id]: deleteItem, ...otherProps } = newMap;
        newMap = { ...otherProps };
    }
    return { ...newMap };
};
//check all favorite icons fetched
export const checkIsAllIconsFetched = (fetchMap) => {
    for (const [key] of Object.entries(fetchMap)) {
        if (!fetchMap[key][FAVORITES_IS_FETCHED]) {
            return true;
        }
    }
    return false;
};
// update favorites fetch Map after retriving from db
export const updateFavoritesIconsFetchMap = (fetchMap, fetchIdList) => {
    fetchIdList.forEach(id => {
        fetchMap[id] = {
            ...fetchMap[id], [FAVORITES_IS_FETCHED]: true
        }
    });
    return { ...fetchMap };
};
//extract required props based on list
export const extractPropsBasedOnList = (obj, keepList) => {
    let newMap = {};
    keepList.forEach((id) => {
        if (obj[id]) {
            newMap[id] = { ...obj[id] };
        }
    });
    return { ...newMap };
};
//remove props based on list
export const removePropsBasedOnList = (obj, removeList) => {
    let newMap = { ...obj };
    removeList.forEach((id) => {
        if (newMap[id]) {
            const { [id]: remove, ...otherProps } = newMap;
            newMap = { ...otherProps };
        }
    });
    return { ...newMap };
};
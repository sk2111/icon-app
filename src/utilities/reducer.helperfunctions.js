import { FAVORITES_PROP } from '../utilities/app.constants';
const { FAVORITES_IS_FETCHED } = FAVORITES_PROP;


export const removeObjectPropertiesImmutably = (obj, keys) => {
    if (keys) {
        let objToReturn = { ...obj };
        keys.forEach(key => {
            const { [key]: value, ...others } = objToReturn;
            objToReturn = { ...others };
        });
        return objToReturn;
    }
    return obj;
};

export const editObjectPropertiesImmutably = (obj, { key, value, id }) => {
    if (key && id && obj[id]) {
        obj[id] = { ...obj[id], [key]: value };
        return { ...obj };
    }
    return obj;
};

export const editAllIconsObjectPropertiesImmutably = (obj, { key, value }) => {
    if (key && value && obj) {
        const array = Object.values(obj);
        let returnObj = {};
        array.forEach((item) => {
            returnObj = { ...returnObj, [item.id]: { ...item, [key]: value } }
        });
        return returnObj;
    }
    return obj;
};

export const updateFavoritesIconsFetchMap = (fetchMap, fetchIdList) => {
    fetchIdList.forEach(id => {
        fetchMap[id] = {
            ...fetchMap[id], [FAVORITES_IS_FETCHED]: true
        }
    });
    return { ...fetchMap };
};
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
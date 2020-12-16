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
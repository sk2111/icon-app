export const removeObjectPropertyImmutably = (obj, key) => {
    if (key) {
        const { [key]: value, ...others } = obj;
        return { ...others };
    }
    return obj;
};
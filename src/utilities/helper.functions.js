export const frameCurrentUserObject = (userObj) => {
    return {
        ...userObj,isAdmin:false
    };
};

export const trimStr = (toTrimValue) => {
    return String(toTrimValue).replace(/\s/g, '').toLowerCase();
};
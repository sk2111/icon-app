export const frameCurrentUserObject = (userObj) => {
    return {
        ...userObj,isAdmin:false
    };
};
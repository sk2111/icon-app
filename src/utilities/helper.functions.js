export const frameCurrentUserObject = (userObj) => {
    return {
        ...userObj, isAdmin: false
    };
};

export const trimStr = (toTrimValue) => {
    return String(toTrimValue).replace(/\s/g, '').toLowerCase();
};

export const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomColorTheme = () => {
    const themes = [
        { backgroundColor: "red", color: "white" },
        { backgroundColor: "blue", color: "white" },
        { backgroundColor: "gray", color: "white" },
        { backgroundColor: "green", color: "white" },
        { backgroundColor: "yellow", color: "white" },
        { backgroundColor: "orange", color: "white" },
        { backgroundColor: "violet", color: "white" },
    ];
    return themes[getRandomInteger(0, themes.length)];
};
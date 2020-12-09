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

export const readFiles = async (fileList, acceptType, validfileNameCheck = ".svg") => {
    try {
        if (fileList.length) {
            const fileData = [];
            const validFiles = Array.from(fileList).filter(file => file.type === acceptType && file.name.includes(validfileNameCheck));
            for (let i = 0; i < validFiles.length; i++) {
                const textData = await readAsTextFile(validFiles[i]);
                fileData.push(textData);
            }
            return [...fileData];
        }
    }
    catch (e) {
        console.log("File reading failed", e);
        return;
    }
};
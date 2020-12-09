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
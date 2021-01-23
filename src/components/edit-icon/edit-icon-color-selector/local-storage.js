
//default swatches
const DEFAULT_SWATCHES = [];
const SWATCH_KEY = "swatchMap";

export const getStoredSwatches = () => {
    const storedSwatches = localStorage.getItem(SWATCH_KEY);
    if (storedSwatches) {
        return storedSwatches;
    }
    else {
        localStorage.setItem(SWATCH_KEY, JSON.stringify(DEFAULT_SWATCHES));
        return localStorage.getItem(SWATCH_KEY);
    }
};

export const setStoredSwatches = (newSwatches) => {
    if (Object.keys(newSwatches).length) {
        localStorage.setItem(SWATCH_KEY, JSON.stringify(newSwatches));
    }
};
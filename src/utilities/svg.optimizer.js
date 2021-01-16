import getSvgoInstance from 'svgo-browser/lib/get-svgo-instance';

export const svgo = getSvgoInstance({
    removeViewBox: false,
    removeAttrs: false
});
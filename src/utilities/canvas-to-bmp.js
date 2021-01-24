/*!
    canvas-to-bmp version 1.1.0 BETA
    By Epistemex (c) 2015
    www.epistemex.com
    MIT License (this header required)
*/

/**
 * Static helper object that can convert a CORS-compliant canvas element
 * to a 32-bits BMP file (buffer, Blob and data-URI).
 *
 * @type {{toArrayBuffer: Function, toBlob: Function, toDataURL: Function}}
 * @namespace
 */
export const CanvasToBMP = {

    /**
     * Convert a canvas element to ArrayBuffer containing a BMP file
     * with support for 32-bit format (alpha). The call is asynchronous
     * so a callback must be provided.
     *
     * Note that CORS requirement must be fulfilled.
     *
     * @param {HTMLCanvasElement} canvas - the canvas element to convert
     * @param {function} callback - called when conversion is done. Argument is ArrayBuffer
     * @static
     */
    toArrayBuffer: function (canvas, callback) {

        var w = canvas.width,
            h = canvas.height,
            w4 = w << 2,
            idata = canvas.getContext("2d").getImageData(0, 0, w, h),
            data32 = new Uint32Array(idata.data.buffer),

            stride = ((32 * w + 31) / 32) << 2,
            pixelArraySize = stride * h,
            fileLength = 122 + pixelArraySize,

            file = new ArrayBuffer(fileLength),
            view = new DataView(file),
            blockSize = 1 << 20,
            block = blockSize,
            y = 0, x, v, a, pos = 0, p, s = 0;

        // Header
        set16(0x4d42);										// BM
        set32(fileLength);									// total length
        seek(4);											// skip unused fields
        set32(0x7a);										// offset to pixels

        // DIB header
        set32(0x6c);										// header size (108)
        set32(w);
        set32(-h >>> 0);									// negative = top-to-bottom
        set16(1);											// 1 plane
        set16(32);											// 32-bits (RGBA)
        set32(3);											// no compression (BI_BITFIELDS, 3)
        set32(pixelArraySize);								// bitmap size incl. padding (stride x height)
        set32(2835);										// pixels/meter h (~72 DPI x 39.3701 inch/m)
        set32(2835);										// pixels/meter v
        seek(8);											// skip color/important colors
        set32(0xff0000);									// red channel mask
        set32(0xff00);										// green channel mask
        set32(0xff);										// blue channel mask
        set32(0xff000000);									// alpha channel mask
        set32(0x57696e20);									// " win" color space

        (function convert() {

            // bitmap data, change order of ABGR to BGRA (msb-order)
            while (y < h && block > 0) {
                p = 0x7a + y * stride;						// offset + stride x height
                x = 0;

                while (x < w4) {
                    block--;
                    v = data32[s++];						// get ABGR
                    a = v >>> 24;							// alpha
                    view.setUint32(p + x, (v << 8) | a);  	// set BGRA (msb order)
                    x += 4;
                }
                y++
            }

            if (s < data32.length) {
                block = blockSize;
                setTimeout(convert, CanvasToBMP._dly);
            }
            else
                callback(file);
        })();

        // helper method to move current buffer position
        function set16(data) {
            view.setUint16(pos, data, true);
            pos += 2
        }

        function set32(data) {
            view.setUint32(pos, data, true);
            pos += 4
        }

        function seek(delta) { pos += delta }
    },

    /**
     * Converts a canvas to BMP file, returns a Blob representing the
     * file. This can be used with URL.createObjectURL(). The call is
     * asynchronous so a callback must be provided.
     *
     * Note that CORS requirement must be fulfilled.
     *
     * @param {HTMLCanvasElement} canvas - the canvas element to convert
     * @param {function} callback - called when conversion is done. Argument is a Blob
     * @static
     */
    toBlob: function (canvas, callback) {
        this.toArrayBuffer(canvas, function (file) {
            callback(new Blob([file], { type: "image/bmp" }));
        });
    },

    /**
     * Converts a canvas to BMP file, returns an ObjectURL (for Blob)
     * representing the file. The call is asynchronous so a callback
     * must be provided.
     *
     * **Important**: To avoid memory-leakage you must revoke the returned
     * ObjectURL when no longer needed:
     *
     *     var _URL = self.URL || self.webkitURL || self;
     *     _URL.revokeObjectURL(url);
     *
     * Note that CORS requirement must be fulfilled.
     *
     * @param {HTMLCanvasElement} canvas - the canvas element to convert
     * @param {function} callback - called when conversion is done. Argument is a Blob
     * @static
     */
    toObjectURL: function (canvas, callback) {
        this.toBlob(canvas, function (blob) {
            var url = this.URL || this.webkitURL || this;
            callback(url.createObjectURL(blob))
        });
    },

    /**
     * Converts the canvas to a data-URI representing a BMP file. The
     * call is asynchronous so a callback must be provided.
     *
     * Note that CORS requirement must be fulfilled.
     *
     * @param {HTMLCanvasElement} canvas - the canvas element to convert
     * @param {function} callback - called when conversion is done. Argument is an data-URI (string)
     * @static
     */
    toDataURL: function (canvas, callback) {

        this.toArrayBuffer(canvas, function (file) {
            var buffer = new Uint8Array(file),
                blockSize = 1 << 20,
                block = blockSize,
                bs = "", base64 = "", i = 0, l = buffer.length;

            // This is a necessary step before we can use btoa. We can
            // replace this later with a direct byte-buffer to Base-64 routine.
            // Will do for now, impacts only with very large bitmaps (in which
            // case toBlob should be used).
            (function prepBase64() {
                while (i < l && block-- > 0) bs += String.fromCharCode(buffer[i++]);

                if (i < l) {
                    block = blockSize;
                    setTimeout(prepBase64, CanvasToBMP._dly);
                }
                else {
                    // convert string to Base-64
                    i = 0;
                    l = bs.length;
                    block = 180000;		// must be divisible by 3

                    (function toBase64() {
                        base64 += btoa(bs.substr(i, block));
                        i += block;
                        (i < l)
                            ? setTimeout(toBase64, CanvasToBMP._dly)
                            : callback("data:image/bmp;base64," + base64);
                    })();
                }
            })();
        });
    }
};
CanvasToBMP._dly = 9;	// delay for async operations
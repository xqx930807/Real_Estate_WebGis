// OpenLayers 3 - Advanced styles with the canvas renderer
// This Javascript file allows OpenLayers 3 users to assign an image property to the fill object
// Version: v1.0


ol.style.Fill = function (opt_options) {

    var options = goog.isDef(opt_options) ? opt_options : {};

    /**
     * @private
     * @type {ol.Color|string}
     */
    this.color_ = goog.isDef(options.color) ? options.color : null;
    this.image_ = goog.isDef(options.image) ? options.image : null;
};

/**
 * @return {ol.Color|string} Color.
 * @api
 */
ol.style.Fill.prototype.getColor = function () {
    return this.color_;
};

ol.style.Fill.prototype.getImage = function () {
    return this.image_;
};

ol.render.canvas.PolygonReplay.prototype.setFillStrokeStyle = function (fillStyle, strokeStyle) {
    goog.asserts.assert(!goog.isNull(this.state_));
    goog.asserts.assert(!goog.isNull(fillStyle) || !goog.isNull(strokeStyle));
    var state = this.state_;
    if (!goog.isNull(fillStyle)) {
        var fillStyleColor = fillStyle.getColor();
        var fillStyleImage = fillStyle.getImage();
        if (!goog.isNull(fillStyleColor)) {
            state.fillStyle = fillStyleColor;
        } else if (!goog.isNull(fillStyleImage)) {
            state.fillStyle = fillStyleImage;
        }
    } else {
        state.fillStyle = undefined;
    }
    if (!goog.isNull(strokeStyle)) {
        var strokeStyleColor = strokeStyle.getColor();
        state.strokeStyle = ol.color.asString(!goog.isNull(strokeStyleColor) ?
                strokeStyleColor : ol.render.canvas.defaultStrokeStyle);
        var strokeStyleLineCap = strokeStyle.getLineCap();
        state.lineCap = goog.isDef(strokeStyleLineCap) ?
                strokeStyleLineCap : ol.render.canvas.defaultLineCap;
        var strokeStyleLineDash = strokeStyle.getLineDash();
        state.lineDash = !goog.isNull(strokeStyleLineDash) ?
                strokeStyleLineDash.slice() : ol.render.canvas.defaultLineDash;
        var strokeStyleLineJoin = strokeStyle.getLineJoin();
        state.lineJoin = goog.isDef(strokeStyleLineJoin) ?
                strokeStyleLineJoin : ol.render.canvas.defaultLineJoin;
        var strokeStyleWidth = strokeStyle.getWidth();
        state.lineWidth = goog.isDef(strokeStyleWidth) ?
                strokeStyleWidth : ol.render.canvas.defaultLineWidth;
        var strokeStyleMiterLimit = strokeStyle.getMiterLimit();
        state.miterLimit = goog.isDef(strokeStyleMiterLimit) ?
                strokeStyleMiterLimit : ol.render.canvas.defaultMiterLimit;
        this.maxLineWidth = Math.max(this.maxLineWidth, state.lineWidth);
    } else {
        state.strokeStyle = undefined;
        state.lineCap = undefined;
        state.lineDash = null;
        state.lineJoin = undefined;
        state.lineWidth = undefined;
        state.miterLimit = undefined;
    }
};


ol.render.canvas.Replay.prototype.replay_ = function (
        context, pixelRatio, transform, viewRotation, skippedFeaturesHash,
        instructions, geometryCallback) {
    /** @type {Array.<number>} */
    var pixelCoordinates;
    if (ol.vec.Mat4.equals2D(transform, this.renderedTransform_)) {
        pixelCoordinates = this.pixelCoordinates_;
    } else {
        pixelCoordinates = ol.geom.flat.transform.transform2D(
                this.coordinates, 0, this.coordinates.length, 2,
                transform, this.pixelCoordinates_);
        goog.vec.Mat4.setFromArray(this.renderedTransform_, transform);
        goog.asserts.assert(pixelCoordinates === this.pixelCoordinates_);
    }
    var i = 0; // instruction index
    var ii = instructions.length; // end of instructions
    var d = 0; // data index
    var dd; // end of per-instruction data
    var localTransform = this.tmpLocalTransform_;
    while (i < ii) {
        var instruction = instructions[i];
        var type = /** @type {ol.render.canvas.Instruction} */ (instruction[0]);
        var data, fill, geometry, stroke, text, x, y;
        switch (type) {
            case ol.render.canvas.Instruction.BEGIN_GEOMETRY:
                geometry = /** @type {ol.geom.Geometry} */ (instruction[1]);
                data = /** @type {Object} */ (instruction[2]);
                var dataUid = goog.getUid(data).toString();
                if (!goog.isDef(goog.object.get(skippedFeaturesHash, dataUid))) {
                    ++i;
                } else {
                    i = /** @type {number} */ (instruction[3]);
                }
                break;
            case ol.render.canvas.Instruction.BEGIN_PATH:
                context.beginPath();
                ++i;
                break;
            case ol.render.canvas.Instruction.CIRCLE:
                goog.asserts.assert(goog.isNumber(instruction[1]));
                d = /** @type {number} */ (instruction[1]);
                var x1 = pixelCoordinates[d];
                var y1 = pixelCoordinates[d + 1];
                var x2 = pixelCoordinates[d + 2];
                var y2 = pixelCoordinates[d + 3];
                var dx = x2 - x1;
                var dy = y2 - y1;
                var r = Math.sqrt(dx * dx + dy * dy);
                context.arc(x1, y1, r, 0, 2 * Math.PI, true);
                ++i;
                break;
            case ol.render.canvas.Instruction.CLOSE_PATH:
                context.closePath();
                ++i;
                break;
            case ol.render.canvas.Instruction.DRAW_IMAGE:
                goog.asserts.assert(goog.isNumber(instruction[1]));
                d = /** @type {number} */ (instruction[1]);
                goog.asserts.assert(goog.isNumber(instruction[2]));
                dd = /** @type {number} */ (instruction[2]);
                var image = /** @type {HTMLCanvasElement|HTMLVideoElement|Image} */
                        (instruction[3]);
                // Remaining arguments in DRAW_IMAGE are in alphabetical order
                var anchorX = /** @type {number} */ (instruction[4]) * pixelRatio;
                var anchorY = /** @type {number} */ (instruction[5]) * pixelRatio;
                var height = /** @type {number} */ (instruction[6]);
                var opacity = /** @type {number} */ (instruction[7]);
                var originX = /** @type {number} */ (instruction[8]);
                var originY = /** @type {number} */ (instruction[9]);
                var rotateWithView = /** @type {boolean} */ (instruction[10]);
                var rotation = /** @type {number} */ (instruction[11]);
                var scale = /** @type {number} */ (instruction[12]);
                var snapToPixel = /** @type {boolean} */ (instruction[13]);
                var width = /** @type {number} */ (instruction[14]);
                if (rotateWithView) {
                    rotation += viewRotation;
                }
                for (; d < dd; d += 2) {
                    x = pixelCoordinates[d] - anchorX;
                    y = pixelCoordinates[d + 1] - anchorY;
                    if (snapToPixel) {
                        x = (x + 0.5) | 0;
                        y = (y + 0.5) | 0;
                    }
                    if (scale != 1 || rotation !== 0) {
                        var centerX = x + anchorX;
                        var centerY = y + anchorY;
                        ol.vec.Mat4.makeTransform2D(
                                localTransform, centerX, centerY, scale, scale,
                                rotation, -centerX, -centerY);
                        context.setTransform(
                                goog.vec.Mat4.getElement(localTransform, 0, 0),
                                goog.vec.Mat4.getElement(localTransform, 1, 0),
                                goog.vec.Mat4.getElement(localTransform, 0, 1),
                                goog.vec.Mat4.getElement(localTransform, 1, 1),
                                goog.vec.Mat4.getElement(localTransform, 0, 3),
                                goog.vec.Mat4.getElement(localTransform, 1, 3));
                    }
                    var alpha = context.globalAlpha;
                    if (opacity != 1) {
                        context.globalAlpha = alpha * opacity;
                    }

                    context.drawImage(image, originX, originY, width, height,
                            x, y, width * pixelRatio, height * pixelRatio);

                    if (opacity != 1) {
                        context.globalAlpha = alpha;
                    }
                    if (scale != 1 || rotation !== 0) {
                        context.setTransform(1, 0, 0, 1, 0, 0);
                    }
                }
                ++i;
                break;
            case ol.render.canvas.Instruction.DRAW_TEXT:
                goog.asserts.assert(goog.isNumber(instruction[1]));
                d = /** @type {number} */ (instruction[1]);
                goog.asserts.assert(goog.isNumber(instruction[2]));
                dd = /** @type {number} */ (instruction[2]);
                goog.asserts.assert(goog.isString(instruction[3]));
                text = /** @type {string} */ (instruction[3]);
                goog.asserts.assert(goog.isNumber(instruction[4]));
                var offsetX = /** @type {number} */ (instruction[4]) * pixelRatio;
                goog.asserts.assert(goog.isNumber(instruction[5]));
                var offsetY = /** @type {number} */ (instruction[5]) * pixelRatio;
                goog.asserts.assert(goog.isNumber(instruction[6]));
                rotation = /** @type {number} */ (instruction[6]);
                goog.asserts.assert(goog.isNumber(instruction[7]));
                scale = /** @type {number} */ (instruction[7]) * pixelRatio;
                goog.asserts.assert(goog.isBoolean(instruction[8]));
                fill = /** @type {boolean} */ (instruction[8]);
                goog.asserts.assert(goog.isBoolean(instruction[9]));
                stroke = /** @type {boolean} */ (instruction[9]);
                for (; d < dd; d += 2) {
                    x = pixelCoordinates[d] + offsetX;
                    y = pixelCoordinates[d + 1] + offsetY;
                    if (scale != 1 || rotation !== 0) {
                        ol.vec.Mat4.makeTransform2D(
                                localTransform, x, y, scale, scale, rotation, -x, -y);
                        context.setTransform(
                                goog.vec.Mat4.getElement(localTransform, 0, 0),
                                goog.vec.Mat4.getElement(localTransform, 1, 0),
                                goog.vec.Mat4.getElement(localTransform, 0, 1),
                                goog.vec.Mat4.getElement(localTransform, 1, 1),
                                goog.vec.Mat4.getElement(localTransform, 0, 3),
                                goog.vec.Mat4.getElement(localTransform, 1, 3));
                    }
                    if (stroke) {
                        context.strokeText(text, x, y);
                    }
                    if (fill) {
                        context.fillText(text, x, y);
                    }
                    if (scale != 1 || rotation !== 0) {
                        context.setTransform(1, 0, 0, 1, 0, 0);
                    }
                }
                ++i;
                break;
            case ol.render.canvas.Instruction.END_GEOMETRY:
                if (goog.isDef(geometryCallback)) {
                    geometry = /** @type {ol.geom.Geometry} */ (instruction[1]);
                    data = /** @type {Object} */ (instruction[2]);
                    var result = geometryCallback(geometry, data);
                    if (result) {
                        return result;
                    }
                }
                ++i;
                break;
            case ol.render.canvas.Instruction.FILL:
                context.fill();
                ++i;
                break;
            case ol.render.canvas.Instruction.MOVE_TO_LINE_TO:
                goog.asserts.assert(goog.isNumber(instruction[1]));
                d = /** @type {number} */ (instruction[1]);
                goog.asserts.assert(goog.isNumber(instruction[2]));
                dd = /** @type {number} */ (instruction[2]);
                context.moveTo(pixelCoordinates[d], pixelCoordinates[d + 1]);
                for (d += 2; d < dd; d += 2) {
                    context.lineTo(pixelCoordinates[d], pixelCoordinates[d + 1]);
                }
                ++i;
                break;
            case ol.render.canvas.Instruction.SET_FILL_STYLE:
                //This instruction is not only a string, it could be a string but also an array with image object and degree number alpha
                //goog.asserts.assert(goog.isString(instruction[1]));          

                if (goog.isString(instruction[1])) {
                    context.fillStyle = instruction[1];
                }
                if (goog.isArray(instruction[1])) {
                    if (!(instruction[1][0] instanceof(Image))) {
                        context.fillStyle = 'black';
                    }
                    else {          
                        
                        switch (instruction[1].length) {
                            case 2 :
                                setImageAlpha(instruction[1][0], instruction[1][1], this.resolution);
                                break;
                            case 3:
                                setImageAlpha(instruction[1][0], instruction[1][1]);
                                setImageColorLayer(instruction[1][0], goog.color.isValidRgbColor_(instruction[1][2]), instruction[1][1]);
                                break;
                        }
                        var pattern = context.createPattern(instruction[1][0], 'repeat');
                        context.fillStyle = /** @type {string} */ pattern;
                        
                    }

                }

                ++i;
                break;
            case ol.render.canvas.Instruction.SET_STROKE_STYLE:
                goog.asserts.assert(goog.isString(instruction[1]));
                goog.asserts.assert(goog.isNumber(instruction[2]));
                goog.asserts.assert(goog.isString(instruction[3]));
                goog.asserts.assert(goog.isString(instruction[4]));
                goog.asserts.assert(goog.isNumber(instruction[5]));
                goog.asserts.assert(!goog.isNull(instruction[6]));
                var usePixelRatio = goog.isDef(instruction[7]) ? instruction[7] : true;
                var lineWidth = /** @type {number} */ (instruction[2]);
                context.strokeStyle = /** @type {string} */ (instruction[1]);
                context.lineWidth = usePixelRatio ? lineWidth * pixelRatio : lineWidth;
                context.lineCap = /** @type {string} */ (instruction[3]);
                context.lineJoin = /** @type {string} */ (instruction[4]);
                context.miterLimit = /** @type {number} */ (instruction[5]);
                if (ol.has.CANVAS_LINE_DASH) {
                    context.setLineDash(/** @type {Array.<number>} */ (instruction[6]));
                }
                ++i;
                break;
            case ol.render.canvas.Instruction.SET_TEXT_STYLE:
                goog.asserts.assert(goog.isString(instruction[1]));
                goog.asserts.assert(goog.isString(instruction[2]));
                goog.asserts.assert(goog.isString(instruction[3]));
                context.font = /** @type {string} */ (instruction[1]);
                context.textAlign = /** @type {string} */ (instruction[2]);
                context.textBaseline = /** @type {string} */ (instruction[3]);
                ++i;
                break;
            case ol.render.canvas.Instruction.STROKE:
                context.stroke();
                ++i;
                break;
            default:
                goog.asserts.fail();
                ++i; // consume the instruction anyway, to avoid an infinite loop
                break;
        }
    }
    // assert that all instructions were consumed
    goog.asserts.assert(i == instructions.length);
    return undefined;
}


function setImageAlpha(imageToBeProcessed, alpha, resolution) {
    imageToBeProcessed.onload = function () {
        console.log("résolution : " + resolution);

        var canvas = document.createElement('canvas');
        canvas.id = 'imageCanvas';
        canvas.width = imageToBeProcessed.width;
        canvas.height = imageToBeProcessed.height;
        document.body.appendChild(canvas);

        var canvas = document.getElementById('imageCanvas');
        var context = canvas.getContext('2d');

        var imageWidth = imageToBeProcessed.width;
        var imageHeight = imageToBeProcessed.height;

        context.drawImage(imageToBeProcessed, 0, 0);

        var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
        var data = imageData.data;


        // iterate over all pixels
        for (var i = 0, n = data.length; i < n; i += 4) {

            data[i + 3] = (255 * alpha);
        }

        imageData.data = data;
        context.putImageData(imageData, 0, 0);

        imageToBeProcessed.src = canvas.toDataURL("image/png");
        canvas.parentNode.removeChild(canvas);
    };
}


function setImageColorLayer(imageToBeProcessed, color, alpha) {
    imageToBeProcessed.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.id = 'imageCanvas';
        canvas.width = imageToBeProcessed.width;
        canvas.height = imageToBeProcessed.height;
        document.body.appendChild(canvas);

        var canvas = document.getElementById('imageCanvas');
        var context = canvas.getContext('2d');

        var imageWidth = imageToBeProcessed.width;
        var imageHeight = imageToBeProcessed.height;

        context.drawImage(imageToBeProcessed, 0, 0);

        var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
        var data = imageData.data;


        // iterate over all pixels
        for (var i = 0, n = data.length; i < n; i += 4) {

            if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
                data[i] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
            }


            data[i + 3] = alpha * 255;
        }

        imageData.data = data;
        context.putImageData(imageData, 0, 0);

        imageToBeProcessed.src = canvas.toDataURL("image/png");
        //canvas.parentNode.removeChild(canvas);
    };
}


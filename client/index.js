var canvas = document.querySelector("canvas");
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (canvas && ctx) {
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

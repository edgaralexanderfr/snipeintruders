/** * Determinates the requestAnimationFrame function depending on the browser. */
SI.defineRequestAnimationFrame = function () {
    window.requestAnimationFrame 
        = window.requestAnimationFrame 
        || window.mozRequestAnimationFrame 
        || window.webkitRequestAnimationFrame 
        || window.msRequestAnimationFrame;
}

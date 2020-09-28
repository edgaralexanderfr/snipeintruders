/**
 * Determinates the vibrate function depending on the browser.
 */
SI.defineVibrate = function () {
  navigator.vibrate = 
    navigator.vibrate       || 
    navigator.mozVibrate    || 
    navigator.webkitVibrate || 
    navigator.msVibrate;
}


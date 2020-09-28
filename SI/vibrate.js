/** * Calls the vibration API only if it's available. * * @param {number|array} param Number or array of numbers that specifies the vibration time. */
SI.vibrate = function(param) {
    if (typeof navigator['vibrate'] != 'function' || (typeof param == 'number' && param <= 0)) {
        return;
    }
    navigator.vibrate(param);
}

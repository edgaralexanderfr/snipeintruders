/** * Imports a JavaScript file programmatically. * * @param {String}   url Script url. * * @param {function} onLoad  Callback function to execute when script is loaded. * * @param {function} onError Callback function to execute when the script couldn't be loaded correctly. */
SI.res.includeScript = function(url, onLoad, onError) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.insertBefore(script, document.head.firstChild);
    script.addEventListener('load', function(evt) {
        if (typeof onLoad == 'function') {
            onLoad();
        }
    }, false);
    script.addEventListener('error', function(evt) {
        if (typeof onError == 'function') {
            onError();
        }
    }, false);
}

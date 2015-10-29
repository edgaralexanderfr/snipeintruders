SI.Renderer = new function () {
  var self                      = this;
  
  self.NO_FRAME_LOCK            = 0;
  
  var rendering                 = false;
  var fpsTime                   = 0;
  var logicTimer                = null;
  var beforeLoadListener        = null;
  var loadErrorListener         = null;
  var resourceLoadErrorListener = null;
  var prepareListener           = null;
  var logicRenderListener       = null;
  var graphicsRenderListener    = null;
  
  /**
   * Tells if there's any rendering in progress.
   *
   * @return {boolean}.
   */
  self.isRendering = function () {
    return rendering;
  }
  
  /**
   * Returns the frame's time interval in milliseconds.
   *
   * @return {Number}.
   */
  self.getFpsTime = function () {
    return fpsTime;
  }
  
  /**
   * Set the fpsTime through the provided fps, if it's zero or lower then fpsTime = 0.
   *
   * @param {Number} fps Frames per second.
   */
  self.setFps = function (fps) {
    if (fps > 0) {
      fpsTime = Math.round(1000 / fps);
    } else {
      fpsTime = 0;
    }
  }
  
  /**
   * Set a before load listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setBeforeLoadListener = function (callback) {
    beforeLoadListener = callback;
  }
  
  /**
   * Set a load error listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setLoadErrorListener = function (callback) {
    loadErrorListener = callback;
  }
  
  /**
   * Set a resource load error listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setResourceLoadErrorListener = function (callback) {
    resourceLoadErrorListener = callback;
  }
  
  /**
   * Set a prepare listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setPrepareListener = function (callback) {
    prepareListener = callback;
  }
  
  /**
   * Set a logic render listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setLogicRenderListener = function (callback) {
    logicRenderListener = callback;
  }
  
  /**
   * Set a graphics render listener.
   *
   * @param {function} callback Callback function for the event listener.
   */
  self.setGraphicsRenderListener = function (callback) {
    graphicsRenderListener = callback;
  }
  
  /**
   * Imports jQuery library and jQuery fullscreen and executes the main function as soon as all resources are loaded.
   */
  function loadResources () {
    if (typeof beforeLoadListener == 'function') {
      beforeLoadListener();
    }
    
    SI.res.includeScript('http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', function () {
      SI.res.includeScript('lib/jquery-html5-fullscreen-master/src/jquery.fullscreen.js', function () {
        SI.res.ResourceLoader.setSingleErrorDetectionListener(loadErrorListener);
        SI.res.ResourceLoader.loadFromResourceList(onLoadComplete, resourceLoadErrorListener);
      }, loadErrorListener);
    }, loadErrorListener);
  }
  
  /**
   * Set the configurated FPS and calls the prepareListener if set once the download is complete.
   */
  function onLoadComplete () {
    self.setFps(SI.res.ResourceLoader.getResources().properties.RendererFPS);
    
    if (typeof prepareListener == 'function') {
      prepareListener();
    }
  }
  
  /**
   * Allows the render callbacks.
   */
  self.render = function () {
    if (rendering) {
      return;
    }
    
    rendering = true;
    logicTimer = setInterval(renderLogic, SI.res.ResourceLoader.getResources().properties.RendererLogicRenderTime);
    renderGraphics();
  }
  
  /**
   * Stops the render callbacks.
   */
  self.stopRendering = function () {
    if (!rendering) {
      return;
    }
    
    clearInterval(logicTimer);
    rendering = false;
  }
  
  /**
   * Render all the logic callbacks.
   */
  function renderLogic () {
    if (typeof logicRenderListener == 'function') {
      logicRenderListener();
    }
  }
  
  /**
   * Render all the graphics callbacks.
   */
  function renderGraphics () {
    if (!rendering) {
      return;
    }
    
    if (typeof graphicsRenderListener == 'function') {
      graphicsRenderListener();
    }
    
    if (fpsTime > 0) {
      setTimeout(function () {
        requestAnimationFrame(renderGraphics);
      }, fpsTime);
    } else {
      requestAnimationFrame(renderGraphics);
    }
  }
  
  /**
   * Erase the canvas drawn content.
   *
   * @param {Object} context Canvas 2d context to clear.
   * @param {Object} canvas  Canvas to clear.
   */
  self.clearFrame = function (context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  /**
   * Load all the necessary assets as soon as the script is loaded.
   *
   * @param {Object} evt Load event object.
   */
  function main (evt) {
    SI.defineRequestAnimationFrame();
    loadResources();
  }
  
  window.addEventListener('load', main, false);
}


SI.Controls = new function () {
  var self                       = this;
  
  var on                         = false;
  var firstEventPerformed        = false;
  var mouseX                     = 0;
  var mouseY                     = 0;
  var keyDownActions             = {};
  var keyUpActions               = {};
  var keyDownListener            = null;
  var keyUpListener              = null;
  var contextMenuListener        = null;
  var mouseMoveListeners         = [];
  var clickListeners             = [];
  var registeredInputListener    = null;
  
  /**
   * Creates the necessary events listeners for track the keys and other useful controllers.
   */
  function init () {
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
    window.addEventListener('contextmenu', onContextMenu, false);
    window.addEventListener('selectstart', onSelectStart, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onClick, false);
  }
  
  /**
   * Tells if controls are allowed for their use.
   *
   * @return {boolean}.
   */
  self.areOn = function () {
    return on;
  }
  
  /**
   * Tells whether the first event was triggered or not.
   *
   * @return {boolean}.
   */
  self.wasFirstEventPerformed = function () {
    return firstEventPerformed;
  }
  
  /**
   * Returns the mouse x global coordinate.
   *
   * @return {Number}.
   */
  self.getMouseX = function () {
    return mouseX;
  }
  
  /**
   * Returns the mouse y global coordinate.
   *
   * @return {Number}.
   */
  self.getMouseY = function () {
    return mouseY;
  }
  
  /**
   * Set an action callback to be performed when a specific key is pressed (onKeyDown).
   *
   * @param {Number}   keyCode  Key code of the key to register.
   *
   * @param {function} callback Callback function to register.
   */
  self.setKeyDownAction = function (keyCode, callback) {
    keyDownActions[ 'k' + keyCode ] = callback;
  }
  
  /**
   * Set an action callback to be performed when a specific key is released (onKeyUp).
   *
   * @param {Number}   keyCode  Key code of the key to register.
   *
   * @param {function} callback Callback function to register.
   */
  self.setKeyUpAction = function (keyCode, callback) {
    keyUpActions[ 'k' + keyCode ] = callback;
  }
  
  /**
   * Set a key down listener.
   *
   * @param {function} callback Callback for the event listener.
   */
  self.setKeyDownListener = function (callback) {
    keyDownListener = callback;
  }
  
  /**
   * Set a key up listener.
   *
   * @param {function} callback Callback for the event listener.
   */
  self.setKeyUpListener = function (callback) {
    keyUpListener = callback;
  }
  
  /**
   * Set a context menu listener.
   *
   * @param {function} callback Callback for the event listener.
   */
  self.setContextMenuListener = function (callback) {
    contextMenuListener = callback;
  }
  
  /**
   * Adds a mouse move listener.
   *
   * @param {Function} callback Callback function to register.
   */
  self.addMouseMoveListener = function (callback) {
    mouseMoveListeners[ mouseMoveListeners.length ] = callback;
  }
  
  /**
   * Removes a mouse move listener.
   *
   * @param {Function} callback Callback function to unregister.
   */
  self.removeMouseMoveListener = function (callback) {
    var totalListeners = mouseMoveListeners.length;
    var index;
    
    for (index = 0; index < totalListeners; index++) {
      if (mouseMoveListeners[ index ] == callback) {
        mouseMoveListeners.splice(index, 1);
        
        break;
      }
    }
  }
  
  /**
   * Adds a click listener.
   *
   * @param {Function} callback Callback function to register.
   */
  self.addClickListener = function (callback) {
    clickListeners[ clickListeners.length ] = callback;
  }
  
  /**
   * Removes a click listener.
   *
   * @param {Function} callback Callback function to unregister.
   */
  self.removeClickListener = function (callback) {
    var totalListeners = clickListeners.length;
    var index;
    
    for (index = 0; index < totalListeners; index++) {
      if (clickListeners[ index ] == callback) {
        clickListeners.splice(index, 1);
        
        break;
      }
    }
  }
  
  /**
   * Set a registered input listener.
   *
   * @param {function} callback Callback for the event listener.
   */
  self.setRegisteredInputListener = function (callback) {
    registeredInputListener = callback;
  }
  
  /**
   * Key down event callback.
   *
   * @param {Object} evt Sent event object.
   */
  function onKeyDown (evt) {
    if (!on) {
      return;
    }
    
    if (typeof keyDownActions[ 'k' + evt.which ] == 'function') {
      if (typeof registeredInputListener == 'function') {
        registeredInputListener();
      }
      
      keyDownActions[ 'k' + evt.which ]();
    }
    
    if (typeof keyDownListener == 'function') {
      keyDownListener(evt);
    }
    
    firstEventPerformed = true;
  }
  
  /**
   * Key up event callback.
   *
   * @param {Object} evt Sent event object.
   */
  function onKeyUp (evt) {
    if (!on) {
      return;
    }
    
    if (typeof keyUpActions[ 'k' + evt.which ] == 'function') {
      keyUpActions[ 'k' + evt.which ]();
    }
    
    if (typeof keyUpListener == 'function') {
      keyUpListener(evt);
    }
  }
  
  /**
   * Context menu event callback.
   *
   * @param {Object} evt Sent event object.
   */
  function onContextMenu (evt) {
    evt.preventDefault();
    
    if (!on) {
      return;
    }
    
    if (typeof contextMenuListener == 'function') {
      contextMenuListener(evt);
    }
  }
  
  /**
   * Select start event callback.
   *
   * @param {Object} evt Sent event object.
   */
  function onSelectStart (evt) {
    evt.preventDefault();
  }
  
  /**
   * Mouse move event.
   *
   * @param {Object} evt Mouse move sent event.
   */
  function onMouseMove (evt) {
    if (!on) {
      return;
    }
    
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    
    var totalListeners = mouseMoveListeners.length;
    var index;
    
    for (index = 0; index < totalListeners; index++) {
      mouseMoveListeners[ index ](evt);
    }
  }
  
  /**
   * Click event.
   *
   * @param {Object} evt Click sent event.
   */
  function onClick (evt) {
    if (!on) {
      return;
    }
    
    if (typeof registeredInputListener == 'function') {
      registeredInputListener();
    }
    
    var totalListeners = clickListeners.length;
    var index;
    
    for (index = 0; index < totalListeners; index++) {
      clickListeners[ index ](evt);
    }
    
    firstEventPerformed = true;
  }
  
  /**
   * Enable the controls response.
   */
  self.set = function () {
    on = true;
  }
  
  /**
   * Disables the controls response.
   */
  self.unset = function () {
    on = false;
  }
  
  init();
}


SI.Gamepad = new function () {
  var self               = this;
  
  var trackTimer         = null;
  var trackTime          = 30;
  var index              = null;
  var buttonsLastState   = [];
  var buttonDownListener = null;
  var buttonUpListener   = null;
  var axisUpdateListener = null;
  
  /**
   * Returns the track timer.
   *
   * @return {number}
   */
  self.getTrackTimer = function () {
    return trackTimer;
  }
  
  /**
   * Returns the track time.
   *
   * @return {number}
   */
  self.getTrackTime = function () {
    return trackTime;
  }
  
  /**
   * Returns the gamepad index.
   *
   * @return {number}
   */
  self.getIndex = function () {
    return index;
  }
  
  /**
   * Tells whether browser supports the gamepad feature or not.
   *
   * @return {boolean}
   */
  self.isSupported = function () {
    return typeof navigator.getGamepads == 'function';
  }
  
  /**
   * Tells whether there's a connected gamepad or not.
   *
   * @return {boolean}
   */
  self.isConnected = function () {
    return index != null;
  }
  
  /**
   * Tells if there's no buttons state registered.
   *
   * @return {boolean}
   */
  self.noButtonsLastState = function () {
    return buttonsLastState.length == 0;
  }
  
  /**
   * Establishes the track time.
   *
   * @param {number} $trackTime Track time to set.
   */
  self.setTrackTime = function ($trackTime) {
    trackTime = $trackTime;
  }
  
  /**
   * Set the buttonDownListener.
   *
   * @param {function} $buttonDownListener buttonDownListener to set.
   */
  self.setButtonDownListener = function ($buttonDownListener) {
    buttonDownListener = $buttonDownListener;
  }
  
  /**
   * Set the buttonUpListener.
   *
   * @param {function} $buttonUpListener buttonUpListener to set.
   */
  self.setButtonUpListener = function ($buttonUpListener) {
    buttonUpListener = $buttonUpListener;
  }
  
  /**
   * Set the axisUpdateListener.
   *
   * @param {function} $axisUpdateListener axisUpdateListener to set.
   */
  self.setAxisUpdateListener = function ($axisUpdateListener) {
    axisUpdateListener = $axisUpdateListener;
  }
  
  /**
   * Starts the track timer and establishes all necessary events (if feature is supported).
   */
  self.enable = function () {
    if (!self.isSupported()) {
      return;
    }
    
    trackTimer = setInterval(SI.Gamepad.track, trackTime);
    window.addEventListener('gamepadconnected', onGamepadConnected, false);
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected, false);
  }
  
  /**
   * Stops the track timer and removes all events (if feature is supported).
   */
  self.disable = function () {
    if (!self.isSupported()) {
      return;
    }
    
    clearInterval(trackTimer);
    window.removeEventListener('gamepadconnected', onGamepadConnected, false);
    window.removeEventListener('gamepaddisconnected', onGamepadDisconnected, false);
  }
  
  /**
   * Tells whether provided buttons is being pressed or not.
   *
   * @param  {object} button GamepadButton object to check.
   *
   * @return {boolean}
   */
  self.isButtonPressed = function (button) {
    return (typeof button == 'object') ? button.pressed : button == 1.0 ;
  }
  
  /**
   * Called by looper timer in order to track gamepad's axes/buttons.
   */
  self.track = function () {
    if (!self.isConnected() || self.noButtonsLastState()) {
      return;
    }
    
    trackAxes();
    trackButtons();
  }
  
  /**
   * onGamepadConnected event.
   *
   * @param {object} evt Sent object event.
   */
  function onGamepadConnected (evt) {
    index = evt.gamepad.index;
    saveButtonsLastState();
  }
  
  /**
   * onGamepadDisconnected event.
   *
   * @param {object} evt Sent object event.
   */
  function onGamepadDisconnected (evt) {
    index            = null;
    buttonsLastState = [];
  }
  
  /**
   * Updates the last gamepad state.
   */
  function saveButtonsLastState () {
    if (!self.isConnected()) {
      return;
    }
    
    var gamepad = navigator.getGamepads()[ index ];
    var total   = gamepad.buttons.length;
    var i;
    
    for (i = 0; i < total; i++) {
      buttonsLastState[ i ] = {
        pressed : gamepad.buttons[ i ].pressed, 
        value   : gamepad.buttons[ i ].value
      };
    }
  }
  
  /**
   * Called by looper timer in order to track gamepad's axes.
   */
  function trackAxes () {
    var gamepad = navigator.getGamepads()[ index ];
    var total   = gamepad.axes.length;
    var i;
    
    for (i = 0; i < total; i++) {
      if (typeof axisUpdateListener == 'function') {
        axisUpdateListener(i, gamepad.axes[ i ]);
      }
    }
  }
  
  /**
   * Called by looper timer in order to track gamepad's buttons.
   */
  function trackButtons () {
    var gamepad = navigator.getGamepads()[ index ];
    var total   = gamepad.buttons.length;
    var i, pressed;
    
    for (i = 0; i < total; i++) {
      pressed = self.isButtonPressed(gamepad.buttons[ i ]);
      
      if (pressed != self.isButtonPressed(buttonsLastState[ i ])) {
        if (pressed) {
          if (typeof buttonDownListener == 'function') {
            buttonDownListener(i);
          }
        } else {
          if (typeof buttonUpListener == 'function') {
            buttonUpListener(i);
          }
        }
      }
    }
    
    saveButtonsLastState();
  }
}


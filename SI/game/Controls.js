SI.game.Controls = new function () {
  var self = this;
  
  /**
   * Prepares the Controls callbacks.
   */
  self.prepare = function () {
    SI.Controls.setRegisteredInputListener(onRegisteredInput);
  }
  
  /**
   * Registered input callback event.
   */
  function onRegisteredInput () {
    SI.Scene.setFullScreenOnFirstEvent();
  }
}


SI.game.target.Parachute = new function () {
  var self                = this;
  
  var instances           = [];
  var canvas              = null;
  var context             = null;
  var spriteSheet         = null;
  var spriteSheetInfo     = null;
  var spriteSheetHalfSize = 0;
  var spriteSheetMaxIndex = 0;
  
  /**
   * Parachute class itself.
   *
   * @param {Number} x Parachute x coordinate (not absolute).
   *
   * @param {Number} y Parachute y coordinate (same as absolute).
   *
   * @param {Number} dropSpeed Parachute's constant drop speed.
   */
  self.class = function (x, y, dropSpeed) {
    var $this                       = this;
    
    var spriteIndex                 = 0;
    var dropUpdateDelta             = 0;
    var horizontalSpeed             = 0;
    var horizontalSpeedProgression  = -1;
    var horizontalDisplacement      = 1;
    var horizontalDisplacementDelta = 0;
    var pinchUpdateDelta            = 0;
    var pinched                     = false;
    var translationListener         = null;
    var pinchListener               = null;
    
    /**
     * @constructs Initialise the configurated horizontalSpeed.
     */
    function __construct () {
      horizontalSpeed = SI.res.ResourceLoader.getResources().game.properties.ParachuteHorizontalSpeed;
    }
    
    /**
     * Returns the parachute's x coordinate.
     *
     * @return {Number}.
     */
    $this.getX = function () {
      return x;
    }
    
    /**
     * Returns the parachute's y coordinate.
     *
     * @return {Number}.
     */
    $this.getY = function () {
      return y;
    }
    
    /**
     * Returns the parachute's drop speed.
     *
     * @return {Number}.
     */
    $this.getDropSpeed = function () {
      return dropSpeed;
    }
    
    /**
     * Returns the parachute's current sprite index.
     *
     * @return {Number}.
     */
    $this.getSpriteIndex = function () {
      return spriteIndex;
    }
    
    /**
     * Returns the parachute's drop update delta.
     *
     * @return {Number}.
     */
    $this.getDropUpdateDelta = function () {
      return dropUpdateDelta;
    }
    
    /**
     * Returns the parachute's horizontal speed.
     *
     * @return {Number}.
     */
    $this.getHorizontalSpeed = function () {
      return horizontalSpeed;
    }
    
    /**
     * Returns the parachute's horizontal speed progression.
     *
     * @return {Number}.
     */
    $this.getHorizontalSpeedProgression = function () {
      return horizontalSpeedProgression;
    }
    
    /**
     * Returns the parachute's horizontal displacement.
     *
     * @return {Number}.
     */
    $this.getHorizontalDisplacement = function () {
      return horizontalDisplacement;
    }
    
    /**
     * Returns the parachute's horizontal displacement delta.
     *
     * @return {Number}.
     */
    $this.getHorizontalDisplacementDelta = function () {
      return horizontalDisplacementDelta;
    }
    
    /**
     * Returns the parachute's pinch update delta.
     *
     * @return {Number}.
     */
    $this.getPinchUpdateDelta = function () {
      return pinchUpdateDelta;
    }
    
    /**
     * Tells whether the parachute is pinched or not (only first time).
     *
     * @return {boolean}.
     */
    $this.isPinched = function () {
      return pinched;
    }
    
    /**
     * Returns the parachute's absolute x coordinate (starting from sprite).
     *
     * @return {Number}.
     */
    $this.getAbsoluteX = function () {
      return x - spriteSheetHalfSize;
    }
    
    /**
     * Returns the parachute's absolute y coordinate (starting from sprite).
     *
     * @return {Number}.
     */
    $this.getAbsoluteY = function () {
      return y;
    }
    
    /**
     * Set a translation listener to be called when parachute's direction vector is updated.
     *
     * @param {function} callback Translation listener callback.
     */
    $this.setTranslationListener = function (callback) {
      translationListener = callback;
    }
    
    /**
     * Set the pinch listener to be called when the parachute is pinched only the first time.
     *
     * @param {function} callback Pinch listener callback.
     */
    $this.setPinchListener = function (callback) {
      pinchListener = callback;
    }
    
    /**
     * Pinches the parachute on a specific local coordinate (considerating alpha trespassing) and tells if there 
     * was success or not.
     *
     * @param {Number} pinchedX global canvas x coordinate to pinch.
     *
     * @param {Number} pinchedY global canvas y coordinate to pinch.
     *
     * @return {boolean}.
     */
    $this.pinchAt = function (pinchedX, pinchedY) {
      if (!SI.checkObjectHit(pinchedX, pinchedY, $this.getAbsoluteX(), $this.getAbsoluteY(), spriteSheetInfo.size, spriteSheetInfo.spritesImagesDatas[ spriteIndex ])) {
        return false;
      }
      
      if (!pinched) {
        pinched = true;
        
        if (typeof pinchListener == 'function') {
          pinchListener();
        }
      } else {
        $this.finish();
      }
      
      SI.game.animation.Splash.createInCenteredCoords(pinchedX, pinchedY);
      
      return true;
    }
    
    /**
     * Removes the parachute's instance from stack.
     */
    $this.finish = function () {
      SI.safeObjectArrayLoop(instances, function (index, instance) {
        if (instance == $this) {
          instances.splice(index, 1);
          
          return false;
        }
        
        return true;
      });
    }
    
    /**
     * Render parachute's logic.
     */
    $this.renderLogic = function () {
      renderDropLogic();
      renderHorizontalDisplacementLogic();
      renderPinchLogic();
    }
    
    /**
     * Updates the drop logic (mostly updating y coordinate) and calling the finish method when it's no longer 
     * visible (it passes the canvas height).
     */
    function renderDropLogic () {
      dropUpdateDelta++;
      
      if (dropUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.ParachuteDropUpdateMaxDelta) {
        dropUpdateDelta = 0;
        
        y += dropSpeed;
        
        if (typeof translationListener == 'function') {
          translationListener();
        }
        
        if (y >= canvas.height) {
          $this.finish();
        }
      }
    }
    
    /**
     * Updates the parachute's x coordinate to simulate air friction/drag (it oscillates from left to right and 
     * vice-versa).
     */
    function renderHorizontalDisplacementLogic () {
      horizontalDisplacementDelta++;
      
      if (horizontalDisplacementDelta >= SI.res.ResourceLoader.getResources().game.properties.ParachuteHorizontalDisplacementMaxDelta) {
        horizontalDisplacementDelta = 0;
        
        horizontalSpeed += horizontalSpeedProgression;
        
        if (horizontalSpeed > SI.res.ResourceLoader.getResources().game.properties.ParachuteHorizontalSpeed) {
          horizontalSpeed = SI.res.ResourceLoader.getResources().game.properties.ParachuteHorizontalSpeed;
          horizontalSpeedProgression = -1;
        } else 
        if (horizontalSpeed < 1) {
          horizontalSpeed = 1;
          horizontalSpeedProgression = 1;
          horizontalDisplacement = (horizontalDisplacement == 1) ? -1 : 1 ;
        }
        
        x += horizontalSpeed * horizontalDisplacement;
        
        if (typeof translationListener == 'function') {
          translationListener();
        }
      }
    }
    
    /**
     * If the parachute was pinched for the first time, it updates the animation sprite if it didn't reach the 
     * maxIndex yet.
     */
    function renderPinchLogic () {
      pinchUpdateDelta++;
      
      if (pinchUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.ParachutePinchUpdateMaxDelta) {
        pinchUpdateDelta = 0;
        
        if (pinched && spriteIndex < spriteSheetMaxIndex) {
          spriteIndex++;
        }
      }
    }
    
    /**
     * Render the parachute's graphics.
     */
    $this.renderGraphics = function () {
      renderParachuteGraphics();
    }
    
    /**
     * Draws the parachute on it's current sprite index.
     */
    function renderParachuteGraphics () {
      context.drawImage(spriteSheet, spriteSheetInfo.framesCoords[ spriteIndex ], 0, spriteSheetInfo.size, spriteSheetInfo.size, $this.getAbsoluteX(), $this.getAbsoluteY(), spriteSheetInfo.size, spriteSheetInfo.size);
    }
    
    __construct();
  }
  
  /**
   * Returns the global sprite sheet half size.
   *
   * @return {Number}.
   */
  self.getSpriteSheetHalfSize = function () {
    return spriteSheetHalfSize;
  }
  
  /**
   * Returns the global sprite sheet max index.
   *
   * @return {Number}.
   */
  self.getSpriteSheetMaxIndex = function () {
    return spriteSheetMaxIndex;
  }
  
  /**
   * Set the global canvas to be used for each created instance.
   *
   * @param {Object} $canvas Canvas to set.
   */
  self.setCanvas = function ($canvas) {
    canvas = $canvas;
  }
  
  /**
   * Set the global 2d context to be used for each created instance.
   *
   * @param {Object} $context Context to set.
   */
  self.setContext = function ($context) {
    context = $context;
  }
  
  /**
   * Set the global sprite sheet to be used for each created instance.
   *
   * @param {Object} $spriteSheet Sprite sheet to set.
   */
  self.setSpriteSheet = function ($spriteSheet) {
    spriteSheetInfo = SI.Animation.getSpriteInfo($spriteSheet, true);
    spriteSheetHalfSize = Math.round(spriteSheetInfo.size / 2);
    spriteSheetMaxIndex = spriteSheetInfo.framesCoords.length - 1;
    spriteSheet = $spriteSheet;
  }
  
  /**
   * TODO: call this method before anything.
   *
   * @param {Object} $canvas Canvas to set.
   *
   * @param {Object} $context Context to set.
   *
   * @param {Object} $spriteSheet Sprite sheet to set.
   */
  self.init = function (canvas, context, spriteSheet) {
    self.setCanvas(canvas);
    self.setContext(context);
    self.setSpriteSheet(spriteSheet);
  }
  
  /**
   * Resets the update data for re-usage.
   */
  self.resetState = function () {
    instances = [];
  }
  
  /**
   * Set the controls listeners.
   */
  self.setControlsListeners = function () {
    
  }
  
  /**
   * Unset the controls listeners.
   */
  self.unsetControlsListeners = function () {
    
  }
  
  /**
   * Creates a new parachute instance and put it on the stack.
   *
   * @param {Number} x Parachute x coordinate (not absolute).
   *
   * @param {Number} y Parachute y coordinate (same as absolute).
   *
   * @param {Number} dropSpeed Parachute's constant drop speed.
   */
  self.create = function (x, y, dropSpeed) {
    var instance = new self.class(x, y, dropSpeed);
    instances.push(instance);
    
    return instance;
  }
  
  /**
   * Global method that checks if there's any parachute that could be pinched on the target position vector, if so 
   * the particular pinchAt method of the vulnerable target will be called passing the same coordinates. It tells 
   * whether there was a pinched parachute or not.
   *
   * @param {Number} x Target x coordinate.
   *
   * @param {Number} y Target y coordinate.
   *
   * @return {boolean}.
   */
  self.pinchAt = function (x, y) {
    var pinchedObject = false;
    
    SI.safeObjectArrayReverseLoop(instances, function (index, instance) {
      if (instance.pinchAt(x, y)) {
        pinchedObject = true;
        
        return false;
      }
      
      return true;
    });
    
    return pinchedObject;
  }
  
  /**
   * Global static method that render all the stacked instances logics.
   */
  self.renderLogic = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderLogic();
      
      return true;
    });
  }
  
  /**
   * Global static method that render all the stacked instances graphics.
   */
  self.renderGraphics = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderGraphics();
      
      return true;
    });
  }
}


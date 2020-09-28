SI.game.target.Enemy = new function () {
  var self                         = this;
  
  var instances                    = [];
  var canvas                       = null;
  var context                      = null;
  var spritesSheets                = [];
  var spritesSheetsAverageSize     = 0;
  var spritesSheetsAverageHalfSize = 0;
  var groundReachedListener        = null;
  var hitListener                  = null;
  
  /**
   * Enemy class itself.
   *
   * @param {Number} spriteSheetIndex Index that represents the sprite sheet to use.
   *
   * @param {Number} x Enemy's x coordinate (not absolute).
   *
   * @param {Number} y Enemy's y coordinate (same as absolute).
   *
   * @param {Number} dropSpeed Enemy's drop speed.
   */
  self.class = function (spriteSheetIndex, x, y, dropSpeed) {
    var $this             = this;
    
    var freeFallSpeed     = 0;
    var parachute         = null;
    var spriteIndex       = 0;
    var dropUpdateDelta   = 0;
    var spriteUpdateDelta = 0;
    
    /**
     * @constructs initialises the free fall speed based on the drop speed, creates the enemy's parachute and set 
     * the translation/pinch listeners.
     */
    function __construct () {
      freeFallSpeed = dropSpeed * SI.res.ResourceLoader.getResources().game.properties.EnemyFreeFallMultiplication;
      
      parachute = SI.game.target.Parachute.create(x, y, dropSpeed);
      x = parachute.getX();
      y = parachute.getY() + SI.game.target.Parachute.getSpriteSheetHalfSize();
      
      parachute.setTranslationListener(parachuteTranslationListener);
      parachute.setPinchListener(parachutePinchListener);
    }
    
    /**
     * Returns the enemy's sprite sheet index.
     *
     * @return {Number}.
     */
    $this.getSpriteSheetIndex = function () {
      return spriteSheetIndex;
    }
    
    /**
     * Returns the enemy's x coordinate (not absolute).
     *
     * @return {Number}.
     */
    $this.getX = function () {
      return x;
    }
    
    /**
     * Returns the enemy's y coordinate (same as absolute).
     *
     * @return {Number}.
     */
    $this.getY = function () {
      return y;
    }
    
    /**
     * Returns the enemy's drop speed.
     *
     * @return {Number}.
     */
    $this.getDropSpeed = function () {
      return dropSpeed;
    }
    
    /**
     * Returns the enemy's free fall speed.
     *
     * @return {Number}.
     */
    $this.getFreeFallSpeed = function () {
      return freeFallSpeed;
    }
    
    /**
     * Returns the enemy's current sprite index.
     *
     * @return {Number}.
     */
    $this.getSpriteIndex = function () {
      return spriteIndex;
    }
    
    /**
     * Returns the enemy's drop update delta.
     *
     * @return {Number}.
     */
    $this.getDropUpdateDelta = function () {
      return dropUpdateDelta;
    }
    
    /**
     * Returns the enemy's sprite update delta.
     *
     * @return {Number}.
     */
    $this.getSpriteUpdateDelta = function () {
      return spriteUpdateDelta;
    }
    
    /**
     * Returns the enemy's absolute x coordinate (starting from sprite).
     *
     * @return {Number}.
     */
    $this.getAbsoluteX = function () {
      return x - spritesSheets[ spriteSheetIndex ].halfSize;
    }
    
    /**
     * Returns the enemy's absolute y coordinate (same as non-absolute).
     *
     * @return {Number}.
     */
    $this.getAbsoluteY = function () {
      return y;
    }
    
    /**
     * Tells whether the enemy has a parachute or not.
     *
     * @return {boolean}.
     */
    $this.hasParachute = function () {
      return (parachute != null);
    }
    
    /**
     * Removes the parachute's callbacks and diposes of parachute (enemy is on free fall now).
     */
    $this.dropParachute = function () {
      if (!$this.hasParachute()) {
        return;
      }
      
      parachute.setTranslationListener(null);
      parachute.setPinchListener(null);
      parachute = null;
    }
    
    /**
     * Tells whether is the enemy is a vulnerable target on the specific coordinates.
     *
     * @param {Number} targetX Global canvas x coordinate to check.
     *
     * @param {Number} targetY Global canvas y coordinate to check.
     *
     * @return {boolean}.
     */
    $this.isVulnerableTarget = function (targetX, targetY) {
      return SI.checkObjectHit(targetX, targetY, $this.getAbsoluteX(), $this.getAbsoluteY(), spritesSheets[ spriteSheetIndex ].info.size, spritesSheets[ spriteSheetIndex ].info.spritesImagesDatas[ spriteIndex ]);
    }
    
    /**
     * If the enemy is a vulnerable target it proceeds to remove it from the stack and creates a splash animation. 
     * It also tells if the enemy was hit or not and calls the hitListener.
     *
     * @param {Number} penetrationX Global canvas x coordinate to penetrate.
     *
     * @param {Number} penetrationY Global canvas y coordinate to penetrate.
     *
     * @return {boolean}.
     */
    $this.penetrateAt = function (penetrationX, penetrationY) {
      if (!SI.checkObjectHit(penetrationX, penetrationY, $this.getAbsoluteX(), $this.getAbsoluteY(), spritesSheets[ spriteSheetIndex ].info.size, spritesSheets[ spriteSheetIndex ].info.spritesImagesDatas[ spriteIndex ])) {
        return false;
      }
      
      if ($this.hasParachute()) {
        parachute.finish();
      }
      
      $this.finish();
      
      if (typeof hitListener == 'function') {
        hitListener($this);
      }
      
      SI.game.animation.Splash.createInCenteredCoords(penetrationX, penetrationY);
      
      return true;
    }
    
    /**
     * Updates the local enemy coordinates based on the parachute (if it's not dropped).
     */
    function parachuteTranslationListener () {
      x = parachute.getX();
      y = parachute.getY() + SI.game.target.Parachute.getSpriteSheetHalfSize();
    }
    
    /**
     * Drops the parachute when it's pinched and starts the enemy's free fall.
     */
    function parachutePinchListener () {
      $this.dropParachute();
    }
    
    /**
     * Removes the enemy from the stack.
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
     * Render the enemy's logic.
     */
    $this.renderLogic = function () {
      renderDropUpdateLogic();
      renderFreeFallUpdateLogic();
    }
    
    /**
     * If the enemy is on free fall mode, then it proceeds to update the fall based on the freeFallSpeed. It also
     * calls the finish method when the enemy passes the canvas height, is no longer visible and finally calls the 
     * the groundReachedListener.
     */
    function renderDropUpdateLogic () {
      dropUpdateDelta++;
      
      if (dropUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.EnemyDropUpdateMaxDelta) {
        dropUpdateDelta = 0;
        
        if (!$this.hasParachute()) {
          y += freeFallSpeed;
        }
        
        if (y >= canvas.height) {
          $this.finish();
          
          if (typeof groundReachedListener == 'function') {
            groundReachedListener($this);
          }
        }
      }
    }
    
    /**
     * If the enemy is on free fall mode, the method focuses on update the animation sprite index.
     */
    function renderFreeFallUpdateLogic () {
      spriteUpdateDelta++;
      
      if (spriteUpdateDelta > SI.res.ResourceLoader.getResources().game.properties.EnemySpriteUpdateMaxDelta) {
        spriteUpdateDelta = 0;
        
        if (!$this.hasParachute()) {
          spriteIndex = (spriteIndex >= spritesSheets[ spriteSheetIndex ].maxIndex) ? 0 : spriteIndex + 1 ;
        }
      }
    }
    
    /**
     * Render the enemy's graphics.
     */
    $this.renderGraphics = function () {
      renderEnemyGraphics();
    }
    
    /**
     * Render the enemy graphics itself with its current sprite.
     */
    function renderEnemyGraphics () {
      context.drawImage(spritesSheets[ spriteSheetIndex ].spriteSheet, spritesSheets[ spriteSheetIndex ].info.framesCoords[ spriteIndex ], 0, spritesSheets[ spriteSheetIndex ].info.size, spritesSheets[ spriteSheetIndex ].info.size, $this.getAbsoluteX(), $this.getAbsoluteY(), spritesSheets[ spriteSheetIndex ].info.size, spritesSheets[ spriteSheetIndex ].info.size);
    }
    
    __construct();
  }
  
  /**
   * Returns the global sprites sheets average size.
   *
   * @return {Number}.
   */
  self.getSpritesSheetsAverageSize = function () {
    return spritesSheetsAverageSize;
  }
  
  /**
   * Returns the global sprites sheets average half size.
   *
   * @return {Number}.
   */
  self.getSpritesSheetsAverageHalfSize = function () {
    return spritesSheetsAverageHalfSize;
  }
  
  /**
   * Set the global canvas to be used by the created instances.
   *
   * @param {Object} $canvas Canvas to set.
   */
  self.setCanvas = function ($canvas) {
    canvas = $canvas;
  }
  
  /**
   * Set the global context to be used by the created instances.
   *
   * @param {Object} $context Context to set.
   */
  self.setContext = function ($context) {
    context = $context;
  }
  
  /**
   * Set the sprites sheets array.
   *
   * @param {Array} $spritesSheets Array with all the sprites sheets to be allocated in memory.
   */
  self.setSpritesSheets = function ($spritesSheets) {
    var sizeSum = 0;
    var total = $spritesSheets.length;
    var index, spriteSheetObject;
    
    spritesSheets = [];
    
    for (index = 0; index < total; index++) {
      spriteSheetObject = {};
      spriteSheetObject.info = SI.Animation.getSpriteInfo($spritesSheets[ index ], true);
      spriteSheetObject.halfSize = Math.round(spriteSheetObject.info.size / 2);
      spriteSheetObject.maxIndex = spriteSheetObject.info.framesCoords.length - 1;
      spriteSheetObject.spriteSheet = $spritesSheets[ index ];
      
      sizeSum += spriteSheetObject.info.size;
      spritesSheets.push(spriteSheetObject);
    }
    
    spritesSheetsAverageSize = Math.round(sizeSum / spritesSheets.length);
    spritesSheetsAverageHalfSize = Math.round(spritesSheetsAverageSize / 2);
  }
  
  /**
   * Set the global ground reached listener.
   *
   * @param {Object} callback Ground reached listener callback.
   */
  self.setGroundReachedListener = function (callback) {
    groundReachedListener = callback;
  }
  
  /**
   * Set the global hit listener.
   *
   * @param {Object} callback Hit listener callback.
   */
  self.setHitListener = function (callback) {
    hitListener = callback;
  }
  
  /**
   * Returns the count of stacked enemies.
   *
   * @return {Number}.
   */
  self.getCount = function () {
    return instances.length;
  }
  
  /**
   * TODO: call this method before anything.
   *
   * @param {Object} $canvas Canvas to set.
   *
   * @param {Object} $context Context to set.
   *
   * @param {Array} $spritesSheets Array with all the sprites sheets to be allocated in memory.
   */
  self.init = function (canvas, context, spritesSheets) {
    self.setCanvas(canvas);
    self.setContext(context);
    self.setSpritesSheets(spritesSheets);
  }
  
  /**
   * Resets the update data for re-usage.
   */
  self.resetState = function () {
    instances = [];
    groundReachedListener = null;
    hitListener = null;
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
   * Creates a new enemy instance and put on the stack.
   *
   * @param {Number} spriteSheetIndex Index that represents the sprite sheet to use.
   *
   * @param {Number} x Enemy's x coordinate (not absolute).
   *
   * @param {Number} y Enemy's y coordinate (same as absolute).
   *
   * @param {Number} dropSpeed Enemy's drop speed.
   */
  self.create = function (spriteSheetIndex, x, y, dropSpeed) {
    var instance = new self.class(spriteSheetIndex, x, y, dropSpeed);
    instances.push(instance);
    
    return instance;
  }
  
  /**
   * Creates an enemy with a random sprite index.
   *
   * @param {Number} x Enemy's x coordinate (not absolute).
   *
   * @param {Number} y Enemy's y coordinate (same as absolute).
   *
   * @param {Number} dropSpeed Enemy's drop speed.
   */
  self.spawnRandom = function (x, y, dropSpeed) {
    if (spritesSheets.length == 0) {
      return;
    }
    
    return self.create(Math.floor(Math.random() * spritesSheets.length), x, y, dropSpeed);
  }
  
  /**
   * Global static method that checks if there's a vulnerable target with the provided coordinates.
   *
   * @param {Number} x X coordinate to check.
   *
   * @param {Number} y Y coordinate to check.
   *
   * @return {boolean}.
   */
  self.isVulnerableTarget = function (x, y) {
    var vulnerableTarget = false;
    
    SI.safeObjectArrayReverseLoop(instances, function (index, instance) {
      if (instance.isVulnerableTarget(x, y)) {
        vulnerableTarget = true;
        
        return false;
      }
      
      return true;
    });
    
    return vulnerableTarget;
  }
  
  /**
   * Global method that checks if there's any enemy that could be penetrated on the target position vector, if so 
   * the particular penetrateAt method of the vulnerable target will be called passing the same coordinates. It
   * tells whether there was a penetrated enemy or not.
   *
   * @param {Number} x Target x coordinate.
   *
   * @param {Number} y Target y coordinate.
   *
   * @return {boolean}.
   */
  self.penetrateAt = function (x, y) {
    SI.safeObjectArrayReverseLoop(instances, function (index, instance) {
      if (instance.penetrateAt(x, y)) {
        return false;
      }
      
      return true;
    });
  }
  
  /**
   * Global static method that render all the enemies logic.
   */
  self.renderLogic = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderLogic();
      
      return true;
    });
  }
  
  /**
   * Global static method that render all the enemies graphics.
   */
  self.renderGraphics = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderGraphics();
      
      return true;
    });
  }
}


SI.Animation = new function () {
  var self           = this;
  
  self.REPEAT_ALWAYS = 0;
  
  var context        = null;
  var instances      = [];
  
  /**
   * Animation class itself.
   *
   * @param  {Object} spriteSheet          Animation sprite sheet.
   *
   * @param  {Number} x                    Animation x coordinate.
   *
   * @param  {Number} y                    Animation y coordinate.
   *
   * @param  {Number} spriteIndex          Sprite index where to start the animation.
   *
   * @param  {Number} spriteUpdateMaxDelta Animation speed itself.
   *
   * @param  {Number} repeat               Number of times to repeat the animation, use self.REPEAT_ALWAYS for 
   * infinity loop.
   *
   * @return {Object}.
   */
  self.class = function (spriteSheet, x, y, spriteIndex, spriteUpdateMaxDelta, repeat) {
    var $this             = this;
    
    var spriteInfo        = null;
    var lap               = 0;
    var spriteUpdateDelta = 0;
    
    /**
     * Extracts the sprite information.
     */
    function __construct () {
      spriteInfo = self.getSpriteInfo(spriteSheet);
    }
    
    /**
     * Returns the animation sprite sheet.
     *
     * @return {Object}.
     */
    $this.getSpriteSheet = function () {
      return spriteSheet;
    }
    
    /**
     * Returns the animation x coordinate.
     *
     * @return {Number}.
     */
    $this.getX = function () {
      return x;
    }
    
    /**
     * Returns the animation y coordinate.
     *
     * @return {Number}.
     */
    $this.getY = function () {
      return y;
    }
    
    /**
     * Returns the animation sprite index.
     *
     * @return {Number}.
     */
    $this.getSpriteIndex = function () {
      return spriteIndex;
    }
    
    /**
     * Returns the animation sprite update max delta.
     *
     * @return {Number}.
     */
    $this.getSpriteUpdateMaxDelta = function () {
      return spriteUpdateMaxDelta;
    }
    
    /**
     * Returns how many times the animation should repeat.
     *
     * @return {Number}.
     */
    $this.getRepeat = function () {
      return repeat;
    }
    
    /**
     * Returns the animation sprite info.
     *
     * @return {Object}.
     */
    $this.getSpriteInfo = function () {
      return spriteInfo;
    }
    
    /**
     * Returns the animation current lap.
     *
     * @return {Number}.
     */
    $this.getLap = function () {
      return lap;
    }
    
    /**
     * Returns the animation sprite update delta.
     *
     * @return {Number}.
     */
    $this.getSpriteUpdateDelta = function () {
      return spriteUpdateDelta;
    }
    
    /**
     * Render the animation logic.
     */
    $this.renderLogic = function () {
      renderSpriteLogic();
    }
    
    /**
     * Updates the animation sprite index.
     */
    function renderSpriteLogic () {
      spriteUpdateDelta++;
      
      if (spriteUpdateDelta >= spriteUpdateMaxDelta) {
        spriteUpdateDelta = 0;
        
        var nextSpriteIndex = spriteIndex + 1;
        
        if (nextSpriteIndex >= spriteInfo.totalFrames) {
          spriteIndex = 0;
          
          if (repeat != self.REPEAT_ALWAYS) {
            lap++;
            
            if (lap >= repeat) {
              $this.finish();
            }
          }
        } else {
          spriteIndex = nextSpriteIndex;
        }
      }
    }
    
    /**
     * Render the animation graphics.
     */
    $this.renderGraphics = function () {
      renderSpriteGraphics();
    }
    
    /**
     * Render the animation sprite graphics.
     */
    function renderSpriteGraphics () {
      context.drawImage(spriteSheet, spriteInfo.framesCoords[ spriteIndex ], 0, spriteInfo.size, spriteInfo.size, x, y, spriteInfo.size, spriteInfo.size);
    }
    
    /**
     * Removes the animation from the stack.
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
    
    __construct();
  }
  
  /**
   * Returns the used canvas 2d context.
   *
   * @return {Object}.
   */
  self.getContext = function () {
    return context;
  }
  
  /**
   * Returns an array with all the created instances.
   *
   * @return {Array}.
   */
  self.getInstances = function () {
    return instances;
  }
  
  /**
   * Set the used canvas 2d context.
   *
   * @param {Object} $context Context to render the animations graphics.
   */
  self.setContext = function ($context) {
    context = $context;
  }
  
  /**
   * MUST call this method before anything.
   *
   * @param {Object} context Canvas 2d context to use.
   */
  self.init = function (context) {
    self.setContext(context);
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
   * Creates a new animation instance.
   *
   * @param {Object} spriteSheet          Image with the animation sprite sheet.
   *
   * @param {Number} x                    Animation x coordinate.
   *
   * @param {Number} y                    Animation y coordinate.
   *
   * @param {Number} spriteIndex          Animation sprite index.
   *
   * @param {Number} spriteUpdateMaxDelta Sprite update max delta (speed).
   *
   * @param {Number} repeat               Number of times to loop the animation (use REPEAT_ALWAYS for infinity).
   *
   * @return {Object}.
   */
  self.create = function (spriteSheet, x, y, spriteIndex, spriteUpdateMaxDelta, repeat) {
    var instance = new self.class(spriteSheet, x, y, spriteIndex, spriteUpdateMaxDelta, repeat);
    instances.push(instance);
    
    return instance;
  }
  
  /**
   * Render all the created animations logics.
   */
  self.renderLogic = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderLogic();
      
      return true;
    });
  }
  
  /**
   * Render all the created animations graphics.
   */
  self.renderGraphics = function () {
    SI.safeObjectArrayLoop(instances, function (index, instance) {
      instance.renderGraphics();
      
      return true;
    });
  }
  
  /**
   * Returns an object with the sprite sheet size, total frames and frames coordinates.
   *
   * @param  {Object}  spriteSheet Sprite sheet image.
   *
   * @param  {boolean} loadSpritesImagesDatas If true then an image data buffer for each sprite will be loaded and 
   *                                          stacked on the spritesImagesDatas array property.
   *
   * @return {Object}.
   */
  self.getSpriteInfo = function (spriteSheet, loadSpritesImagesDatas) {
    if (typeof loadSpritesImagesDatas == 'undefined') {
      var loadSpritesImagesDatas = false;
    }
    
    var info = {};
    var index = 0;
    var x;
    
    info.size = spriteSheet.height;
    info.totalFrames = spriteSheet.width / spriteSheet.height;
    info.framesCoords = new Uint16Array(info.totalFrames);
    info.spritesImagesDatas = [];
    
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = info.size;
    tempCanvas.height = info.size;
    
    var tempContext = tempCanvas.getContext('2d');
    
    for (x = 0; x < spriteSheet.width; x += info.size) {
      info.framesCoords[ index ] = x;
      
      if (loadSpritesImagesDatas) {
        tempContext.drawImage(spriteSheet, x, 0, info.size, info.size, 0, 0, info.size, info.size);
        info.spritesImagesDatas.push(tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height));
      }
      
      index++;
    }
    
    return info;
  }
}


SI.game.Scenery = new function () {
  var self                 = this;
  
  var cloud1SpriteSheet     = null;
  var cloud2SpriteSheet     = null;
  var cloud3SpriteSheet     = null;
  var mountainsSpriteSheet  = null;
  var treesSpriteSheet      = null;
  var cloud1X               = 0;
  var cloud1Y               = 0;
  var cloud2X               = 0;
  var cloud2Y               = 0;
  var cloud3X               = 0;
  var cloud3Y               = 0;
  var skyColor              = '#ffffff';
  var mountainsSpriteX      = 0;
  var mountainsSpriteY      = 0;
  var treesY                = 0;
  var cloudsUpdateDelta     = 0;
  var dawnOrDusk            = false;
  var daylight              = true;
  var skyUpdateDelta        = 0;
  var toggleDaylightDelta   = 0;
  var explosions            = false;
  var destructionDelta      = 0;
  var updateRedFilterDelta  = 0;
  var redFilterLevel        = 0.0;
  var redFilterProgression  = 0.0;
  var bigExplosion          = false;
  var bigExplosionX         = 0;
  var bigExplosionY         = 0;
  var bigExplosionRadius    = 0;
  var bigExplosionDelta     = 0;
  var bigExplosionMaxWidth  = 0;
  var bigExplosionMaxHeight = 0;
  var doublePI              = 0;
  var explosionsAnimations  = [];
  var destructionListener   = null;
  
  /**
   * Returns the cloud 1 x coorditante.
   *
   * @return {Number}.
   */
  self.getCloud1X = function () {
    return cloud1X;
  }
  
  /**
   * Returns the cloud 1 y coorditante.
   *
   * @return {Number}.
   */
  self.getCloud1Y = function () {
    return cloud1Y;
  }
  
  /**
   * Returns the cloud 2 x coorditante.
   *
   * @return {Number}.
   */
  self.getCloud2X = function () {
    return cloud2X;
  }
  
  /**
   * Returns the cloud 2 y coorditante.
   *
   * @return {Number}.
   */
  self.getCloud2Y = function () {
    return cloud2Y;
  }
  
  /**
   * Returns the cloud 3 x coorditante.
   *
   * @return {Number}.
   */
  self.getCloud3X = function () {
    return cloud3X;
  }
  
  /**
   * Returns the cloud 3 y coorditante.
   *
   * @return {Number}.
   */
  self.getCloud3Y = function () {
    return cloud3Y;
  }
  
  /**
   * Returns the current color of the sky.
   *
   * @return {String}.
   */
  self.getSkyColor = function () {
    return skyColor;
  }
  
  /**
   * Returns the mountains sprite x coordinate.
   *
   * @return {Number}.
   */
  self.getMountainsSpriteX = function () {
    return mountainsSpriteX;
  }
  
  /**
   * Returns the mountains sprite y coordinate.
   *
   * @return {Number}.
   */
  self.getMountainsSpriteY = function () {
    return mountainsSpriteY;
  }
  
  /**
   * Returns the trees y coordinate.
   *
   * @return {Number}.
   */
  self.getTreesY = function () {
    return treesY;
  }
  
  /**
   * Returns the clouds update delta.
   *
   * @return {Number}.
   */
  self.getCloudsUpdateDelta = function () {
    return cloudsUpdateDelta;
  }
  
  /**
   * Tells if there's a dawn or dusk in process.
   *
   * @return {boolean}.
   */
  self.isDawnOrDusk = function () {
    return dawnOrDusk;
  }
  
  /**
   * Tells if it's daylight.
   *
   * @return {boolean}.
   */
  self.isDaylight = function () {
    return daylight;
  }
  
  /**
   * Returns the sky update delta.
   *
   * @return {Number}.
   */
  self.getSkyUpdateDelta = function () {
    return skyUpdateDelta;
  }
  
  /**
   * Returns the toggle daylight delta.
   *
   * @return {Number}.
   */
  self.getToggleDaylightDelta = function () {
    return toggleDaylightDelta;
  }
  
  /**
   * Tells whether the scenery is exploding or not.
   *
   * @return {boolean}.
   */
  self.isExploding = function () {
    return explosions;
  }
  
  /**
   * Returns the destruction delta.
   *
   * @return {Number}.
   */
  self.getDestructionDelta = function () {
    return destructionDelta;
  }
  
  /**
   * Returns the update red filter delta.
   *
   * @return {Number}.
   */
  self.getUpdateRedFilterDelta = function () {
    return updateRedFilterDelta;
  }
  
  /**
   * Returns the red filter level.
   *
   * @return {Number}.
   */
  self.getRedFilterLevel = function () {
    return redFilterLevel;
  }
  
  /**
   * Returns the red filter progression.
   *
   * @return {Number}.
   */
  self.getRedFilterProgression = function () {
    return redFilterProgression;
  }
  
  /**
   * Returns whether there's a big explosion in progress or not.
   *
   * @return {boolean}.
   */
  self.bigExplosionInProgress = function () {
    return bigExplosion;
  }
  
  /**
   * Returns the big explosion x coordinate.
   *
   * @return {Number}.
   */
  self.getBigExplosionX = function () {
    return bigExplosionX;
  }
  
  /**
   * Returns the big explosion y coordinate.
   *
   * @return {Number}.
   */
  self.getBigExplosionY = function () {
    return bigExplosionY;
  }
  
  /**
   * Returns the big explosion radius.
   *
   * @return {Number}.
   */
  self.getBigExplosionRadius = function () {
    return bigExplosionRadius;
  }
  
  /**
   * Returns the big explosion delta.
   *
   * @return {Number}.
   */
  self.getBigExplosionDelta = function () {
    return bigExplosionDelta;
  }
  
  /**
   * Returns the big explosion max width.
   *
   * @return {Number}.
   */
  self.getBigExplosionMaxWidth = function () {
    return bigExplosionMaxWidth;
  }
  
  /**
   * Returns the big explosion max height.
   *
   * @return {Number}.
   */
  self.getBigExplosionMaxHeight = function () {
    return bigExplosionMaxHeight;
  }
  
  /**
   * Returns Math.PI * 2.
   *
   * @return {Number}.
   */
  self.getdoublePI = function () {
    return doublePI;
  }
  
  /**
   * Computes and set the cloud 1 sprite sheet.
   *
   * @param {Object} $cloud1SpriteSheet Cloud 1 sprite sheet.
   */
  self.setCloud1SpriteSheet = function ($cloud1SpriteSheet) {
    cloud1X = SI.game.Renderer.getScene().getCenterXCoord($cloud1SpriteSheet.width);
    cloud1Y = 0;
    cloud1SpriteSheet = $cloud1SpriteSheet;
  }
  
  /**
   * Computes and set the cloud 2 sprite sheet.
   *
   * @param {Object} $cloud2SpriteSheet Cloud 2 sprite sheet.
   */
  self.setCloud2SpriteSheet = function ($cloud2SpriteSheet) {
    cloud2X = -Math.round($cloud2SpriteSheet.width / 2);
    cloud2Y = $cloud2SpriteSheet.height;
    cloud2SpriteSheet = $cloud2SpriteSheet;
  }
  
  /**
   * Computes and set the cloud 3 sprite sheet.
   *
   * @param {Object} $cloud3SpriteSheet Cloud 3 sprite sheet.
   */
  self.setCloud3SpriteSheet = function ($cloud3SpriteSheet) {
    cloud3X = SI.game.Renderer.getScene().getCanvas().width - Math.round($cloud3SpriteSheet.width / 2);
    cloud3Y = $cloud3SpriteSheet.height;
    cloud3SpriteSheet = $cloud3SpriteSheet;
  }
  
  /**
   * Computes and set the mountains sprite sheet.
   *
   * @param {Object} $mountainsSpriteSheet Mountains sprite sheet.
   */
  self.setMountainsSpriteSheet = function ($mountainsSpriteSheet) {
    mountainsSpriteX = SI.game.Renderer.getScene().getCenterXCoord($mountainsSpriteSheet.width);
    mountainsSpriteY = SI.game.Renderer.getScene().getCanvas().height - $mountainsSpriteSheet.height;
    mountainsSpriteSheet = $mountainsSpriteSheet;
  }
  
  /**
   * Computes and set the trees sprite sheet.
   *
   * @param {Object} $trees Trees sprite sheet.
   */
  self.setTreesSpriteSheet = function ($treesSpriteSheet) {
    treesY = SI.game.Renderer.getScene().getCanvas().height - $treesSpriteSheet.height;
    treesSpriteSheet = $treesSpriteSheet;
  }
  
  /**
   * Set an action to execute when destruction count reaches the configurated value.
   *
   * @param {Function} callback Callback function to set.
   */
  self.setDestructionListener = function (callback) {
    destructionListener = callback;
  }
  
  /**
   * Calculates the default coordinates and initialises the configurated values.
   *
   * @param {Object} cloud1SpriteSheet    Cloud 1 sprite sheet.
   *
   * @param {Object} cloud2SpriteSheet    Cloud 2 sprite sheet.
   *
   * @param {Object} cloud3SpriteSheet    Cloud 3 sprite sheet.
   *
   * @param {Object} mountainsSpriteSheet Mountains sprite sheet.
   *
   * @param {Object} treesSpriteSheet     Trees sprite sheet.
   */
  self.init = function (cloud1SpriteSheet, cloud2SpriteSheet, cloud3SpriteSheet, mountainsSpriteSheet, treesSpriteSheet) {
    self.setCloud1SpriteSheet(cloud1SpriteSheet);
    self.setCloud2SpriteSheet(cloud2SpriteSheet);
    self.setCloud3SpriteSheet(cloud3SpriteSheet);
    self.setMountainsSpriteSheet(mountainsSpriteSheet);
    self.setTreesSpriteSheet(treesSpriteSheet);
    
    skyColor = SI.res.ResourceLoader.getResources().game.properties.ScenerySkyDayColor;
    bigExplosionX = Math.round(SI.game.Renderer.getScene().getCanvas().width / 2);
    bigExplosionY = SI.game.Renderer.getScene().getCanvas().height;
    bigExplosionMaxWidth = SI.game.Renderer.getScene().getCanvas().width + SI.res.ResourceLoader.getResources().game.properties.SceneryBigExplosionHorizontalExtra;
    bigExplosionMaxHeight = SI.game.Renderer.getScene().getCanvas().height + SI.res.ResourceLoader.getResources().game.properties.SceneryBigExplosionVerticalExtra;
    doublePI = Math.PI * 2;
  }
  
  /**
   * Resets the update data for re-usage.
   */
  self.resetState = function () {
    skyColor = SI.res.ResourceLoader.getResources().game.properties.ScenerySkyDayColor;
    cloudsUpdateDelta = 0;
    dawnOrDusk = false;
    daylight = true;
    skyUpdateDelta = 0;
    toggleDaylightDelta = 0;
    destructionDelta = 0;
    updateRedFilterDelta = 0;
    redFilterLevel = 0.0;
    redFilterProgression = 0.0;
    bigExplosionRadius = 0;
    bigExplosionDelta = 0;
    destructionListener = null;
    
    self.stopExplosions();
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
   * Switch the daylight to dawn if there's no sunrise in progress.
   */
  self.dawn = function () {
    if (dawnOrDusk || daylight) {
      return;
    }
    
    dawnOrDusk = true;
    daylight = true;
    skyUpdateDelta = 0;
  }
  
  /**
   * Switch the daylight to dusk if there's no sunset in progress.
   */
  self.dusk = function () {
    if (dawnOrDusk || !daylight) {
      return;
    }
    
    dawnOrDusk = true;
    daylight = false;
    skyUpdateDelta = 0;
  }
  
  /**
   * Tends to bring dawn if there's no daylight and dusk otherwise.
   */
  self.toggleDaylight = function () {
    if (daylight) {
      self.dusk();
    } else {
      self.dawn();
    }
  }
  
  /**
   * Adds the red filter and creates the explosions animations.
   */
  self.startExplosions = function () {
    if (explosions) {
      return;
    }
    
    explosions = true;
    updateRedFilterDelta = 0;
    redFilterLevel = 0.0;
    redFilterProgression = SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterSpeed;
    destructionDelta = 1;
    bigExplosion = false;
    bigExplosionRadius = 0;
    
    var firstDelayedExplosion = true;
    var delayedExplosion = false;
    var explosionX, explosionY, explosionSpriteIndex;
    
    for (explosionY = 0; explosionY < SI.game.Renderer.getScene().getCanvas().height; explosionY += SI.game.animation.Explosion.getSpriteSheetHeight()) {
      delayedExplosion = firstDelayedExplosion = !firstDelayedExplosion;
      
      for (explosionX = 0; explosionX < SI.game.Renderer.getScene().getCanvas().width; explosionX += SI.game.animation.Explosion.getSpriteSheetHeight()) {
        explosionSpriteIndex = (delayedExplosion) ? 4 : 0 ;
        delayedExplosion = !delayedExplosion;
        explosionsAnimations.push(SI.game.animation.Explosion.create(explosionX, explosionY, explosionSpriteIndex));
      }
    }
  }
  
  /**
   * Removes the red filter and destroys all the explosions instances resetting the explosions array.
   */
  self.stopExplosions = function () {
    if (!explosions) {
      return;
    }
    
    explosions = false;
    bigExplosion = false;
    bigExplosionRadius = 0;
    
    var totalExplosions = explosionsAnimations.length;
    var index;
    
    for (index = 0; index < totalExplosions; index++) {
      explosionsAnimations[ index ].finish();
    }
    
    explosionsAnimations = [];
  }
  
  /**
   * Render scenery logic.
   */
  self.renderLogic = function () {
    renderCloudsLogic();
    renderSkyLogic();
    renderToggleDaylightLogic();
    renderRedFilterLogic();
    renderDestructionLogic();
    renderBigExplosionLogic();
  }
  
  /**
   * Moves the clouds horizontally to the right.
   */
  function renderCloudsLogic () {
    cloudsUpdateDelta++;
    
    if (cloudsUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.SceneryCloudsUpdateMaxDelta) {
      cloudsUpdateDelta = 0;
      
      cloud1X++;
      
      if (cloud1X > SI.game.Renderer.getScene().getCanvas().width) {
        cloud1X = -cloud1SpriteSheet.width;
      }
      
      cloud2X++;
      
      if (cloud2X > SI.game.Renderer.getScene().getCanvas().width) {
        cloud2X = -cloud2SpriteSheet.width;
      }
      
      cloud3X++;
      
      if (cloud3X > SI.game.Renderer.getScene().getCanvas().width) {
        cloud3X = -cloud3SpriteSheet.width;
      }
    }
  }
  
  /**
   * Computes the dawn/dusk color.
   */
  function renderSkyLogic () {
    if (dawnOrDusk) {
      skyUpdateDelta++;
      
      if (skyUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.ScenerySkyUpdateMaxDelta) {
        skyUpdateDelta = 0;
        
        var finalColor;
        
        if (daylight) {
          finalColor = SI.res.ResourceLoader.getResources().game.properties.ScenerySkyDayColor;
        } else {
          finalColor = SI.res.ResourceLoader.getResources().game.properties.ScenerySkyNightColor;
        }
        
        var red = parseInt(skyColor[1] + '' + skyColor[2], 16);
        var green = parseInt(skyColor[3] + '' + skyColor[4], 16);
        var blue = parseInt(skyColor[5] + '' + skyColor[6], 16);
        var finalColorRed = parseInt(finalColor[1] + '' + finalColor[2], 16);
        var finalColorGreen = parseInt(finalColor[3] + '' + finalColor[4], 16);
        var finalColorBlue = parseInt(finalColor[5] + '' + finalColor[6], 16);
        
        if (red < finalColorRed) {
          red++;
        } else 
        if (red > finalColorRed) {
          red--;
        }
        
        if (green < finalColorGreen) {
          green++;
        } else 
        if (green > finalColorGreen) {
          green--;
        }
        
        if (blue < finalColorBlue) {
          blue++;
        } else 
        if (blue > finalColorBlue) {
          blue--;
        }
        
        var redHex = red.toString(16);
        var greenHex = green.toString(16);
        var blueHex = blue.toString(16);
        
        if (red < 0x10) {
          redHex = '0' + redHex;
        }
        
        if (green < 0x10) {
          greenHex = '0' + greenHex;
        }
        
        if (blue < 0x10) {
          blueHex = '0' + blueHex;
        }
        
        skyColor = '#' + redHex + greenHex + blueHex;
        
        if (skyColor == finalColor) {
          dawnOrDusk = false;
        }
      }
    }
  }
  
  /**
   * Toggle the daylight in an interval of time.
   */
  function renderToggleDaylightLogic () {
    toggleDaylightDelta++;
    
    if (toggleDaylightDelta >= SI.res.ResourceLoader.getResources().game.properties.SceneryToggleDaylightMaxDelta) {
      toggleDaylightDelta = 0;
      self.toggleDaylight();
    }
  }
  
  /**
   * Render the red filter logic with it's current opacity.
   */
  function renderRedFilterLogic () {
    if (explosions) {
      updateRedFilterDelta++;
      
      if (updateRedFilterDelta >= SI.res.ResourceLoader.getResources().game.properties.SceneryUpdateRedFilterMaxDelta) {
        updateRedFilterDelta = 0;
        
        var filterLevel = redFilterLevel + redFilterProgression;
        
        if (filterLevel >= SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterMaxLevel) {
          filterLevel = SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterMaxLevel;
          redFilterProgression = -SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterSpeed;
        } else 
        if (filterLevel <= 0.0) {
          filterLevel = 0.0;
          redFilterProgression = SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterSpeed;
        }
        
        redFilterLevel = filterLevel;
      }
    }
  }
  
  /**
   * Counts the destruction delta to invoke the destruction listener when count reaches the configurated value.
   */
  function renderDestructionLogic () {
    if (destructionDelta < 1) {
      return;
    }
    
    destructionDelta++;
    
    if (destructionDelta >= SI.res.ResourceLoader.getResources().game.properties.SceneryDestructionMaxDelta) {
      destructionDelta = 0;
      bigExplosion = true;
    }
  }
  
  /**
   * Render the big explosion logic.
   */
  function renderBigExplosionLogic () {
    bigExplosionDelta++;
    
    if (bigExplosionDelta >= SI.res.ResourceLoader.getResources().game.properties.SceneryBigExplosionMaxDelta) {
      bigExplosionDelta = 0;
      
      if (!bigExplosion) {
        return;
      }
      
      bigExplosionRadius += SI.res.ResourceLoader.getResources().game.properties.SceneryBigExplosionSpeed;
      
      if (bigExplosionRadius >= bigExplosionMaxWidth && bigExplosionRadius >= bigExplosionMaxHeight) {
        bigExplosion = false;
        
        if (typeof destructionListener == 'function') {
          destructionListener();
        }
      }
    }
  }
  
  /**
   * Render the scenery graphics.
   */
  self.renderGraphics = function () {
    renderSkyGraphics();
    renderMountainsGraphics();
    renderCloud1Graphics();
    renderCloud2Graphics();
    renderCloud3Graphics();
    renderTreesGraphics();
    renderRedFilterGraphics();
    renderBigExplosionGraphics();
  }
  
  /**
   * Render the cloud 1 graphics.
   */
  function renderCloud1Graphics () {
    SI.game.Renderer.getScene().getContext().drawImage(cloud1SpriteSheet, cloud1X, cloud1Y);
  }
  
  /**
   * Render the cloud 2 graphics.
   */
  function renderCloud2Graphics () {
    SI.game.Renderer.getScene().getContext().drawImage(cloud2SpriteSheet, cloud2X, cloud2Y);
  }
  
  /**
   * Render the cloud 3 graphics.
   */
  function renderCloud3Graphics () {
    SI.game.Renderer.getScene().getContext().drawImage(cloud3SpriteSheet, cloud3X, cloud3Y);
  }
  
  /**
   * Render the sky graphics.
   */
  function renderSkyGraphics () {
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().fillStyle = skyColor;
    SI.game.Renderer.getScene().getContext().fillRect(0, 0, SI.game.Renderer.getScene().getCanvas().width, SI.game.Renderer.getScene().getCanvas().height);
    
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the mountains graphics.
   */
  function renderMountainsGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(mountainsSpriteSheet, mountainsSpriteX, mountainsSpriteY);
  }
  
  /**
   * Render the trees graphics.
   */
  function renderTreesGraphics () {
    var sceneWidth = SI.game.Renderer.getScene().getWidth();
    var treeWidth = treesSpriteSheet.width;
    var treeX;
    
    for (treeX = 0; treeX <= sceneWidth; treeX += treeWidth) {
      SI.game.Renderer.getScene().getContext().drawImage(treesSpriteSheet, treeX, treesY);
    }
  }
  
  /**
   * Render the red filter graphics.
   */
  function renderRedFilterGraphics () {
    if (!explosions) {
      return;
    }
    
    var originalGlobalAlpha = SI.game.Renderer.getScene().getContext().globalAlpha;
    
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.SceneryRedFilterColor;
    SI.game.Renderer.getScene().getContext().globalAlpha = redFilterLevel;
    SI.game.Renderer.getScene().getContext().fillRect(0, 0, SI.game.Renderer.getScene().getCanvas().width, SI.game.Renderer.getScene().getCanvas().height);
    
    SI.game.Renderer.getScene().getContext().globalAlpha = originalGlobalAlpha;
  }
  
  /**
   * Render the big explosion graphics.
   */
  function renderBigExplosionGraphics () {
    if (bigExplosionRadius < 1) {
      return;
    }
    
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().beginPath();
    SI.game.Renderer.getScene().getContext().arc(bigExplosionX, bigExplosionY, bigExplosionRadius, 0, doublePI, false);
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.SceneryBigExplosionColor;
    SI.game.Renderer.getScene().getContext().fill();
    
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
}


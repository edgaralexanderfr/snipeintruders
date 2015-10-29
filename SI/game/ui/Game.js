SI.game.ui.Game = new function () {
  var self                 = this;
  
  var displayed            = false;
  var spawnY               = 0;
  var spawnEnemiesMaxDelta = 0;
  var spawnEnemiesDelta    = 0;
  var enemiesDropSpeed     = 0;
  var pauseMessageX        = 0;
  var pauseMessageY        = 0;
  
  /**
   * Tells whether the interface is displayed or not.
   *
   * @return {boolean}.
   */
  self.isDisplayed = function () {
    return displayed;
  }
  
  /**
   * Returns the enemies spawn y.
   *
   * @return {Number}.
   */
  self.getSpawnY = function () {
    return spawnY;
  }
  
  /**
   * Returns the spawn enemies max delta.
   *
   * @return {Number}.
   */
  self.getSpawnEnemiesMaxDelta = function () {
    return spawnEnemiesMaxDelta;
  }
  
  /**
   * Returns the spawn enemies delta.
   *
   * @return {Number}.
   */
  self.getSpawnEnemiesDelta = function () {
    return spawnEnemiesDelta;
  }
  
  /**
   * Returns the enemies drop speed.
   *
   * @return {Number}.
   */
  self.getEnemiesDropSpeed = function () {
    return enemiesDropSpeed;
  }
  
  /**
   * Returns the pause message x coordinate.
   *
   * @return {Number}.
   */
  self.getPauseMessageX = function () {
    return pauseMessageX;
  }
  
  /**
   * Returns the pause message y coordinate.
   *
   * @return {Number}.
   */
  self.getPauseMessageY = function () {
    return pauseMessageY;
  }
  
  /**
   * TODO: call this method before anything. It initialises the spawnY value and computes the pause message 
   * properties.
   */
  self.init = function () {
    spawnY = -SI.game.target.Enemy.getSpritesSheetsAverageSize() * 2;
    computePauseMessageProperties();
  }
  
  /**
   * Resets the interface state.
   */
  function resetState () {
    spawnEnemiesMaxDelta = SI.res.ResourceLoader.getResources().game.properties.GameSpawnEnemiesInitialDelta;
    spawnEnemiesDelta = 0;
    enemiesDropSpeed = SI.res.ResourceLoader.getResources().game.properties.GameEnemiesInitialDropSpeed;
    
    SI.game.Scenery.resetState();
    SI.game.target.Parachute.resetState();
    SI.game.target.Enemy.resetState();
    SI.Animation.resetState();
    SI.game.HUD.resetState();
  }
  
  /**
   * Set the interface controls listeners.
   */
  function setControlsListeners () {
    SI.game.Scenery.setControlsListeners();
    SI.game.target.Parachute.setControlsListeners();
    SI.game.target.Enemy.setControlsListeners();
    SI.Animation.setControlsListeners();
    SI.game.HUD.setControlsListeners();
    
    SI.Controls.setKeyUpAction(
      SI.res.ResourceLoader.getResources().game.properties.GamePauseKeyCode, 
      pauseControlListener
    );
  }
  
  /**
   * Unset the interface controls listeners.
   */
  function unsetControlsListeners () {
    SI.game.Scenery.unsetControlsListeners();
    SI.game.target.Parachute.unsetControlsListeners();
    SI.game.target.Enemy.unsetControlsListeners();
    SI.Animation.unsetControlsListeners();
    SI.game.HUD.unsetControlsListeners();
    
    SI.Controls.setKeyUpAction(SI.res.ResourceLoader.getResources().game.properties.GamePauseKeyCode, null);
  }
  
  /**
   * Displays the interface.
   */
  self.display = function () {
    if (displayed) {
      return;
    }
    
    displayed = true;
    
    resetState();
    setControlsListeners();
    
    SI.game.Scenery.setDestructionListener(destructionListener);
    SI.game.target.Enemy.setGroundReachedListener(groundReachedListener);
    SI.game.target.Enemy.setHitListener(hitListener);
    SI.game.HUD.setEmptyLifeListener(emptyLifeListener);
    SI.Renderer.render();
    
    spawnRandomEnemy();
  }
  
  /**
   * Spawn a random enemy in a random location if scenery is not exploding. it also respects the max number of 
   * enemies that the game can hold.
   */
  function spawnRandomEnemy () {
    if (SI.game.target.Enemy.getCount() >= SI.res.ResourceLoader.getResources().game.properties.GameMaxEnemies) {
      return;
    }
    
    var min = SI.game.target.Enemy.getSpritesSheetsAverageSize();
    var max = SI.game.Renderer.getScene().getCanvas().width - min;
    var x = Math.round(Math.random() * (max - min) + min);
    var y = spawnY;
    
    SI.game.target.Enemy.spawnRandom(x, y, enemiesDropSpeed);
  }
  
  /**
   * Pauses the game if it's running, removing the HUD controls listeners, stopping the renderer and rendering the 
   * pause graphics, if it's not running, then it renders the game and set the HUD controls listeners again.
   */
  function pause () {
    if (SI.Renderer.isRendering()) {
      SI.game.HUD.unsetControlsListeners();
      SI.Renderer.stopRendering();
      renderPauseGraphics();
    } else {
      SI.Renderer.render();
      SI.game.HUD.setControlsListeners();
    }
  }
  
  /**
   * Pre-computes the pause message coordinates.
   */
  function computePauseMessageProperties () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageFont;
    
    var pauseMessageWidth = 
      SI.game.Renderer.getScene().getContext().measureText(
        SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageText
      ).width;
    
    var pauseMessageHeight = 
      parseInt(SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageFont);
    
    pauseMessageX = SI.game.Renderer.getScene().getCenterXCoord(pauseMessageWidth);
    pauseMessageY = SI.game.Renderer.getScene().getCenterYCoord(pauseMessageHeight);
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
  }
  
  /**
   * Closes the interface.
   */
  self.close = function () {
    if (!displayed) {
      return;
    }
    
    displayed = false;
    
    resetState();
    unsetControlsListeners();
  }
  
  /**
   * Scenery destruction listener to be called when game is over.
   */
  function destructionListener () {
    var score = SI.game.HUD.getFinalScore();
    self.close();
    SI.game.ui.Credits.display(score);
  }
  
  /**
   * Pause control listener to invoke when user press the pause key.
   *
   * @param {Object} evt keyUp sent event.
   */
  function pauseControlListener (evt) {
    pause();
  }
  
  /**
   * Sums a specific score when enemy reaches the ground on free fall, and subtracts life it arrived with a 
   * parachute.
   *
   * @param {Object} enemy Enemy that arrived to the ground.
   */
  function groundReachedListener (enemy) {
    if (enemy.hasParachute()) {
      SI.game.HUD.subtractLife(SI.res.ResourceLoader.getResources().game.properties.GameLifeSubtractionDifferenceProportion);
    } else {
      enemiesDropSpeed += SI.res.ResourceLoader.getResources().game.properties.GameEnemiesDropSpeedDifference;
      
      var nextSpawnEnemiesDelta = spawnEnemiesDelta - SI.res.ResourceLoader.getResources().game.properties.GameSpawnEnemiesDeltaDifference;
      
      if (nextSpawnEnemiesDelta < 1) {
        nextSpawnEnemiesDelta = 1;
      }
      
      spawnEnemiesDelta = nextSpawnEnemiesDelta;
      
      SI.game.HUD.sumScore(SI.res.ResourceLoader.getResources().game.properties.GameScoreSumFallDifference);
      SI.game.HUD.sumLife(SI.res.ResourceLoader.getResources().game.properties.GameLifeSumDifferenceProportion);
    }
  }
  
  /**
   * Sums an specific score/life and makes the game harder by decreasing the spawn delta and increasing the 
   * enemies speed.
   */
  function hitListener (enemy) {
    enemiesDropSpeed += SI.res.ResourceLoader.getResources().game.properties.GameEnemiesDropSpeedDifference;
    
    var nextSpawnEnemiesMaxDelta = spawnEnemiesMaxDelta - SI.res.ResourceLoader.getResources().game.properties.GameSpawnEnemiesDeltaDifference;
    
    if (nextSpawnEnemiesMaxDelta < 1) {
      nextSpawnEnemiesMaxDelta = 1;
    }
    
    spawnEnemiesMaxDelta = nextSpawnEnemiesMaxDelta;
    
    SI.game.HUD.sumScore(SI.res.ResourceLoader.getResources().game.properties.GameScoreSumHitDifference);
    SI.game.HUD.sumLife(SI.res.ResourceLoader.getResources().game.properties.GameLifeSumDifferenceProportion);
  }
  
  /**
   * Empty life listener to be called when HUD's life reaches zero, in this case, starts the scenery explosions 
   * (game over).
   */
  function emptyLifeListener () {
    SI.game.Scenery.startExplosions();
  }
  
  /**
   * Render interface logic.
   */
  self.renderLogic = function () {
    SI.game.Scenery.renderLogic();
    SI.game.target.Parachute.renderLogic();
    SI.game.target.Enemy.renderLogic();
    SI.Animation.renderLogic();
    SI.game.HUD.renderLogic();
    
    renderSpawnEnemiesLogic();
  }
  
  /**
   * Spawn a new random enemy in a random location if scenery is not exploding.
   */
  function renderSpawnEnemiesLogic () {
    spawnEnemiesDelta++;
    
    if (spawnEnemiesDelta >= spawnEnemiesMaxDelta) {
      spawnEnemiesDelta = 0;
      
      if (!SI.game.Scenery.isExploding()) {
        spawnRandomEnemy();
      }
    }
  }
  
  /**
   * Render interface graphics.
   */
  self.renderGraphics = function () {
    SI.Renderer.clearFrame(SI.game.Renderer.getScene().getContext(), SI.game.Renderer.getScene().getCanvas());
    SI.game.Scenery.renderGraphics();
    SI.game.target.Parachute.renderGraphics();
    SI.game.target.Enemy.renderGraphics();
    SI.Animation.renderGraphics();
    SI.game.HUD.renderGraphics();
  }
  
  /**
   * Render the pause message and it's background graphics.
   */
  function renderPauseGraphics () {
    var originalGlobalAlpha = SI.game.Renderer.getScene().getContext().globalAlpha;
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().globalAlpha = 
      SI.res.ResourceLoader.getResources().game.properties.GamePauseBackgroundOpacity;
    
    SI.game.Renderer.getScene().getContext().fillStyle = 
      SI.res.ResourceLoader.getResources().game.properties.GamePauseBackgroundColor;
    
    SI.game.Renderer.getScene().getContext().fillRect(0, 0, SI.game.Renderer.getScene().getCanvas().width, SI.game.Renderer.getScene().getCanvas().height);
    
    SI.game.Renderer.getScene().getContext().globalAlpha = originalGlobalAlpha;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageFont;
    
    SI.game.Renderer.getScene().getContext().fillStyle = 
      SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageColor;
    
    SI.game.Renderer.getScene().getContext().fillText(SI.res.ResourceLoader.getResources().game.properties.GamePauseMessageText, pauseMessageX, pauseMessageY);
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
}


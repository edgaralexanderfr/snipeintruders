SI.game.HUD = new function () {
  var self                       = this;
  
  var lifeBarSpriteSheet         = null;
  var crosshairSpriteSheet       = null;
  var lifeBarSpriteInfo          = null;
  var crosshairSpriteInfo        = null;
  var lifeBarY                   = 0;
  var lifeBarLeftX               = 0;
  var lifeBarCenterX             = 0;
  var lifeBarCenterWidth         = 0;
  var lifeBarRightX              = 0;
  var lifeStartX                 = 0;
  var lifeTotalWidth             = 0;
  var lifeWidth                  = 0;
  var lifeFinalWidth             = 0;
  var lifeUpdateDelta            = 0;
  var life                       = 0;
  var score                      = 0;
  var finalScore                 = 0;
  var scoreUpdateDelta           = 0;
  var scoreColor                 = '#000000';
  var scoreBlinkDelta            = 0;
  var scoreDifference            = 0;
  var scoreDifferenceY           = 0;
  var scoreDifferenceOpacity     = 0.0;
  var scoreDifferenceUpdateDelta = 0;
  var scoreDifferenceColor       = '#000000';
  var crosshairSpriteHalfSize    = 0;
  var crosshairSpriteIndex       = 0;
  var crosshairX                 = 0;
  var crosshairY                 = 0;
  var crosshairPrecisionDelta    = 0;
  var crosshairFinalX            = 0;
  var crosshairFinalY            = 0;
  var shotXCenterDifference      = 0;
  var shotYCenterDifference      = 0;
  var vulnerableTargetCheckDelta = 0;
  var emptyLifeListener          = null;
  
  /**
   * Returns the life bar y coordinate.
   *
   * @return {Number}.
   */
  self.getLifeBarY = function () {
    return lifeBarY;
  }
  
  /**
   * Returns the life bar left x coordinate.
   *
   * @return {Number}.
   */
  self.getLifeBarLeftX = function () {
    return lifeBarLeftX;
  }
  
  /**
   * Returns the life bar center x coordinate.
   *
   * @return {Number}.
   */
  self.getLifeBarCenterX = function () {
    return lifeBarCenterX;
  }
  
  /**
   * Returns the life bar center width.
   *
   * @return {Number}.
   */
  self.getLifeBarCenterWidth = function () {
    return lifeBarCenterWidth;
  }
  
  /**
   * Returns the life bar right x coordinate.
   *
   * @return {Number}.
   */
  self.getLifeBarRightX = function () {
    return lifeBarRightX;
  }
  
  /**
   * Returns the life start x coordinate.
   *
   * @return {Number}.
   */
  self.getLifeStartX = function () {
    return lifeStartX;
  }
  
  /**
   * Returns the life total width.
   *
   * @return {Number}.
   */
  self.getLifeTotalWidth = function () {
    return lifeTotalWidth;
  }
  
  /**
   * Returns the life width.
   *
   * @return {Number}.
   */
  self.getLifeWidth = function () {
    return lifeWidth;
  }
  
  /**
   * Returns the life final width.
   *
   * @return {Number}.
   */
  self.getLifeFinalWidth = function () {
    return lifeFinalWidth;
  }
  
  /**
   * Returns the current life update delta.
   *
   * @return {Number}.
   */
  self.getLifeUpdateDelta = function () {
    return lifeUpdateDelta;
  }
  
  /**
   * Returns the life in percentage.
   *
   * @return {Number}.
   */
  self.getLife = function () {
    return life;
  }
  
  /**
   * Returns the score.
   *
   * @return {Number}.
   */
  self.getScore = function () {
    return score;
  }
  
  /**
   * Returns the ultimate reached score.
   *
   * @return {Number}.
   */
  self.getFinalScore = function () {
    return finalScore;
  }
  
  /**
   * Returns the current score update delta.
   *
   * @return {Number}.
   */
  self.getScoreUpdateDelta = function () {
    return scoreUpdateDelta;
  }
  
  /**
   * Returns the current score color.
   *
   * @return {String}.
   */
  self.getScoreColor = function () {
    return scoreColor;
  }
  
  /**
   * Returns the current score blink delta.
   *
   * @return {Number}.
   */
  self.getScoreBlinkDelta = function () {
    return scoreBlinkDelta;
  }
  
  /**
   * Returns the last added/subtracted score.
   *
   * @return {Number}.
   */
  self.getScoreDifference = function () {
    return scoreDifference;
  }
  
  /**
   * Returns the score difference y coordinate.
   *
   * @return {Number}.
   */
  self.getScoreDifferenceY = function () {
    return scoreDifferenceY;
  }
  
  /**
   * Returns the score difference opacity.
   *
   * @return {Number}.
   */
  self.getScoreDifferenceOpacity = function () {
    return scoreDifferenceOpacity;
  }
  
  /**
   * Returns the current score difference update delta.
   *
   * @return {Number}.
   */
  self.getScoreDifferenceUpdateDelta = function () {
    return scoreDifferenceUpdateDelta;
  }
  
  /**
   * Returns the score difference color of the last added/subtracted value.
   *
   * @return {String}.
   */
  self.getScoreDifferenceColor = function () {
    return scoreDifferenceColor;
  }
  
  /**
   * Returns the crosshair sprite half size.
   *
   * @return {Number}.
   */
  self.getCrosshairSpriteHalfSize = function () {
    return crosshairSpriteHalfSize;
  }
  
  /**
   * Returns the current crosshair sprite index.
   *
   * @return {Number}.
   */
  self.getCrosshairSpriteIndex = function () {
    return crosshairSpriteIndex;
  }
  
  /**
   * Returns the crosshair x coordinate.
   *
   * @return {Number}.
   */
  self.getCrosshairX = function () {
    return crosshairX;
  }
  
  /**
   * Returns the crosshair y coordinate.
   *
   * @return {Number}.
   */
  self.getCrosshairY = function () {
    return crosshairY;
  }
  
  /**
   * Returns the current crosshair precision delta.
   *
   * @return {Number}.
   */
  self.getCrosshairPrecisionDelta = function () {
    return crosshairPrecisionDelta;
  }
  
  /**
   * Returns the crosshair final x coordinate.
   *
   * @return {Number}.
   */
  self.getCrosshairFinalX = function () {
    return crosshairFinalX;
  }
  
  /**
   * Returns the crosshair final y coordinate.
   *
   * @return {Number}.
   */
  self.getCrosshairFinalY = function () {
    return crosshairFinalY;
  }
  
  /**
   * Returns the shot x center difference.
   *
   * @return {Number}.
   */
  self.getShotXCenterDifference = function () {
    return shotXCenterDifference;
  }
  
  /**
   * Returns the shot y center difference.
   *
   * @return {Number}.
   */
  self.getShotYCenterDifference = function () {
    return shotYCenterDifference;
  }
  
  /**
   * Returns the vulnerable target check delta.
   *
   * @return {Number}.
   */
  self.getVulnerableTargetCheckDelta = function () {
    return vulnerableTargetCheckDelta;
  }
  
  /**
   * Set the life bar sprite sheet value.
   *
   * @param {Object} $lifeBarSpriteSheet Life bar sprite sheet.
   */
  self.setLifeBarSpriteSheet = function ($lifeBarSpriteSheet) {
    lifeBarSpriteInfo = SI.Animation.getSpriteInfo($lifeBarSpriteSheet);
    lifeBarY = SI.game.Renderer.getScene().getCanvas().height - lifeBarSpriteInfo.size * 2;
    lifeBarLeftX = lifeBarSpriteInfo.size;
    lifeBarCenterX = lifeBarLeftX + lifeBarSpriteInfo.size;
    lifeBarRightX = SI.game.Renderer.getScene().getCanvas().width - lifeBarSpriteInfo.size * 2;
    lifeBarCenterWidth = lifeBarRightX - lifeBarCenterX;
    lifeStartX = lifeBarLeftX + SI.res.ResourceLoader.getResources().game.properties.HUDLifeHorizontalOffset;
    lifeTotalWidth = (lifeBarRightX + (lifeBarSpriteInfo.size - SI.res.ResourceLoader.getResources().game.properties.HUDLifeHorizontalOffset)) - lifeStartX;
    
    lifeBarSpriteSheet = $lifeBarSpriteSheet;
  }
  
  /**
   * Set the crosshair sprite sheet value.
   *
   * @param {Object} $crosshairSpriteSheet Crosshair sprite sheet.
   */
  self.setCrosshairSpriteSheet = function ($crosshairSpriteSheet) {
    crosshairSpriteInfo = SI.Animation.getSpriteInfo($crosshairSpriteSheet);
    crosshairSpriteHalfSize = Math.round(crosshairSpriteInfo.size / 2);
    shotXCenterDifference = Math.round(($crosshairSpriteSheet.width - SI.game.animation.Shot.getSpriteSheetWidth()) / 2);
    shotYCenterDifference = Math.round(($crosshairSpriteSheet.height - SI.game.animation.Shot.getSpriteSheetHeight()) / 2);
    
    crosshairSpriteSheet = $crosshairSpriteSheet;
  }
  
  /**
   * Set the life's value.
   *
   * @param {Number} $life Life (in percentage) to set.
   */
  self.setLife = function ($life) {
    if (isNaN($life) || $life < 0 || $life > 100) {
      throw new Error('Invalid life.');
    }
    
    life = $life;
    lifeFinalWidth = Math.round((life * lifeTotalWidth) / 100);
    
    if (life == 0 && lifeWidth == 0 && typeof emptyLifeListener == 'function') {
      emptyLifeListener();
    }
  }
  
  /**
   * Set the score's value.
   *
   * @param {Number} $score Score to set.
   */
  self.setScore = function ($score) {
    if (isNaN($score) || $score < 0) {
      throw new Error('Invalid score.');
    }
    
    finalScore = $score;
  }
  
  /**
   * Set the score difference value.
   *
   * @param {Number} $scoreDifference score difference to set.
   */
  self.setScoreDifference = function ($scoreDifference) {
    if (isNaN($scoreDifference)) {
      throw new Error('Invalid score difference.');
    }
    
    scoreDifference = Math.abs($scoreDifference);
    scoreDifferenceY = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceStartY;
    scoreDifferenceOpacity = 0.1;
    scoreDifferenceUpdateDelta = 0;
    scoreDifferenceColor = ($scoreDifference < 1) ? SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceNegativeColor : SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferencePositiveColor ;
  }
  
  /**
   * Set an empty life listener.
   *
   * @param {Function} callback Callback function to execute when life reaches 0.
   */
  self.setEmptyLifeListener = function (callback) {
    emptyLifeListener = callback;
  }
  
  /**
   * MUST call this method before anything.
   *
   * @param {Object} lifeBarSpriteSheet   Life bar sprite sheet.
   *
   * @param {Object} crosshairSpriteSheet Crosshair sprite sheet.
   */
  self.init = function (lifeBarSpriteSheet, crosshairSpriteSheet) {
    self.setLifeBarSpriteSheet(lifeBarSpriteSheet);
    self.setCrosshairSpriteSheet(crosshairSpriteSheet);
    
    scoreColor = SI.res.ResourceLoader.getResources().game.properties.HUDScoreColor;
    scoreDifferenceY = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceEndY;
    scoreDifferenceColor = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferencePositiveColor;
    crosshairSpriteIndex = SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairNormal;
    crosshairX = SI.game.Renderer.getScene().getMouseX() - crosshairSpriteHalfSize;
    crosshairY = SI.game.Renderer.getScene().getMouseY() - crosshairSpriteHalfSize;
  }
  
  /**
   * Resets the update data for re-usage.
   */
  self.resetState = function () {
    lifeWidth = 0;
    lifeFinalWidth = 0;
    lifeUpdateDelta = 0;
    life = 0;
    score = 0;
    finalScore = 0;
    scoreUpdateDelta = 0;
    scoreColor = SI.res.ResourceLoader.getResources().game.properties.HUDScoreColor;
    scoreBlinkDelta = 0;
    scoreDifference = 0;
    scoreDifferenceY = 0;
    scoreDifferenceOpacity = 0.0;
    scoreDifferenceUpdateDelta = 0;
    scoreDifferenceColor = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferencePositiveColor;
    crosshairSpriteIndex = 0;
    crosshairX = SI.game.Renderer.getScene().getMouseX() - crosshairSpriteHalfSize;
    crosshairY = SI.game.Renderer.getScene().getMouseY() - crosshairSpriteHalfSize;
    crosshairPrecisionDelta = 0;
    crosshairFinalX = 0;
    crosshairFinalY = 0;
    vulnerableTargetCheckDelta = 0;
    emptyLifeListener = null;
  }
  
  /**
   * Set the controls listeners.
   */
  self.setControlsListeners = function () {
    SI.Controls.addMouseMoveListener(crosshairMouseMoveListener);
    SI.Controls.addClickListener(shotClickListener);
  }
  
  /**
   * Unset the controls listeners.
   */
  self.unsetControlsListeners = function () {
    SI.Controls.removeMouseMoveListener(crosshairMouseMoveListener);
    SI.Controls.removeClickListener(shotClickListener);
  }
  
  /**
   * Sum (in percentage) a new value to the current life.
   *
   * @param {Number} percentage additional life to sum.
   */
  self.sumLife = function (percentage) {
    if (isNaN(percentage) || percentage < 0) {
      throw new Error('Invalid life percentage difference.');
    }
    
    var $life = life + percentage;
    
    if ($life > 100) {
      $life = 100;
    }
    
    self.setLife($life);
  }
  
  /**
   * Subtract (in percentage) a new value to the current life.
   *
   * @param {Number} percentage Life to take away.
   */
  self.subtractLife = function (percentage) {
    if (isNaN(percentage) || percentage < 0) {
      throw new Error('Invalid life percentage difference.');
    }
    
    var $life = life - percentage;
    
    if ($life < 0) {
      $life = 0;
    }
    
    self.setLife($life);
  }
  
  /**
   * Sum a new value to the current score.
   *
   * @param {Number} difference Additional score to sum.
   */
  self.sumScore = function (difference) {
    if (isNaN(difference) || difference < 0) {
      throw new Error('Invalid difference.');
    }
    
    finalScore += difference;
    self.setScoreDifference(difference);
  }
  
  /**
   * Subtract a new value to the current score.
   *
   * @param {Number} difference Score to take away.
   */
  self.subtractScore = function (difference) {
    if (isNaN(difference) || difference < 0) {
      throw new Error('Invalid difference.');
    }
    
    finalScore -= difference;
    self.setScoreDifference(-difference);
  }
  
  /**
   * Performs a new shot creating a new shot animation and checking enemies hits.
   */
  self.shoot = function () {
    var shotX = crosshairFinalX + shotXCenterDifference;
    var shotY = crosshairFinalY + shotYCenterDifference;
    var targetX = shotX + SI.game.animation.Shot.getSpriteSheetHalfSize();
    var targetY = shotY + SI.game.animation.Shot.getSpriteSheetHalfSize();
    
    SI.game.animation.Shot.create(shotX, shotY);
    
    if (SI.game.Scenery.isExploding()) {
      return;
    }
    
    if (!SI.game.target.Enemy.penetrateAt(targetX, targetY)) {
      SI.game.target.Parachute.pinchAt(targetX, targetY);
    }
  }
  
  /**
   * Crosshair mouse move listener.
   *
   * @param {Object} evt Sent mouse move event.
   */
  function crosshairMouseMoveListener (evt) {
    crosshairX = SI.game.Renderer.getScene().getMouseX() - crosshairSpriteHalfSize;
    crosshairY = SI.game.Renderer.getScene().getMouseY() - crosshairSpriteHalfSize;
  }
  
  /**
   * Shot click listener.
   *
   * @param {Object} evt Sent click event.
   */
  function shotClickListener (evt) {
    self.shoot();
  }
  
  /**
   * Render all the HUD's logic.
   */
  self.renderLogic = function () {
    renderLifeBarUpdateLogic();
    renderScoreUpdateLogic();
    renderScoreBlinkLogic();
    renderScoreDifferenceLogic();
    renderCrosshairPrecisionLogic();
    renderVulnerableTargetCheckLogic();
  }
  
  /**
   * Updates the life bar logic.
   */
  function renderLifeBarUpdateLogic () {
    lifeUpdateDelta++;
    
    if (lifeUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDLifeUpdateMaxDelta) {
      lifeUpdateDelta = 0;
      
      if (lifeWidth != lifeFinalWidth) {
        if (lifeWidth < lifeFinalWidth) {
          lifeWidth += SI.res.ResourceLoader.getResources().game.properties.HUDLifeUpdateSpeed;
          
          if (lifeWidth > lifeFinalWidth) {
            lifeWidth = lifeFinalWidth;
          }
        } else {
          lifeWidth -= SI.res.ResourceLoader.getResources().game.properties.HUDLifeUpdateSpeed;
          
          if (lifeWidth < lifeFinalWidth) {
            lifeWidth = lifeFinalWidth;
          }
        }
        
        if (lifeWidth == 0 && typeof emptyLifeListener == 'function') {
          emptyLifeListener();
        }
      }
    }
  }
  
  /**
   * Updates the score logic.
   */
  function renderScoreUpdateLogic () {
    scoreUpdateDelta++;
    
    if (scoreUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDScoreUpdateMaxDelta) {
      scoreUpdateDelta = 0;
      
      if (score != finalScore) {
        if (score < finalScore) {
          score += SI.res.ResourceLoader.getResources().game.properties.HUDScoreUpdateSpeed;
          
          if (score > finalScore) {
            score = finalScore;
          }
        } else {
          score -= SI.res.ResourceLoader.getResources().game.properties.HUDScoreUpdateSpeed;
          
          if (score < finalScore) {
            score = finalScore;
          }
        }
      }
    }
  }
  
  /**
   * Updates the score blink logic.
   */
  function renderScoreBlinkLogic () {
    scoreBlinkDelta++;
    
    if (scoreBlinkDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDScoreBlinkMaxDelta) {
      scoreBlinkDelta = 0;
      scoreColor = (scoreColor == SI.res.ResourceLoader.getResources().game.properties.HUDScoreColor) ? SI.res.ResourceLoader.getResources().game.properties.HUDScoreBlinkColor : SI.res.ResourceLoader.getResources().game.properties.HUDScoreColor ;
    }
  }
  
  /**
   * Updates the score difference logic.
   */
  function renderScoreDifferenceLogic () {
    scoreDifferenceUpdateDelta++;
    
    if (scoreDifferenceUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceUpdateMaxDelta) {
      scoreDifferenceUpdateDelta = 0;
      
      if (scoreDifferenceOpacity > 0.0) {
        var opacity;
        
        if (scoreDifferenceY > SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceEndY) {
          scoreDifferenceY -= SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceVerticalSpeed;
          
          if (scoreDifferenceY < SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceEndY) {
            scoreDifferenceY = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceEndY;
          }
          
          opacity = scoreDifferenceOpacity + SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceOpacitySpeed;
          
          if (opacity > 1.0) {
            opacity = 1.0;
          }
          
          scoreDifferenceOpacity = opacity;
        } else {
          opacity = scoreDifferenceOpacity - SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceOpacitySpeed;
          
          if (opacity < 0.0) {
            opacity = 0.0;
          }
          
          scoreDifferenceOpacity = opacity;
        }
      }
    }
  }
  
  /**
   * Updates the crosshair precision logic.
   */
  function renderCrosshairPrecisionLogic () {
    crosshairPrecisionDelta++;
    
    if (crosshairPrecisionDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairPrecisionMaxDelta) {
      crosshairPrecisionDelta = 0;
      
      var xDisplacement = Math.round(Math.random());
      var yDisplacement = Math.round(Math.random());
      var xDifference = Math.round(Math.random() * SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairPrecisionRatio);
      var yDifference = Math.round(Math.random() * SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairPrecisionRatio);
      
      crosshairFinalX = crosshairX + ((xDisplacement == 1) ? xDifference : -xDifference );
      crosshairFinalY = crosshairY + ((yDisplacement == 1) ? yDifference : -yDifference );
    }
  }
  
  /**
   * Checks if there's any vulnerable target.
   */
  function renderVulnerableTargetCheckLogic () {
    vulnerableTargetCheckDelta++;
    
    if (vulnerableTargetCheckDelta >= SI.res.ResourceLoader.getResources().game.properties.HUDVulnerableTargetCheckMaxDelta) {
      vulnerableTargetCheckDelta = 0;
      
      if (SI.game.target.Enemy.isVulnerableTarget(SI.game.Renderer.getScene().getMouseX(), SI.game.Renderer.getScene().getMouseY())) {
        crosshairSpriteIndex = SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairDetectedTarget;
      } else {
        crosshairSpriteIndex = SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairNormal;
      }
    }
  }
  
  /**
   * Render all the HUD's graphics.
   */
  self.renderGraphics = function () {
    renderCrosshairGraphics();
    renderLifeBarGraphics();
    renderScoreGraphics();
    renderScoreDifferenceGraphics();
  }
  
  /**
   * Render the life bar graphics.
   */
  function renderLifeBarGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(lifeBarSpriteSheet, lifeBarSpriteInfo.framesCoords[ SI.res.ResourceLoader.getResources().game.properties.HUDLifeBarLife ], 0, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size, lifeStartX, lifeBarY, lifeWidth, lifeBarSpriteInfo.size);
    
    SI.game.Renderer.getScene().getContext().drawImage(lifeBarSpriteSheet, lifeBarSpriteInfo.framesCoords[ SI.res.ResourceLoader.getResources().game.properties.HUDLifeBarLeft ], 0, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size, lifeBarLeftX, lifeBarY, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size);
    
    SI.game.Renderer.getScene().getContext().drawImage(lifeBarSpriteSheet, lifeBarSpriteInfo.framesCoords[ SI.res.ResourceLoader.getResources().game.properties.HUDLifeBarCenter ], 0, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size, lifeBarCenterX, lifeBarY, lifeBarCenterWidth, lifeBarSpriteInfo.size);
    
    SI.game.Renderer.getScene().getContext().drawImage(lifeBarSpriteSheet, lifeBarSpriteInfo.framesCoords[ SI.res.ResourceLoader.getResources().game.properties.HUDLifeBarRight ], 0, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size, lifeBarRightX, lifeBarY, lifeBarSpriteInfo.size, lifeBarSpriteInfo.size);
  }
  
  /**
   * Render the score graphics.
   */
  function renderScoreGraphics () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.HUDScoreFont;
    SI.game.Renderer.getScene().getContext().fillStyle = scoreColor;
    SI.game.Renderer.getScene().getContext().fillText(SI.res.ResourceLoader.getResources().game.properties.HUDScorePrefix + '' + score.toString(), SI.res.ResourceLoader.getResources().game.properties.HUDScoreX, SI.res.ResourceLoader.getResources().game.properties.HUDScoreY);
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the score difference graphics.
   */
  function renderScoreDifferenceGraphics () {
    if (scoreDifferenceOpacity <= 0.0) {
      return;
    }
    
    var originalGlobalAlpha = SI.game.Renderer.getScene().getContext().globalAlpha;
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().globalAlpha = scoreDifferenceOpacity;
    SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceFont;
    SI.game.Renderer.getScene().getContext().fillStyle = scoreDifferenceColor;
    SI.game.Renderer.getScene().getContext().fillText(scoreDifference.toString(), SI.res.ResourceLoader.getResources().game.properties.HUDScoreDifferenceX, scoreDifferenceY);
    
    SI.game.Renderer.getScene().getContext().globalAlpha = originalGlobalAlpha;
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the crosshair graphics.
   */
  function renderCrosshairGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(crosshairSpriteSheet, crosshairSpriteInfo.framesCoords[ crosshairSpriteIndex ], 0, crosshairSpriteInfo.size, crosshairSpriteInfo.size, crosshairFinalX, crosshairFinalY, crosshairSpriteInfo.size, crosshairSpriteInfo.size);
  }
}


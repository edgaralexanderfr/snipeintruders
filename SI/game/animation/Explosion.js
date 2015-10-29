SI.game.animation.Explosion = new function () {
  var self        = this;
  
  var spriteSheet = null;
  
  /**
   * Returns the explosion's sprite sheet width.
   *
   * @return {Number}.
   */
  self.getSpriteSheetWidth = function () {
    return spriteSheet.width;
  }
  
  /**
   * Returns the explosion's sprite sheet height.
   *
   * @return {Height}.
   */
  self.getSpriteSheetHeight = function () {
    return spriteSheet.height;
  }
  
  /**
   * Set the explosion's sprite sheet.
   *
   * @param {Object} $spriteSheet Explosion's sprite sheet to set.
   */
  self.setSpriteSheet = function ($spriteSheet) {
    spriteSheet = $spriteSheet;
  }
  
  /**
   * MUST call this method before anything.
   *
   * @param {Object} $spriteSheet Explosion's sprite sheet.
   */
  self.init = function ($spriteSheet) {
    self.setSpriteSheet($spriteSheet);
  }
  
  /**
   * Creates a new permanent explosion.
   *
   * @param  {Number} x           Explosion x coordinate.
   *
   * @param  {Number} y           Explosion y coordinate.
   *
   * @param  {Number} spriteIndex Explosion sprite index.
   *
   * @return {Object}.
   */
  self.create = function (x, y, spriteIndex) {
    return SI.Animation.create(spriteSheet, x, y, spriteIndex, SI.res.ResourceLoader.getResources().game.properties.ExplosionSpriteUpdateMaxDelta, SI.res.ResourceLoader.getResources().game.properties.ExplosionRepeat);
  }
}


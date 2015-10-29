SI.game.animation.Splash = new function () {
  var self                = this;
  
  var spriteSheet         = null;
  var spriteSheetHalfSize = 0;
  
  /**
   * Returns the splash's sprite sheet half size.
   *
   * @return {Number}.
   */
  self.getSpriteSheetHalfSize = function () {
    return spriteSheetHalfSize;
  }
  
  /**
   * Returns the splash's sprite sheet width.
   *
   * @return {Number}.
   */
  self.getSpriteSheetWidth = function () {
    return spriteSheet.width;
  }
  
  /**
   * Returns the splash's sprite sheet height.
   *
   * @return {Height}.
   */
  self.getSpriteSheetHeight = function () {
    return spriteSheet.height;
  }
  
  /**
   * Set the splash's sprite sheet.
   *
   * @param {Object} $spriteSheet Splash's sprite sheet to set.
   */
  self.setSpriteSheet = function ($spriteSheet) {
    spriteSheet = $spriteSheet;
    spriteSheetHalfSize = Math.round(spriteSheet.height / 2);
  }
  
  /**
   * MUST call this method before anything.
   *
   * @param {Object} $spriteSheet Splash's sprite sheet.
   */
  self.init = function ($spriteSheet) {
    self.setSpriteSheet($spriteSheet);
  }
  
  /**
   * Creates a new splash.
   *
   * @param  {Number} x Splash x coordinate.
   *
   * @param  {Number} y Splash y coordinate.
   *
   * @return {Object}.
   */
  self.create = function (x, y) {
    return SI.Animation.create(spriteSheet, x, y, SI.res.ResourceLoader.getResources().game.properties.SplashSpriteIndex, SI.res.ResourceLoader.getResources().game.properties.SplashSpriteUpdateMaxDelta, SI.res.ResourceLoader.getResources().game.properties.SplashRepeat);
  }
  
  /**
   * Creates a new splash in centered coordinates.
   *
   * @param  {Number} x Splash centered x coordinate.
   *
   * @param  {Number} y Splash centered y coordinate.
   *
   * @return {Object}.
   */
  self.createInCenteredCoords = function (x, y) {
    return self.create(x - spriteSheetHalfSize, y - spriteSheetHalfSize);
  }
}


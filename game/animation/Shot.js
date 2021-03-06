SI.game.animation.Shot = new function() {
    var self = this;
    var spriteSheet = null;
    var spriteSheetHalfSize = 0; /**   * Returns the shot's sprite sheet half size.   *   * @return {Number}.   */
    self.getSpriteSheetHalfSize = function() {
        return spriteSheetHalfSize;
    } /**   * Returns the shot's sprite sheet width.   *   * @return {Number}.   */
    self.getSpriteSheetWidth = function() {
        return spriteSheet.width;
    } /**   * Returns the shot's sprite sheet height.   *   * @return {Height}.   */
    self.getSpriteSheetHeight = function() {
        return spriteSheet.height;
    } /**   * Set the shot's sprite sheet.   *   * @param {Object} $spriteSheet Shot's sprite sheet to set.   */
    self.setSpriteSheet = function($spriteSheet) {
        spriteSheet = $spriteSheet;
        spriteSheetHalfSize = Math.round(spriteSheet.height / 2);
    } /**   * MUST call this method before anything.   *   * @param {Object} $spriteSheet Shot's sprite sheet.   */
    self.init = function($spriteSheet) {
        self.setSpriteSheet($spriteSheet);
    } /**   * Creates a returns a new shot animation.   *   * @param  {Number} x Shot x coordinate.   *   * @param  {Number} y Shot y coordinate.   *   * @return {Object}.   */
    self.create = function(x, y) {
        return SI.Animation.create(spriteSheet, x, y, SI.res.ResourceLoader.getResources().game.properties.ShotSpriteIndex, SI.res.ResourceLoader.getResources().game.properties.ShotSpriteUpdateMaxDelta, SI.res.ResourceLoader.getResources().game.properties.ShotRepeat);
    }
}

SI.game.ui.StartScreen = new function () {
  var self                  = this;
  
  var displayed             = false;
  var logoSpriteSheet       = null;
  var esrbRatingSpriteSheet = null;
  var cursorSpriteSheet     = null;
  var copyrightX            = 0;
  var logoProportion        = 0.0;
  var logoProgression       = 0;
  var logoCurrentX          = 0;
  var logoCurrentY          = 0;
  var logoCurrentWidth      = 0;
  var logoCurrentHeight     = 0;
  var logoEndWidth          = 0;
  var logoResizeDelta       = 0;
  var startMessageX         = 0;
  var startMessageY         = 0;
  var showStartMessage      = false;
  var startMessageDelta     = 0;
  var esrbRatingX           = 0;
  var esrbRatingY           = 0;
  
  /**
   * Tells whether the interface is being displayed or not.
   *
   * @return {boolean}.
   */
  self.isDisplayed = function () {
    return displayed;
  }
  
  /**
   * Returns the copyright x coordinate.
   *
   * @return {Number}.
   */
  self.getCopyrightX = function () {
    return copyrightX;
  }
  
  /**
   * Returns the logo's current proportion.
   *
   * @return {Number}.
   */
  self.getLogoProportion = function () {
    return logoProportion;
  }
  
  /**
   * Returns the logo's current x coordinate.
   *
   * @return {Number}.
   */
  self.getLogoCurrentX = function () {
    return logoCurrentX;
  }
  
  /**
   * Returns the logo's current y coordinate.
   *
   * @return {Number}.
   */
  self.getLogoCurrentY = function () {
    return logoCurrentY;
  }
  
  /**
   * Returns the logo's current width.
   *
   * @return {Number}.
   */
  self.getLogoCurrentWidth = function () {
    return logoCurrentWidth;
  }
  
  /**
   * Returns the logo's current height.
   *
   * @return {Number}.
   */
  self.getLogoCurrentHeight = function () {
    return logoCurrentHeight;
  }
  
  /**
   * Returns the logo's end width.
   *
   * @return {Number}.
   */
  self.getLogoEndWidth = function () {
    return logoEndWidth;
  }
  
  /**
   * Returns the logo's current resize delta.
   *
   * @return {Number}.
   */
  self.getLogoResizeDelta = function () {
    return logoResizeDelta;
  }
  
  /**
   * Returns the start message x coordinate.
   *
   * @return {Number}.
   */
  self.getStartMessageX = function () {
    return startMessageX;
  }
  
  /**
   * Returns the start message y coordinate.
   *
   * @return {Number}.
   */
  self.getStartMessageY = function () {
    return startMessageY;
  }
  
  /**
   * Tells whether the start message is being displayed or not.
   *
   * @return {boolean}.
   */
  self.startMessageDisplayed = function () {
    return showStartMessage;
  }
  
  /**
   * Returns the start message current delta.
   *
   * @return {Number}.
   */
  self.getStartMessageDelta = function () {
    return startMessageDelta;
  }
  
  /**
   * Returns the ESRB rating x coordinate.
   *
   * @return {Number}.
   */
  self.getEsrbRatingX = function () {
    return esrbRatingX;
  }
  
  /**
   * Returns the ESRB rating y coordinate.
   *
   * @return {Number}.
   */
  self.getEsrbRatingY = function () {
    return esrbRatingY;
  }
  
  /**
   * Sets the logo sprite sheet.
   *
   * @param {Object} $logoSpriteSheet Logo sprite sheet to set.
   */
  self.setLogoSpriteSheet = function ($logoSpriteSheet) {
    logoSpriteSheet = $logoSpriteSheet;
  }
  
  /**
   * Sets the ESRB rating sprite sheet and computes it's coordinates.
   *
   * @param {Object} $esrbRatingSpriteSheet ESRB rating sprite sheet to set.
   */
  self.setEsrbRatingSpriteSheet = function ($esrbRatingSpriteSheet) {
    esrbRatingSpriteSheet = $esrbRatingSpriteSheet;
    esrbRatingX = 
      SI.game.Renderer.getScene().getCanvas().width - esrbRatingSpriteSheet.width - 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenEsrbRatingMarginRight;
    esrbRatingY = 
      SI.game.Renderer.getScene().getCanvas().height - esrbRatingSpriteSheet.height - 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenEsrbRatingMarginBottom;
  }
  
  /**
   * Sets the cursor sprite sheet.
   *
   * @param {Object} $cursorSpriteSheet Cursor sprite sheet to set.
   */
  self.setCursorSpriteSheet = function ($cursorSpriteSheet) {
    cursorSpriteSheet = $cursorSpriteSheet;
  }
  
  /**
   * TODO: call this method before anything. Sets the logo, ESRB rating and cursor sprites sheets and pre-computes 
   * the copyright, logo and start message properties.
   */
  self.init = function (logoSpriteSheet, esrbRatingSpriteSheet, cursorSpriteSheet) {
    self.setLogoSpriteSheet(logoSpriteSheet);
    self.setEsrbRatingSpriteSheet(esrbRatingSpriteSheet);
    self.setCursorSpriteSheet(cursorSpriteSheet);
    
    computeCopyrightProperties();
    computeLogoProperties();
    computeStartMessageProperties();
  }
  
  /**
   * Resets the interface state.
   */
  function resetState () {
    logoProportion = SI.res.ResourceLoader.getResources().game.properties.StartScreenLogoStartProportion;
    logoProgression = 1;
    logoCurrentX = 0;
    logoCurrentY = 0;
    logoCurrentWidth = 0;
    logoCurrentHeight = 0;
    logoResizeDelta = 0;
    showStartMessage = false;
    startMessageDelta = 0;
    
    SI.game.Scenery.resetState();
  }
  
  /**
   * Sets the interface controls listeners.
   */
  function setControlsListeners () {
    SI.game.Scenery.setControlsListeners();
    
    SI.Controls.addClickListener(startGameListener);
  }
  
  /**
   * Unsets the interface controls listeners.
   */
  function unsetControlsListeners () {
    SI.game.Scenery.unsetControlsListeners();
    
    SI.Controls.removeClickListener(startGameListener);
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
  }
  
  /**
   * Pre-computes the copyright x coordinate.
   */
  function computeCopyrightProperties () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightFont;
    
    var textWidth = SI.game.Renderer.getScene().getContext().measureText(
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightText
    ).width;
    
    copyrightX = SI.game.Renderer.getScene().getCenterXCoord(textWidth);
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
  }
  
  /**
   * Pre-computes the logo end width.
   */
  function computeLogoProperties () {
    logoEndWidth = 
      SI.game.Renderer.getScene().getCanvas().width + 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenLogoEndWidthOffset;
  }
  
  /**
   * Pre-computes the start message coordinates.
   */
  function computeStartMessageProperties () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageFont;
    
    var textWidth = SI.game.Renderer.getScene().getContext().measureText(
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageText
    ).width;
    
    startMessageX = SI.game.Renderer.getScene().getCenterXCoord(textWidth);
    startMessageY = 
      SI.game.Renderer.getScene().getCanvas().height - 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageMarginBottom;
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
  }
  
  /**
   * Listener invoked as soon as the user performs a click (if interface allows it).
   */
  function startGameListener () {
    if (!(logoProportion == 1.0 && logoProgression == -1)) {
      return;
    }
    
    self.close();
    SI.game.ui.Game.display();
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
   * Render the interface logic.
   */
  self.renderLogic = function () {
    SI.game.Scenery.renderLogic();
    renderLogoResizeLogic();
    renderStartMessageLogic();
  }
  
  /**
   * Render the logo resize logic by increasing it's proportion and decreasing it until reach the normal size when 
   * it reaches the end width.
   */
  function renderLogoResizeLogic () {
    logoResizeDelta++;
    
    if (logoResizeDelta >= SI.res.ResourceLoader.getResources().game.properties.StartScreenLogoResizeMaxDelta) {
      logoResizeDelta = 0;
      
      if (logoProportion == 1.0 && logoProgression == -1) {
        return;
      }
      
      logoProportion += 
        SI.res.ResourceLoader.getResources().game.properties.StartScreenLogoProportionDiff * logoProgression;
      
      if (logoProgression == 1) {
        if (logoCurrentWidth > logoEndWidth) {
          logoProgression = -1;
        }
      } else 
      if (logoProportion < 1.0) {
        logoProportion = 1.0;
      }
      
      logoCurrentWidth = logoSpriteSheet.width * logoProportion;
      logoCurrentHeight = logoSpriteSheet.height * logoProportion;
      logoCurrentX = SI.game.Renderer.getScene().getCenterXCoord(logoCurrentWidth);
      logoCurrentY = SI.game.Renderer.getScene().getCenterYCoord(logoCurrentHeight);
    }
  }
  
  /**
   * Render the start message logic blinking the message if the logo animation is already performed.
   */
  function renderStartMessageLogic () {
    startMessageDelta++;
    
    if (startMessageDelta >= SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageMaxDelta) {
      startMessageDelta = 0;
      
      if (!(logoProportion == 1.0 && logoProgression == -1)) {
        return;
      }
      
      showStartMessage = !showStartMessage;
    }
  }
  
  /**
   * Render the interface graphics.
   */
  self.renderGraphics = function () {
    SI.game.Scenery.renderGraphics();
    renderCopyrightGraphics();
    renderLogoGraphics();
    renderEsrbRatingGraphics();
    renderStartMessageGraphics();
    renderCursorGraphics();
  }
  
  /**
   * Render the copyright graphics.
   */
  function renderCopyrightGraphics () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightFont;
    SI.game.Renderer.getScene().getContext().fillStyle = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightColor;
    
    SI.game.Renderer.getScene().getContext().fillText(
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightText, 
      copyrightX, 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenCopyrightMarginTop
    );
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the logo graphics.
   */
  function renderLogoGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(logoSpriteSheet, 0, 0, logoSpriteSheet.width, logoSpriteSheet.height, logoCurrentX, logoCurrentY, logoCurrentWidth, logoCurrentHeight);
  }
  
  /**
   * Render the ESRB rating graphics.
   */
  function renderEsrbRatingGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(esrbRatingSpriteSheet, esrbRatingX, esrbRatingY);
  }
  
  /**
   * Render the start message graphics.
   */
  function renderStartMessageGraphics () {
    if (!(logoProportion == 1.0 && logoProgression == -1) || !showStartMessage) {
      return;
    }
    
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().font = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageFont;
    SI.game.Renderer.getScene().getContext().fillStyle = 
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageColor;
    
    SI.game.Renderer.getScene().getContext().fillText(
      SI.res.ResourceLoader.getResources().game.properties.StartScreenStartMessageText, 
      startMessageX, 
      startMessageY
    );
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the cursor graphics.
   */
  function renderCursorGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(
      cursorSpriteSheet, 
      SI.game.Renderer.getScene().getMouseX(), 
      SI.game.Renderer.getScene().getMouseY()
    );
  }
}


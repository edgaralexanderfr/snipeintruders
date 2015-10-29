SI.game.ui.Credits = new function () {
  var self               = this;
  
  var displayed          = false;
  var cursorSpriteSheet  = null;
  var creditsY           = 0;
  var creditsHeight      = 0;
  var creditsUpdateDelta = 0;
  var showSkipMessage    = false;
  var skipMessageDelta   = 0;
  var credits            = [];
  
  /**
   * Tells whether the interface is displayed or not.
   *
   * @return {boolean}.
   */
  self.isDisplayed = function () {
    return displayed;
  }
  
  /**
   * Returns the credits general y coordinate.
   *
   * @return {Number}.
   */
  self.getCreditsY = function () {
    return creditsY;
  }
  
  /**
   * Returns the credits total height.
   *
   * @return {Number}.
   */
  self.getCreditsHeight = function () {
    return creditsHeight;
  }
  
  /**
   * Returns the credits update delta.
   *
   * @return {Number}.
   */
  self.getCreditsUpdateDelta = function () {
    return creditsUpdateDelta;
  }
  
  /**
   * Tells whether the skip message is being displayed or not.
   *
   * @return {boolean}.
   */
  self.skipMessageDisplayed = function () {
    return showSkipMessage;
  }
  
  /**
   * Returns the skip message delta.
   *
   * @return {Number}.
   */
  self.getSkipMessageDelta = function () {
    return skipMessageDelta;
  }
  
  /**
   * Set the cursor's sprite sheet
   *
   * @param {Object} $cursorSpriteSheet Cursor sprite sheet to set.
   */
  self.setCursorSpriteSheet = function ($cursorSpriteSheet) {
    cursorSpriteSheet = $cursorSpriteSheet;
  }
  
  /**
   * TODO: call this method before anything.
   *
   * @param {Object} cursorSpriteSheet Cursor sprite sheet to set.
   */
  self.init = function (cursorSpriteSheet) {
    self.setCursorSpriteSheet(cursorSpriteSheet);
  }
  
  /**
   * Resets the interface state.
   */
  function resetState () {
    creditsY = 0;
    creditsHeight = 0;
    creditsUpdateDelta = 0;
  }
  
  /**
   * Set the interface controls listeners.
   */
  function setControlsListeners () {
    SI.Controls.addClickListener(skipControlListener);
  }
  
  /**
   * Unset the interface controls listeners.
   */
  function unsetControlsListeners () {
    SI.Controls.removeClickListener(skipControlListener);
  }
  
  /**
   * Displays the interface.
   *
   * @param {Number} score Final score to be shown on the credits.
   */
  self.display = function (score) {
    if (displayed || isNaN(score) || score < 0) {
      return;
    }
    
    displayed = true;
    
    resetState();
    setControlsListeners();
    
    computeCredits(score);
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
   * Pre-calculates the credits variables.
   *
   * @param {Number} score Final score to be shown on the credits.
   */
  function computeCredits (score) {
    var creditsFinalText 
      = SI.res.ResourceLoader.getResources().game.properties.CreditsScoreTitle + score + 
        SI.res.ResourceLoader.getResources().game.properties.CreditsLines;
    
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    var creditsLines = creditsFinalText.split("\n");
    var totalLines = creditsLines.length;
    var index, lineObject;
    
    credits = [];
    SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.CreditsFont;
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.CreditsColor;
    
    for (index = 0; index < totalLines; index++) {
      lineObject = {};
      lineObject.text = creditsLines[ index ];
      lineObject.x = SI.game.Renderer.getScene().getCenterXCoord(SI.game.Renderer.getScene().getContext().measureText(lineObject.text).width);
      
      credits.push(lineObject);
    }
    
    creditsY = SI.game.Renderer.getScene().getCanvas().height;
    creditsHeight = totalLines * SI.res.ResourceLoader.getResources().game.properties.CreditsLineHeight;
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Skips the credits when the player clicks.
   */
  function skipControlListener () {
    end();
  }
  
  /**
   * Closes the interface.
   */
  function end () {
    self.close();
    SI.game.ui.StartScreen.display();
  }
  
  /**
   * Render the interface logic.
   */
  self.renderLogic = function () {
    renderCreditsUpdateLogic();
    renderSkipMessageLogic();
  }
  
  /**
   * Decreases the credits y coordinate and terminates the interface when they're no longer visible.
   */
  function renderCreditsUpdateLogic () {
    creditsUpdateDelta++;
    
    if (creditsUpdateDelta >= SI.res.ResourceLoader.getResources().game.properties.CreditsUpdateMaxDelta) {
      creditsUpdateDelta = 0;
      
      creditsY -= SI.res.ResourceLoader.getResources().game.properties.CreditsSpeed;
      var creditsY2 = creditsY + creditsHeight;
      
      if (creditsY2 <= 0) {
        end();
      }
    }
  }
  
  /**
   * Toggles the skip message state.
   */
  function renderSkipMessageLogic () {
    skipMessageDelta++;
    
    if (skipMessageDelta >= SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageMaxDelta) {
      skipMessageDelta = 0;
      showSkipMessage = !showSkipMessage;
    }
  }
  
  /**
   * Render the interface graphics.
   */
  self.renderGraphics = function () {
    renderBackgroundGraphics();
    renderCreditsGraphics();
    renderCursorGraphics();
    renderSkipMessageGraphics();
  }
  
  /**
   * Paints the credits background.
   */
  function renderBackgroundGraphics () {
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.CreditsBackgroundColor;
    SI.game.Renderer.getScene().getContext().fillRect(0, 0, SI.game.Renderer.getScene().getCanvas().width, SI.game.Renderer.getScene().getCanvas().height);
  }
  
  /**
   * Render the credits graphics itself.
   */
  function renderCreditsGraphics () {
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    var y = creditsY;
    var totalLines = credits.length;
    var index, line;
    
    SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.CreditsFont;
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.CreditsColor;
    
    for (index = 0; index < totalLines; index++) {
      line = credits[ index ];
      SI.game.Renderer.getScene().getContext().fillText(line.text, line.x, y);
      
      y += SI.res.ResourceLoader.getResources().game.properties.CreditsLineHeight;
    }
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
  
  /**
   * Render the cursor graphics.
   */
  function renderCursorGraphics () {
    SI.game.Renderer.getScene().getContext().drawImage(cursorSpriteSheet, SI.game.Renderer.getScene().getMouseX(),  SI.game.Renderer.getScene().getMouseY());
  }
  
  /**
   * Render the skip message graphics.
   */
  function renderSkipMessageGraphics () {
    if (!showSkipMessage) {
      return;
    }
    
    var originalFont = SI.game.Renderer.getScene().getContext().font;
    var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
    
    SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageFont;
    SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageColor;
    SI.game.Renderer.getScene().getContext().fillText(SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageText, SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageX, SI.res.ResourceLoader.getResources().game.properties.CreditsSkipMessageY);
    
    SI.game.Renderer.getScene().getContext().font = originalFont;
    SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
  }
}


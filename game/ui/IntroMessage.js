SI.game.ui.IntroMessage = new function() {
    var self = this;
    var displayed = false;
    var cursorSpriteSheet = null;
    var messageX = 0;
    var messageY = 0;
    var messageOpacity = 0.0;
    var messageProgression = 0;
    var messageDelta = 0;
    var messageFadeOutDelta = 0; /**   * Tells whether the interface is being displayed or not.   *   * @return {boolean}.   */
    self.isDisplayed = function() {
        return displayed;
    } /**   * Returns the message x coordinate.   *   * @return {Number}.   */
    self.getMessageX = function() {
        return messageX;
    } /**   * Returns the message y coordinate.   *   * @return {Number}.   */
    self.getMessageY = function() {
        return messageY;
    } /**   * Returns the message current opacity.   *   * @return {Number}.   */
    self.getMessageOpacity = function() {
        return messageOpacity;
    } /**   * Returns the message opacity progression.   *   * @return {Number}.   */
    self.getMessageProgression = function() {
        return messageProgression;
    } /**   * Returns the current message opacity update delta.   *   * @return {Number}.   */
    self.getMessageDelta = function() {
        return messageDelta;
    } /**   * Returns the message fade out delta.   *   * @return {Number}.   */
    self.getMessageFadeOutDelta = function() {
        return messageFadeOutDelta;
    } /**   * Set the cursor sprite sheet.   *   * @param {Object} $cursorSpriteSheet Cursor sprite sheet to set.   */
    self.setCursorSpriteSheet = function($cursorSpriteSheet) {
        cursorSpriteSheet = $cursorSpriteSheet;
    } /**   * TODO: call this method before anything. It sets the cursor sprite sheet and pre-computes the message properties.   *   * @param {Object} cursorSpriteSheet Cursor sprite sheet to set.   */
    self.init = function(cursorSpriteSheet) {
        self.setCursorSpriteSheet(cursorSpriteSheet);
        computeMessageProperties();
    } /**   * Resets the interface state.   */
    function resetState() {
        messageOpacity = 0.0;
        messageProgression = 1;
        messageDelta = 0;
    } /**   * Sets the interface controls listeners.   */
    function setControlsListeners() {} /**   * Unsets the interface controls listeners.   */
    function unsetControlsListeners() {} /**   * Displays the interface.   */
    self.display = function() {
        if (displayed) {
            return;
        }
        displayed = true;
        resetState();
        setControlsListeners();
        fadeIn();
    } /**   * Pre-computes the message coordinates.   */
    function computeMessageProperties() {
        var originalFont = SI.game.Renderer.getScene().getContext().font;
        SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.IntroMessageFont;
        var textHeight = parseInt(SI.res.ResourceLoader.getResources().game.properties.IntroMessageFont);
        var textWidth = SI.game.Renderer.getScene().getContext().measureText(SI.res.ResourceLoader.getResources().game.properties.IntroMessageText).width;
        messageX = SI.game.Renderer.getScene().getCenterXCoord(textWidth);
        messageY = SI.game.Renderer.getScene().getCenterYCoord(textHeight);
        SI.game.Renderer.getScene().getContext().font = originalFont;
    } /**   * Tells to the interface to fade in the message.   */
    function fadeIn() {
        messageOpacity = 0.01;
        messageProgression = 1;
    } /**   * Tells to the interface to fade out the message.   */
    function fadeOut() {
        messageOpacity = 0.99;
        messageProgression = -1;
    } /**   * Method to invoke when the message's fade out finishes and the interface must be closed, in order to display the    * start screen.   */
    function end() {
        self.close();
        SI.game.ui.StartScreen.display();
    } /**   * Closes the interface.   */
    self.close = function() {
        if (!displayed) {
            return;
        }
        displayed = false;
        resetState();
        unsetControlsListeners();
    } /**   * Render the interface logic.   */
    self.renderLogic = function() {
        renderMessageLogic();
        renderMessageFadeOutLogic();
    } /**   * Updates the message opacity if it's superior to 0.0 and less than 1.0, in case it reaches 0.0 by decreasing    * the end method will be invoked.   */
    function renderMessageLogic() {
        messageDelta++;
        if (messageDelta >= SI.res.ResourceLoader.getResources().game.properties.IntroMessageMaxDelta) {
            messageDelta = 0;
            if (messageOpacity == 0.0 || messageOpacity == 1.0) {
                return;
            }
            var opacity = messageOpacity + SI.res.ResourceLoader.getResources().game.properties.IntroMessageOpacitySpeed * messageProgression;
            if (opacity > 1.0) {
                opacity = 1.0;
            } else if (opacity < 0.0) {
                opacity = 0.0;
            }
            messageOpacity = opacity;
            if (opacity == 0.0) {
                end();
            }
        }
    } /**   * Updates the fade out delta to call the fadeOut method after a specific interval of time.   */
    function renderMessageFadeOutLogic() {
        messageFadeOutDelta++;
        if (messageFadeOutDelta >= SI.res.ResourceLoader.getResources().game.properties.IntroMessageFadeOutMaxDelta) {
            messageFadeOutDelta = 0;
            fadeOut();
        }
    } /**   * Render interface graphics.   */
    self.renderGraphics = function() {
        renderBackgroundGraphics();
        renderMessageGraphics();
        renderCursorGraphics();
    } /**   * Render the intro message background graphics.   */
    function renderBackgroundGraphics() {
        var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
        SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.IntroMessageBackgroundColor;
        SI.game.Renderer.getScene().getContext().fillRect(0, 0, SI.game.Renderer.getScene().getCanvas().width, SI.game.Renderer.getScene().getCanvas().height);
        SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
    } /**   * Render the message itself graphics.   */
    function renderMessageGraphics() {
        var originalGlobalAlpha = SI.game.Renderer.getScene().getContext().globalAlpha;
        var originalFont = SI.game.Renderer.getScene().getContext().font;
        var originalFillStyle = SI.game.Renderer.getScene().getContext().fillStyle;
        SI.game.Renderer.getScene().getContext().globalAlpha = messageOpacity;
        SI.game.Renderer.getScene().getContext().font = SI.res.ResourceLoader.getResources().game.properties.IntroMessageFont;
        SI.game.Renderer.getScene().getContext().fillStyle = SI.res.ResourceLoader.getResources().game.properties.IntroMessageColor;
        SI.game.Renderer.getScene().getContext().fillText(SI.res.ResourceLoader.getResources().game.properties.IntroMessageText, messageX, messageY);
        SI.game.Renderer.getScene().getContext().globalAlpha = originalGlobalAlpha;
        SI.game.Renderer.getScene().getContext().font = originalFont;
        SI.game.Renderer.getScene().getContext().fillStyle = originalFillStyle;
    } /**   * Render the cursor graphics.   */
    function renderCursorGraphics() {
        SI.game.Renderer.getScene().getContext().drawImage(cursorSpriteSheet, SI.game.Renderer.getScene().getMouseX(), SI.game.Renderer.getScene().getMouseY());
    }
}

/**
 * @dependency lib/jquery-html5-fullscreen-master/src/jquery.fullscreen.js
 */
SI.Scene = new function () {
  var self                    = this;
  
  var jqueryFullScreen        = null;
  
  self.class = function () {
    var $this                 = this;
    
    var iconUrl               = '';
    var cursorUrl             = '';
    var title                 = '';
    var backgroundColor       = '';
    var canvasBackgroundColor = '';
    var width                 = 0;
    var height                = 0;
    var canvas                = null;
    var context               = null;
    
    /**
     * Returns the scene's icon URL.
     *
     * @return {String}.
     */
    $this.getIconUrl = function () {
      return iconUrl;
    }
    
    /**
     * Returns the scene's cursor URL.
     *
     * @return {String}.
     */
    $this.getCursorUrl = function () {
      return cursorUrl;
    }
    
    /**
     * Returns the scene's title.
     *
     * @return {String}.
     */
    $this.getTitle - function () {
      return title;
    }
    
    /**
     * Returns the scene's background color.
     *
     * @return {String}.
     */
    $this.getBackgroundColor = function () {
      return backgroundColor;
    }
    
    /**
     * Returns the scene's canvas background color.
     *
     * @return {String}.
     */
    $this.getCanvasBackgroundColor = function () {
      return canvasBackgroundColor;
    }
    
    /**
     * Returns the scene's canvas width.
     *
     * @return {Number}.
     */
    $this.getWidth = function () {
      return width;
    }
    
    /**
     * Returns the scene's canvas height.
     *
     * @return {Number}.
     */
    $this.getHeight = function () {
      return height;
    }
    
    /**
     * Returns the scene's canvas.
     *
     * @return {Object}.
     */
    $this.getCanvas = function () {
      return canvas;
    }
    
    /**
     * Returns the scene's canvas 2d context.
     *
     * @return {Object}.
     */
    $this.getContext = function () {
      return context;
    }
    
    /**
     * Set the scene's icon URL.
     *
     * @param {String} $iconUrl URL for the scene's icon.
     */
    $this.setIconUrl = function ($iconUrl) {
      iconUrl = $iconUrl;
    }
    
    /**
     * Set the scene's cursor URL.
     *
     * @param {String} $cursorUrl URL for the scene's cursor.
     */
    $this.setCursorUrl = function ($cursorUrl) {
      cursorUrl = $cursorUrl;
    }
    
    /**
     * Set the scene's title.
     *
     * @param {String} $title Scene's title.
     */
    $this.setTitle = function ($title) {
      title = $title;
    }
    
    /**
     * Set the scene's background color.
     *
     * @param {String} $backgroundColor Scene's background color (in rgb(x,x,x)).
     */
    $this.setBackgroundColor = function ($backgroundColor) {
      backgroundColor = $backgroundColor;
    }
    
    /**
     * Set the scene's canvas background color.
     *
     * @param {String} $canvasBackgroundColor Scene's canvas background color (in rgb(x,x,x)).
     */
    $this.setCanvasBackgroundColor = function ($canvasBackgroundColor) {
      canvasBackgroundColor = $canvasBackgroundColor;
    }
    
    /**
     * Set the scene's canvas width.
     *
     * @param {String} $width Scene's canvas width.
     */
    $this.setWidth = function ($width) {
      width = $width;
    }
    
    /**
     * Set the scene's canvas height.
     *
     * @param {String} $height Scene's canvas height.
     */
    $this.setHeight = function ($height) {
      height = $height;
    }
    
    /**
     * Calculates the most suitable dimension depending on client's screen size and providing a configurated 
     * proportional margin.
     *
     * @param {Number} spriteSize Sprite's global common size.
     */
    $this.adjustSizeToScreen = function (spriteSize) {
      var $width = 0;
      var $height = 0;
      
      while ($width < screen.width) {
        $width += spriteSize;
      }
      
      while ($height < screen.height) {
        $height += spriteSize;
      }
      
      width = $width - spriteSize * SI.res.ResourceLoader.getResources().game.properties.SceneCanvasXMarginProportion;
      height = $height - spriteSize * SI.res.ResourceLoader.getResources().game.properties.SceneCanvasYMarginProportion;
    }
    
    /**
     * Set the scene's size to fit the screen size.
     */
    $this.fillSizeToScreen = function () {
      width = screen.width;
      height = screen.height;
    }
    
    /**
     * Calculates the x center coordinate for the provided size within the scene's canvas width.
     *
     * @param  {Number} size Size to fit.
     *
     * @return {Number}.
     */
    $this.getCenterXCoord = function (size) {
      return (width - size) / 2;
    }
    
    /**
     * Calculates the y center coordinate for the provided size within the scene's canvas height.
     *
     * @param  {Number} size Size to fit.
     *
     * @return {Number}.
     */
    $this.getCenterYCoord = function (size) {
      return (height - size) / 2;
    }
    
    /**
     * Returns the mouse x coordinate in the canvas based in the global coordinate.
     *
     * @return {Number}.
     */
    $this.getMouseX = function () {
      return SI.Controls.getMouseX() - canvas.offsetLeft;
    }
    
    /**
     * Returns the mouse y coordinate in the canvas based in the global coordinate.
     *
     * @return {Number}.
     */
    $this.getMouseY = function () {
      return SI.Controls.getMouseY() - canvas.offsetTop;
    }
    
    /**
     * Builds the scene's HTML components with its properties and installs the scene on the DOM.
     */
    $this.buildInDOM = function () {
      if (iconUrl != '') {
        var link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = iconUrl;
        document.head.appendChild(link);
      }
      
      if (cursorUrl != '') {
        document.body.style.cursor = 'url(' + cursorUrl + '), auto';
      }
      
      document.title = title;
      
      document.body.parentElement.style.width = '100%';
      document.body.parentElement.style.height = '100%';
      document.body.parentElement.style.overflow = 'hidden';
      
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.margin = '0';
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.overflow = 'hidden';
      
      var table = document.createElement('table');
      table.border = '0';
      table.cellpadding = '0';
      table.cellspacing = '0';
      table.style.width = '100%';
      table.style.height = '100%';
      table.style.backgroundColor = backgroundColor;
      table.style.textAlign = 'center';
      table.appendChild(document.createElement('tr'));
      table.firstChild.appendChild(document.createElement('td'));
      
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.backgroundColor = canvasBackgroundColor;
      context = canvas.getContext('2d');
      
      table.firstChild.firstChild.appendChild(canvas);
      document.body.removeChild(document.body.firstChild);
      document.body.appendChild(table);
    }
  }
  
  /**
   * Returns a new Scene instance.
   *
   * @return {Object}.
   */
  self.create = function () {
    return new self.class();
  }
  
  /**
   * Set the scene in full screen mode.
   */
  self.setFullScreenMode = function () {
    createJqueryFullScreenInstance();
    jqueryFullScreen.enableFullScreen();
  }
  
  /**
   * Unset the full screen mode in the scene.
   */
  self.unSetFullScreenMode = function () {
    createJqueryFullScreenInstance();
    jqueryFullScreen.disableFullScreen();
  }
  
  /**
   * Creates a new jQuery fullscreen instance if it was not created.
   */
  function createJqueryFullScreenInstance () {
    if (jqueryFullScreen == null) {
      jqueryFullScreen = new $.fullscreen($(document.body));
    }
  }
  
  /**
   * Set the fullscreen mode if the configuration allows and when the first event is triggered.
   */
  self.setFullScreenOnFirstEvent = function () {
    if (SI.res.ResourceLoader.getResources().game.properties.SceneFullScreenOnFirstEvent && 
        !SI.Controls.wasFirstEventPerformed()) {
      self.setFullScreenMode();
    }
  }
  
  /**
   * Load a new font globally appending a style tag to document's head.
   *
   * @param {String} name  Programmatic CSS name of the font.
   *
   * @param {String} path  URL path to the font to load.
   *
   * @param {String} svgId SVG 'hashtag' ID to append to SVG's path.
   */
  self.loadFont = function (name, path, svgId) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(
      "@font-face { \n\r" + 
      "  font-family : '" + name + "'; \n\r" + 
      "  src : url('" + path + "font.eot'); \n\r" + 
      "  src : url('" + path + "font.eot?#iefix') format('embedded-opentype'), \n\r" + 
      "    url('" + path + "font.woff') format('woff'), \n\r" + 
      "    url('" + path + "font.ttf') format('truetype'), \n\r" + 
      "    url('" + path + "font.svg#" + svgId + "') format('svg') \n\r" + 
      "}"
    ));
    
    document.head.appendChild(style);
  }
}


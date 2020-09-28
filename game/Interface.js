SI.game.Interface = new function () {
  var self = this;
  
  /**
   * Returns the displayed ui module.
   *
   * @return {Object}.
   */
  self.getDisplayedModule = function () {
    var module;
    
    for (module in SI.game.ui) {
      if (SI.game.ui[ module ].isDisplayed()) {
        return SI.game.ui[ module ];
      }
    }
    
    return null;
  }
  
  /**
   * Checks which is the displayed module by checking all the ui nodes and calls it's renderLogic method.
   */
  self.renderDisplayedLogic = function () {
    var displayedModule = self.getDisplayedModule();
    
    if (displayedModule != null) {
      displayedModule.renderLogic();
    }
  }
  
  /**
   * Checks which is the displayed module by checking all the ui nodes and calls it's renderGraphics method.
   */
  self.renderDisplayedGraphics = function () {
    var displayedModule = self.getDisplayedModule();
    
    if (displayedModule != null) {
      displayedModule.renderGraphics();
    }
  }
}


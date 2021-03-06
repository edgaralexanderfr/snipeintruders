SI.game.Renderer = new function() {
    var self = this;
    self.LOAD_CACHE = true;
    var scene = null; /**   * Returns the Renderer Scene object.   *   * @return {Object}.   */
    self.getScene = function() {
        return scene;
    } /**   * Setup all the necessary callback in the main renderer system.   */
    self.useThisRenderer = function() {
        SI.Renderer.setBeforeLoadListener(beforeLoad);
        SI.Renderer.setLoadErrorListener(reportLoadError);
        SI.Renderer.setPrepareListener(prepare);
        SI.Renderer.setLogicRenderListener(renderLogic);
        SI.Renderer.setGraphicsRenderListener(renderGraphics);
    } /**   * Before load event callback. Creates a temporal scene and displays the loading message.   */
    function beforeLoad() {
        SI.res.ResourceLoader.setLoadCache(self.LOAD_CACHE);
        document.body.style.backgroundColor = 'black';
    } /**   * Report load error event callback.   */
    function reportLoadError() {
        console.error('One or various resources couldn\'t be loaded correctly, please refresh this page.');
        alert('One or various resources couldn\'t be loaded correctly. Refreshing page...');
        window.location.reload();
    } /**   * Prepare event callback.   */
    function prepare() {
        console.log('All resources were loaded correctly.');
        var totalFonts = SI.res.ResourceLoader.getResources().game.properties.SceneFonts.length;
        var index;
        for (index = 0; index < totalFonts; index++) {
            SI.Scene.loadFont(SI.res.ResourceLoader.getResources().game.properties.SceneFonts[index].name, SI.res.ResourceLoader.getResources().game.properties.SceneFonts[index].path, SI.res.ResourceLoader.getResources().game.properties.SceneFonts[index].svgId);
        }
        scene = SI.Scene.create();
        scene.setIconUrl(SI.res.ResourceLoader.getResources().game.properties.SceneIconUrl);
        scene.setCursorUrl(SI.res.ResourceLoader.getResources().game.properties.SceneCursorUrl);
        scene.setTitle(SI.res.ResourceLoader.getResources().game.properties.SceneTitle);
        scene.setBackgroundColor(SI.res.ResourceLoader.getResources().game.properties.SceneBackgroundColor);
        scene.setCanvasBackgroundColor(SI.res.ResourceLoader.getResources().game.properties.SceneCanvasBackgroundColor);
        if (screen.width < SI.res.ResourceLoader.getResources().game.properties.MinScreenWidth) {
            SI.res.ResourceLoader.getResources().game.properties.SceneFullScreenOnFirstEvent = false;
            scene.setWidth(SI.res.ResourceLoader.getResources().game.properties.SceneWidth);
            scene.setHeight(SI.res.ResourceLoader.getResources().game.properties.SceneHeight);
            document.getElementById('viewport').setAttribute('content', 'width=' + SI.res.ResourceLoader.getResources().game.properties.SceneWidth + ', user-scalable=no');
        } else {
            scene.adjustSizeToScreen(SI.res.ResourceLoader.getResources().game.properties.SpriteSize);
        }
        scene.buildInDOM();
        initAll();
        SI.game.ui.IntroMessage.display();
        SI.Renderer.render();
        SI.game.Controls.prepare();
        SI.Controls.set();
        SI.game.Gamepad.prepare();
        SI.Gamepad.setTrackTime(SI.res.ResourceLoader.getResources().game.properties.GamepadTrackTime);
        SI.Gamepad.enable();
    } /**   * Inits all dependencies setting all the required resources and references.   */
    function initAll() {
        SI.Animation.init(SI.game.Renderer.getScene().getContext());
        SI.game.animation.Explosion.init(SI.res.ResourceLoader.getResources().images.scenery.explosion);
        SI.game.animation.Shot.init(SI.res.ResourceLoader.getResources().images.hud.shot);
        SI.game.animation.Splash.init(SI.res.ResourceLoader.getResources().images.target.splash);
        SI.game.Scenery.init(SI.res.ResourceLoader.getResources().images.scenery.cloud.c1, SI.res.ResourceLoader.getResources().images.scenery.cloud.c2, SI.res.ResourceLoader.getResources().images.scenery.cloud.c3, SI.res.ResourceLoader.getResources().images.scenery.mountains, SI.res.ResourceLoader.getResources().images.scenery.trees);
        SI.game.HUD.init(SI.res.ResourceLoader.getResources().images.hud.lifebar, SI.res.ResourceLoader.getResources().images.hud.crosshair);
        SI.game.target.Parachute.init(SI.game.Renderer.getScene().getCanvas(), SI.game.Renderer.getScene().getContext(), SI.res.ResourceLoader.getResources().images.target.parachute);
        SI.game.target.Enemy.init(SI.game.Renderer.getScene().getCanvas(), SI.game.Renderer.getScene().getContext(), [SI.res.ResourceLoader.getResources().images.target.enemy.e1, SI.res.ResourceLoader.getResources().images.target.enemy.e2, SI.res.ResourceLoader.getResources().images.target.enemy.e3, SI.res.ResourceLoader.getResources().images.target.enemy.e4, SI.res.ResourceLoader.getResources().images.target.enemy.e5, SI.res.ResourceLoader.getResources().images.target.enemy.e6, SI.res.ResourceLoader.getResources().images.target.enemy.e7, SI.res.ResourceLoader.getResources().images.target.enemy.e8, SI.res.ResourceLoader.getResources().images.target.enemy.e9, SI.res.ResourceLoader.getResources().images.target.enemy.e10, SI.res.ResourceLoader.getResources().images.target.enemy.e11, SI.res.ResourceLoader.getResources().images.target.enemy.e12]);
        SI.game.ui.IntroMessage.init(SI.res.ResourceLoader.getResources().cursors.cursor);
        SI.game.ui.StartScreen.init(SI.res.ResourceLoader.getResources().images.ui.StartScreen.logo, SI.res.ResourceLoader.getResources().images.ui.StartScreen.esrb, SI.res.ResourceLoader.getResources().cursors.cursor);
        SI.game.ui.Game.init();
        SI.game.ui.Credits.init(SI.res.ResourceLoader.getResources().cursors.cursor);
    } /**   * Render logic event callback.   */
    function renderLogic() {
        SI.game.Interface.renderDisplayedLogic();
    } /**   * Render graphics event callback.   */
    function renderGraphics() {
        SI.game.Interface.renderDisplayedGraphics();
    }
}

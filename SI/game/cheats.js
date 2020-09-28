/** * Cheat that increases crosshair precision to 100%. */
function steady() {
    SI.res.ResourceLoader.getResources().game.properties.HUDCrosshairPrecisionRatio = 0;
} /** * Cheat that removes the horizontal movement of the enemies. */
function nowind() {
    SI.res.ResourceLoader.getResources().game.properties.ParachuteHorizontalSpeed = 0;
} /** * Cheat that provides unlimited life. */
function unstoppable() {
    SI.res.ResourceLoader.getResources().game.properties.GameLifeSumDifferenceProportion = 0;
    SI.res.ResourceLoader.getResources().game.properties.GameLifeSubtractionDifferenceProportion = 0;
}

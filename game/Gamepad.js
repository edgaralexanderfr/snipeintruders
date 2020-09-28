SI.game.Gamepad = new function() {
    var self = this; /**   * Prepares all necesarry listeners.   */
    self.prepare = function() {
        SI.Gamepad.setButtonDownListener(onButtonDown);
        SI.Gamepad.setButtonUpListener(onButtonUp);
        SI.Gamepad.setAxisUpdateListener(onAxisUpdate);
    } /**   * Called when gamepad timer updates the axes values.   *   * @param {number} index Gamepad axis index.   */
    function onAxisUpdate(index, value) {
        if (index == SI.res.ResourceLoader.getResources().game.properties.GamepadXAxisIndex) {
            SI.Controls.setMouseX(SI.Controls.getMouseX() + (value * SI.res.ResourceLoader.getResources().game.properties.GamepadMoveMaxSpeed));
        } else if (index == SI.res.ResourceLoader.getResources().game.properties.GamepadYAxisIndex) {
            SI.Controls.setMouseY(SI.Controls.getMouseY() + (value * SI.res.ResourceLoader.getResources().game.properties.GamepadMoveMaxSpeed));
        }
    } /**   * Called when user starts pressing any gamepad button.   *   * @param {number} index GamepadButton object index.   */
    function onButtonDown(index) {} /**   * Called when user release any gamepad button.   *   * @param {number} index GamepadButton object index.   */
    function onButtonUp(index) {
        if (index == SI.res.ResourceLoader.getResources().game.properties.GamepadPauseButton1Index || index == SI.res.ResourceLoader.getResources().game.properties.GamepadPauseButton2Index) {
            SI.Controls.onKeyUp({
                which: SI.res.ResourceLoader.getResources().game.properties.GamePauseKeyCode
            });
        } else {
            SI.Controls.onClick({
                clientX: SI.Controls.getMouseX(),
                clientY: SI.Controls.getMouseY()
            });
        }
    }
}

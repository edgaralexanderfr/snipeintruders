/**
 * Checks if the clicked coordinates overlaps the provided object considering its alpha channel.
 *
 * @param {Number}                            clickX Clicked x coordinate.
 *
 * @param {Number}                            clickY Clicked y coordinate.
 *
 * @param {Number} objectX                    Object x coordinate.
 *
 * @param {Number} objectY                    Object y coordinate.
 *
 * @param {Object} objectSpriteSize           Object sprite size.
 *
 * @param {Object} objectSpriteImageData      Object sprite image data to check the alpha channel.
 */
SI.checkObjectHit = function (clickX, clickY, objectX, objectY, objectSpriteSize, objectSpriteImageData) {
  var objectX2 = objectX + objectSpriteSize;
  var objectY2 = objectY + objectSpriteSize;
  
  if (!(clickX >= objectX && clickX <= objectX2 && clickY >= objectY && clickY <= objectY2)) {
    return false;
  }
  
  var clickedObjectX = Math.floor(clickX - objectX);
  var clickedObjectY = Math.floor(clickY - objectY);
  
  var alphaIndex = (objectSpriteSize * clickedObjectY + clickedObjectX) * 4 + 3;
  
  if (objectSpriteImageData.data[ alphaIndex ] == 0) {
    return false;
  }
  
  return true;
}


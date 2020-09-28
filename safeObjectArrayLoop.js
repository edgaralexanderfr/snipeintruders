/**
 * Ensures to loop the provided object array avoiding possible errors like length variability.
 *
 * @param {Array}    array Array to loop.
 *
 * @param {Function} callback Callback function to execute for each item, it provides the current item index and 
 * reference as parameters and should return a boolean indicating whether the loop must be continued or not.
 */
SI.safeObjectArrayLoop = function (array, callback) {
  var isCallbackAFunction = (typeof callback == 'function');
  var index;
  
  for (index = 0; index < array.length; index++) {
    if (typeof array[ index ] != 'undefined' && isCallbackAFunction) {
      if (!callback(index, array[ index ])) {
        break;
      }
    }
  }
}


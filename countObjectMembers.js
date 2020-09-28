/**
 * Counts all the members that belong to a JavaScript Object.
 *
 * @param  {Object} object Object to inspect.
 *
 * @return {Number}.
 */
SI.countObjectMembers = function (object) {
  var count = 0;
  var property;
  
  for (property in object) {
    if (object.hasOwnProperty(property)) {
      count++;
    }
  }
  
  return count;
}


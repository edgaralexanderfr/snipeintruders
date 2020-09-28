/**
 * @dependency http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
 */
SI.res.ResourceLoader = new function () {
  var self                         = this;
  
  self.RESOURCE_LIST_URL           = 'res/resourceList.json';
  self.AUDIO_EXTENSION_TO_USE      = '';
  
  var loading                      = false;
  var resources                    = null;
  var resourcesCount               = 0;
  var resourcesLoadCount           = 0;
  var loadCache                    = true;
  var singleErrorDetected          = false;
  var singleErrorDetectionListener = null;
  
  /**
   * Checks essential support information like the proper audio type to use.
   */
  function init () {
    self.AUDIO_EXTENSION_TO_USE = self.getAudioExtensionToUse();
  }
  
  /**
   * Tells whether there's a pending download in progress.
   *
   * @return {boolean}.
   */
  self.isLoading = function () {
    return loading;
  }
  
  /**
   * Returns current resources object.
   *
   * @return {Object}.
   */
  self.getResources = function () {
    return resources;
  }
  
  /**
   * Returns current resources count.
   *
   * @return {Number}.
   */
  self.getResourcesCount = function () {
    return resourcesCount;
  }
  
  /**
   * Returns if resources should be loaded from cache or not.
   */
  self.getLoadCache = function () {
    return loadCache;
  }
  
  /**
   * Returns current resources load count.
   *
   * @return {Number}.
   */
  self.getResourcesLoadCount = function () {
    return resourcesLoadCount;
  }
  
  /**
   * Returns the progress percentage of loaded resources.
   *
   * @return {Number}.
   */
  self.getProgress = function () {
    if (resourcesCount == 0) {
      return 0;
    }
    
    return Math.round((resourcesLoadCount * 100) / resourcesCount);
  }
  
  /**
   * Checks for browser's most suitable audio extension.
   *
   * @return {String}.
   */
  self.getAudioExtensionToUse = function () {
    var audio = document.createElement('audio');
    
    if (audio.canPlayType('audio/ogg') == 'maybe') {
      return 'ogg';
    }
    
    return 'mp3';
  }
  
  /**
   * The if resources should be loaded from cache or not.
   *
   * @param {boolean} $loadCache Cache load status.
   */
  self.setLoadCache = function ($loadCache) {
    loadCache = $loadCache;
  }
  
  /**
   * Set a function that will be executed only once as soon as a single error is detected.
   *
   * @param {function} callback Callback function to execute only once when a single error is detected.
   */
  self.setSingleErrorDetectionListener = function (callback) {
    singleErrorDetectionListener = callback;
  }
  
  /**
   * Load all the resources listed in the configured dynamic resource list.
   *
   * @param {function} onLoad  Callback function to execute as soon as all the resources are correctly loaded.
   *
   * @param {function} onError Callback function to execute when an individual resource couldn't be loaded correctly.
   */
  self.loadFromResourceList = function (onLoad, onError) {
    loading = true;
    
    $.getJSON(self.RESOURCE_LIST_URL, function (resourceList) {
      resourcesCount = self.countResourcesFromNode(resourceList);
      resourcesLoadCount = 0;
      singleErrorDetected = false;
      loadResourcesNode(resourceList, onLoad, onError);
      resources = resourceList;
    }).fail(function () {
      loading = false;
      
      if (typeof singleErrorDetectionListener == 'function') {
        singleErrorDetectionListener();
      }
      
      if (typeof onError == 'function') {
        onError();
      }
    });
  }
  
  /**
   * Counts all the resources URLs listed on the provided listNode and its child nodes.
   *
   * @param {Object|Array} listNode List object with all the String paths to count.
   *
   * @return {Number}.
   */
  self.countResourcesFromNode = function (listNode) {
    var count = 0;
    var reference, referenceType, key;
    
    for (key in listNode) {
      reference = listNode[ key ];
      referenceType = typeof reference;
      
      if (referenceType == 'object' || referenceType == 'array') {
        count += self.countResourcesFromNode(reference);
        
        continue;
      }
      
      count++;
    }
    
    return count;
  }
  
  /**
   * Load all the resources listed in the provided listNode through their respective paths.
   *
   * @param {Object|Array}   listNode List object with all the String paths to load and be replaced with the 
   * requested loaded resource.
   *
   * @param {function}       onLoad   Callback function to execute as soon as all the resources are correctly loaded.
   *
   * @param {function}       onError  Callback function to execute when an individual resource couldn't be loaded 
   * correctly.
   */
  function loadResourcesNode (listNode, onLoad, onError) {
    var reference, referenceType, key;
    
    for (key in listNode) {
      reference = listNode[ key ];
      referenceType = typeof reference;
      
      if (referenceType == 'object' || referenceType == 'array') {
        loadResourcesNode(reference, onLoad, onError);
        
        continue;
      }
      
      loadResource(reference, key, function (validResource, resourceKey, resource) {
        if (validResource) {
          listNode[ resourceKey ] = resource;
        } else {
          delete listNode[ resourceKey ];
        }
        
        resourcesLoadCount++;
        
        if (resourcesLoadCount >= resourcesCount) {
          loading = false;
          
          if (typeof onLoad == 'function') {
            onLoad();
          }
        }
      }, function () {
        loading = false;
        
        if (!singleErrorDetected) {
          singleErrorDetected = true;
          
          if (typeof singleErrorDetectionListener == 'function') {
            singleErrorDetectionListener();
          }
        }
        
        if (typeof onError == 'function') {
          onError();
        }
      });
    }
  }
  
  /**
   * Load an individual resource with a specific method depending on its extension checking if Object is invalid or 
   * shouldn't be loaded (in case resource is invalid it will be removed from list).
   *
   * @param {String}   resourceUrl Resource URL to load.
   *
   * @param {String}   resourceKey Keeps the key for the node reference so it wont lose with the loop.
   *
   * @param {function} onLoad      Callback function to execute as soon as the resource is loaded.
   *
   * @param {function} onError     Callback function to execute when the resource couldn't be loaded correctly.
   */
  function loadResource (resourceUrl, resourceKey, onLoad, onError) {
    var resourceExtension = self.checkResourceExtension(resourceUrl);
    
    if (resourceExtension == 'json') {
      loadJSONResource(resourceUrl, resourceKey, onLoad, onError);
    } else 
    if (resourceExtension == 'png' || resourceExtension == 'jpg' || resourceExtension == 'jpeg') {
      loadImageResource(resourceUrl, resourceKey, onLoad, onError);
    } else 
    if (resourceExtension == 'ogg' || resourceExtension == 'mp3') {
      loadAudioResource(resourceUrl, resourceKey, resourceExtension, onLoad, onError);
    } else {
      onLoad(false, resourceKey, null);
    }
  }
  
  /**
   * Returns the resource URL extension.
   *
   * @param  {String} resourceUrl Resource URL to check.
   *
   * @return {String}.
   */
  self.checkResourceExtension = function (resourceUrl) {
    var parts = resourceUrl.split('.');
    
    if (parts.length == 0) {
      return '';
    }
    
    return parts[ parts.length - 1 ].toLowerCase();
  }
  
  /**
   * Load a JSON resource with jQuery.
   *
   * @param {String}   resourceUrl      Resource URL to load.
   *
   * @param {String}   resourceKey      Keeps the key for the node reference so it wont lose with the loop.
   *
   * @param {function} onLoad           Callback  function to execute as soon as the resource is loaded.
   *
   * @param {function} onError          Callback function to execute when the resource couldn't be loaded correctly.
   */
  function loadJSONResource (resourceUrl, resourceKey, onLoad, onError) {
    $.getJSON(resourceUrl + '?time=' + $.now(), function (json) {
      onLoad(true, resourceKey, json);
    }).fail(function () {
      onError();
    });
  }
  
  /**
   * Load an image resource.
   *
   * @param {String}   resourceUrl Resource URL to load.
   *
   * @param {String}   resourceKey Keeps the key for the node reference so it wont lose with the loop.
   *
   * @param {function} onLoad      Callback function to execute as soon as the resource is loaded.
   *
   * @param {function} onError     Callback function to execute when the resource couldn't be loaded correctly.
   */
  function loadImageResource (resourceUrl, resourceKey, onLoad, onError) {
    var image = new Image;
    image.addEventListener('load', function (evt) {
      onLoad(true, resourceKey, image);
    }, false);
    
    image.addEventListener('error', function (evt) {
      onError();
    }, false);
    
    if (!loadCache) {
      resourceUrl += '?time=' + $.now();
    }
    
    image.src = resourceUrl;
  }
  
  /**
   * Load an audio resource (in case resource is rejected it will be removed from list).
   *
   * @param {String}   resourceUrl       Resource URL to load.
   *
   * @param {String}   resourceKey       Keeps the key for the node reference so it wont lose with the loop.
   *
   * @param {String}   resourceExtension We need to provide the resource extension in order to check if we should 
   * load it comparing the most suited checked audio extension.
   *
   * @param {function} onLoad            Callback function to execute as soon as the resource is loaded.
   *
   * @param {function} onError           Callback function to execute when the resource couldn't be loaded correctly.
   */
  function loadAudioResource (resourceUrl, resourceKey, resourceExtension, onLoad, onError) {
    if (resourceExtension != self.AUDIO_EXTENSION_TO_USE) {
      onLoad(false, resourceKey, null);
      
      return;
    }
    
    var audio = new Audio;
    audio.addEventListener('loadeddata', function (evt) {
      onLoad(true, resourceKey, audio);
    }, false);
    
    audio.addEventListener('error', function (evt) {
      onError();
    }, false);
    
    if (!loadCache) {
      resourceUrl += '?time=' + $.now();
    }
    
    audio.src = resourceUrl;
    audio.load();
  }
  
  init();
}


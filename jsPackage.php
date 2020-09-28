<?php
  
  header('Content-Type: text/javascript');
  
  define('PACKAGE_PATH', './');
  define('PACKAGE_NAME', 'SI');
  
  $IGNORED_DIRECTORIES  = array(
    PACKAGE_PATH . '/lib', 
    PACKAGE_PATH . '/dist'
  );
  
  /**
   * Includes all the JavaScript files into a single file.
   *
   * @param {String}  $dirPath            JavaScript package directory path.
   *
   * @param {String}  $packageName        Name of the JavaScript package.
   *
   * @param {Array}   $ignoredDirectories Array with the directories to ignore (and their sub-directories).
   *
   * @param {boolean} $printPackageNode   Tells whether packager should print each sub-directory as a JavaScript 
   * node declaration. NOTE: this feature only works when the provided directory path is written as a relative path 
   * (such as ../MyPackageName), this practice IS NOT GOING TO WORK AS DESIRED IF we use another path 
   * representation or backslashes, so be aware of that.
   *
   * @param {boolean} $isFirstNode        If $printPackageNode is set to true, then it tells how to output the 
   * JavaScript node declaration.
   */
  function jsPackage ($dirPath, $packageName, $ignoredDirectories = array(), $printPackageNode = true, $isFirstNode = true) {
    if (in_array($dirPath, $ignoredDirectories)) {
      return;
    }
    
    if ($printPackageNode) {
      $nodes    = explode('/', $dirPath);
      $nodes[1] = $packageName;
      
      if ($isFirstNode) {
        echo "var " . $nodes[1] . " = {};\n\r";
      } else {
        array_shift($nodes);
        $packageNode = implode('.', $nodes);
        
        echo $packageNode . " = {};\n\r";
      }
    }
    
    $dir = dir($dirPath);
    
    while (($fileName = $dir->read()) !== false) {
      if ($fileName == '.' || $fileName == '..') {
        continue;
      }
      
      $filePath = $dirPath . '/' . $fileName;
      
      if (is_dir($filePath)) {
        jsPackage($filePath, $packageName, $ignoredDirectories, $printPackageNode, false);
        
        continue;
      }
      
      $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
      
      if ($fileExtension != 'js') {
        continue;
      }
      
      echo file_get_contents($filePath);
    }
  }
  
  jsPackage(PACKAGE_PATH, PACKAGE_NAME, $IGNORED_DIRECTORIES);

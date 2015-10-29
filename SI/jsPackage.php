<?php
  
  header('Content-Type: text/javascript');
  
  define('PACKAGE_PATH', '../' . basename(dirname($_SERVER['SCRIPT_FILENAME'])));
  
  $IGNORED_DIRECTORIES  = array(
    PACKAGE_PATH . '/lib'
  );
  
  /**
   * Includes all the JavaScript files into a single file.
   *
   * @param {String}  $dirPath            JavaScript package directory path.
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
  function jsPackage ($dirPath, $ignoredDirectories = array(), $printPackageNode = true, $isFirstNode = true) {
    if (in_array($dirPath, $ignoredDirectories)) {
      return;
    }
    
    if ($printPackageNode) {
      $nodes = explode('/', $dirPath);
      
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
        jsPackage($filePath, $ignoredDirectories, $printPackageNode, false);
        
        continue;
      }
      
      $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
      
      if ($fileExtension != 'js') {
        continue;
      }
      
      echo file_get_contents($filePath);
    }
  }
  
  jsPackage(PACKAGE_PATH, $IGNORED_DIRECTORIES);
<?php
  
  header('Content-Type: application/json');
  
  /**
   * Returns a JSON Array that holds all the files paths within the current directory referring each with their
   * respective filename (no extension included). NOTE: parent directories references (../) are removed from each
   * path output for ensure the resource relativity with the parent directory.
   *
   * @param  {String} $dirPath Directory path to list.
   
   * @return {Array}.
   */
  function resourceList ($dirPath) {
    $list = array();
    $dir = dir($dirPath);
    
    while (($fileName = $dir->read()) !== false) {
      if ($fileName == '.' || $fileName == '..') {
        continue;
      }
      
      $filePath = $dirPath . '/' . $fileName;
      
      if (is_dir($filePath)) {
        $list[ $fileName ] = resourceList($filePath);
        
        continue;
      }
      
      $referenceName = pathinfo($fileName, PATHINFO_FILENAME);
      $list[ $referenceName ] = str_replace('../', '', $filePath);
    }
    
    return $list;
  }
  
  echo json_encode(resourceList('../' . basename(dirname($_SERVER['SCRIPT_FILENAME']))));
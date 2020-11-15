<?php
/*
filename: writeJSONpoints.php 
called by: Ajax in editpoints.js
points: Object with 2 items. 
date: 27 may 2020
author: RMD
<<<<<<< HEAD
modifications: 8 august 2020 added to github project
*/

if (isset($_POST["ourobject"])) {


#	// Decode our JSON into PHP objects we can use
	$a = $_POST["ourobject"];
	$b = json_decode($a, true);
//	var_dump($b);
	$message= "expect an error return at end" ;

	$datapath =		 $b['datapath'];
	$projectprefix= $b['projectprefix'];
	$version= 		 $b['versionIndex'];
	#print_r($version);
	$data = 			 $b['jsonfeatures'];
	$newfile = $datapath . $projectprefix . "_" . $version . ".json";


=======
*/

if (isset($_POST["points"])) {
#	// Decode our JSON into PHP objects we can use
	$a = $_POST["points"];
	$b = json_decode($a, true);
// print_r($b);

	$outputfile = $b[0]['outputfile'];
	
	$file = $outputfile;
	print_r($file);
	$data = $b[1]['jsonfeatures'];
>>>>>>> 9eb11f063b223b1300288b3601eef9daa543eb5d
	
//print output to console: print_r($b);
	 $message = "This will be overwritten; " ;
// do not overwrite file	
<<<<<<< HEAD
	if(file_exists ( $newfile ) ){
		$message = "Warning: File exists, no data written " . $newfile;
		
	} else {
		// write data to file
		if (file_put_contents($newfile, $data)){
		$message = "Data successfully saved to: " . $newfile;
		// error in writing data
		} else {
			$message = "Data write  unsuccessful: " . $newfile;
		}
	}
=======
//	if(file_exists ( $file ) ){
	//	$message = "Warning: File exists, no data written " . $file;
//	} else {
		// write data to file
		if (file_put_contents($file, $data)){
		$message = "Data successfully saved to: server" . $file;
		// error in writing data
		} else {
			$message = "Data write  unsuccessful: " . $file;
		}
	//}
>>>>>>> 9eb11f063b223b1300288b3601eef9daa543eb5d
}	else {
	$message = "Problem with AJAX post";	
	}
echo json_encode($message);

	?>



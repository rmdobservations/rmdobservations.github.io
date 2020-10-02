<?php
	$s = 'monkey';
$t = 'many monkeys';
$a = Array(3);
$abc = array("A", "B", "C");
var_dump($abc);

print_r("first element: " . $abc[0]);
#printf("\n");
#printf("[%s]\n",      $s); // standard string output
#printf("[%10s]\n",    $t); // right-justification with spaces
#printf("\n");
#var_dump($t)
	echo "-----";
foreach (glob("*.php") as $filename) {	echo "-----";
    echo "$filename size " . filesize($filename) . "\n";
}
	echo "-----";
$datapath="./data/json/" ;
$projectprefix="august28";
$file= "august28_2.json";
# extract the 2
	$result = glob($datapath . $projectprefix);
		echo "-----";
	print_r($result)
	

?> 
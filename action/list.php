<?php

$type="";
if(isset($_POST["type"])){
	$type = $_POST["type"];
}
$name = "";
if(isset($_POST["name"])){
	$name = $_POST["name"];
}

if($type==="Search"){

	if($name==="Meeting"){
		echo '{"result":"1","list":[{"id":"1","link":"tabs.html","inputs":{"date":"2014/02/22 14:00","cname":"UReach","location":"新竹市中正路1號"}},{"id":"2","link":"tabs.html","inputs":{"date":"2014/02/23 14:00","cname":"UReach","location":"新竹市中正路1號"}},{"id":"3","link":"tabs.html","inputs":{"date":"2014/02/26 14:00","cname":"UReach","location":"新竹市中正路1號"}}]}';
	}

}

?>

<?php

// 显示所有信息，默认显示 INFO_ALL
// phpinfo();
// Show just the module information. 仅仅显示PHP模块信息，
// phpinfo(8) 返回同样的结果。
// phpinfo(INFO_MODULES);


$type="";
if(isset($_POST["type"])){
	$type = $_POST["type"];
}
$name = "";
if(isset($_POST["name"])){
	$name = $_POST["name"];
}

$paths = explode('/', $name,2);

//var_dump($paths);
sleep(1);
if($paths[0]==="Task"){
	if($type==="New"){
		echo '{"result":"1","id":"13","user_hash":"201403221200"}';
	}else if($type==="Update"){
		echo '{"result":"1","user_hash":"201403221200"}';
	}else if($type==="Delete"){
		echo '{"result":"1","user_hash":"201403221200"}';
	}else if($type==="List"){
		//echo '{"result":"1","task_hash":"201403221200","user_hash":"201403221200","list":[{"owner":"me","id":"1","title":"防Heartbleed 美基金籲改密碼","description":"美國第3大共同基金管理公司Capital Group Cos.呼籲旗下80萬名客戶改變帳號密碼和其他資料，以防止他們自己受到Heartbleed電腦病毒所造成的風險危害。","state":"1","priority":"1","due_date":"2014/02/16","remind_date":"2014/04/22 20:20","comment":"","worker_id":"1","worker_name":"Shijie Wu","worker_state":"1","worker_comment":"處理完成","worker_remind_date":"2014/04/22 20:20"}]}';
		echo '{"result":"1","task_hash":"201403221200","user_hash":"201403221200","list":{"size":"4","items":[';
		echo '{"id":"12","role":"me","title":"防Heartbleed 美基金籲改密碼","description":"","state":"0","priority":"1","deadline":"2014/07/05 16:00","owner":{"id":"1","name":"Shijie Wu","state":"1","icon":"images/jobs.jpeg"},"link":"UReachFormTask.html"}';
		echo ',{"id":"23","role":"tracker","title":"防Heartbleed 美基金籲改密碼","description":"","state":"7","priority":"2","deadline":"2014/02/16 14:00","owner":{"id":"1","name":"Shijie Wu","state":"1","icon":"images/jobs.jpeg"},"member":{"size":"2","items":[{"id":"1","name":"System","state":"0","icon":""},{"id":"3","name":"Shijie Wu","state":"1"},{"id":"2","name":"Sony","state":"2"}]},"link":"UReachFormTask.html"}';
		echo ',{"id":"34","replycount":"15","role":"worker","title":"防Heartbleed 美基金籲改密碼","description":"","state":"0","priority":"3","deadline":"2014/02/17 13:00","owner":{"id":"12","name":"system","state":"1","icon":"images/girl.jpeg"},"member":{"size":"2","items":[{"id":"1","name":"HTC","state":"6","icon":""},{"id":"3","name":"Shijie Wu","state":"1"},{"id":"2","name":"Sony","state":"2"}]},"link":"UReachFormTask.html"}';
		echo ',{"id":"45","role":"worker","title":"防Heartbleed 美基金籲改密碼","description":"","state":"3","priority":"0","deadline":"2014/02/17 14:00","owner":{"id":"13","name":"jobs","state":"1","icon":"images/jobs.jpeg"},"member":{"size":"2","items":[{"id":"1","name":"HTC","state":"4","icon":""},{"id":"3","name":"Shijie Wu","state":"1"},{"id":"2","name":"Sony","state":"2"}]},"link":"UReachFormTask.html"}';
		echo ']}}';

	}else if($type==="Select"){
		if($name==="Task/Hash")
			echo '{"result":"1","task_hash":"201403221200","user_hash":"201403221200"}';	
		else 
			echo '{"result":"0","message":"Not Support!"}';	
	}else{
		echo '{"result":"0","message":"Param Error"}';
	}
}else if($paths[0]==="Exhibit"){
	if($type==="New"){
		if(count($paths)===1){
			echo '{"result":"1","id":"13"}';
		}		
		else if($name==="Exhibit/CheckList"){
			$text = sprintf('{"result":"%d","checklist":[{"id":"%d"}]}',1 ,rand ( 100, 1000000));
			echo $text;
		}
		else if($name==="Exhibit/Company/Item"){
			$text = sprintf('{"result":"%d","id":"%d"}',1 ,rand ( 100, 1000000));
			echo $text;
		}

	}else if($type==="Update"){
		echo '{"result":"1"}';

	}else if($type==="Delete"){
			
		if(count($paths)===1){
			echo '{"result":"1"}';
		}else if($name==="Exhabit/CheckList"){
			$text = sprintf('{"result":"%d"}',1 );
			echo $text;
		}else if($name==="Exhabit/Company/Item"){
			$text = sprintf('{"result":"%d"}',1 );
			echo $text;
		}
	}
}else if($paths[0]==="CheckList"){
	if($type==="Update"){
		echo '{"result":"1"}';
	}
}else if($paths[0]==="Employee"){

	if($type==="New"){
			$text = sprintf('{"result":"%d","member_id":"%d"}',1 ,rand ( 100, 1000000));
			echo $text;
	}	

}else if($paths[0]==="Company"){
	if($type==="New"){
		if($name==="Company/Contact/Item"){
			$text = sprintf('{"result":"%d","id":"%d"}',1 ,rand ( 100, 1000000));
			echo $text;
		}else{
			$input_name = "";
			if(isset($_POST["input_name"])){
				$input_name = $_POST["input_name"];
			}
			if($input_name==="Bestwise"){
				echo '{"result":"0","message":"無法建立已存在客戶!"}';	
			}else{
				echo '{"result":"1","company_id":"1","cname":"JStudio","ename":"JStudio","country_id":"1"}';
			}
		}
	}else if($type==="Update"){
		echo '{"result":"1"}';
	}else if($type==="Delete"){
		echo '{"result":"1"}';
	}else if($type==="Search"){
		echo '{"result":"1","pages":{"count":"25","start":"0","total":"1024"},"list":[{"id":"1","link":"UReachFormMeeting.html","inputs":{"level":"2","cname":"JS工作室 1","ename":"JStudio","address":"新竹市浸水南街84巷78號","note":"星期二記得要 QQQQQQQQQQ<br/>打球喜歡喝咖啡 AAAAAA"}},{"id":"2","link":"UReachFormCompany.html","inputs":{"level":"2","cname":"JS工作室","ename":"JStudio","address":"新竹市浸水南街84巷78號","note":"星期二記得要<br/>打球喜歡喝咖啡"}},{"id":"3","link":"UReachFormExhibit.html","inputs":{"cname":"JS工作室 2","ename":"JStudio 3","address":"新竹市浸水南街84巷78號","note":"星期二記得要<br/>打球喜歡喝咖啡"}},{"id":"4","link":"UReachFormPreview.html","inputs":{"cname":"JS工作室","ename":"JStudio","address":"新竹市浸水南街84巷78號","note":"星期二記得要<br/>打球喜歡喝咖啡"}}]}';
	}
}else if($paths[0]==="Forum"){
	if($type==="Search"){ 
		echo '{"result":"1","pages":{"count":"25","start":"0","total":"1024"},"list":[{"id":"1","link":"UReachFormPreview.html","inputs":{"category":"1","author":"JS工作室 1","subject":"JStudio First Post Taipei 2011","replies":"1","last_post":"2014/06/23"}},{"id":"2","link":"icons.html","inputs":{"category":"2","author":"JS工作室 1","subject":"JStudio First Post Taipei 2012","replies":"2","last_post":"2014/06/24"}},{"id":"3","link":"icons.html","inputs":{"category":"3","author":"JS工作室 1","subject":"JStudio First Post Taipei 2013","replies":"3","last_post":"2014/06/25"}},{"id":"4","link":"icons.html","inputs":{"category":"4","author":"JS工作室 1","subject":"JStudio First Post Taipei 2014","replies":"4","last_post":"2014/06/26"}},{"id":"5","link":"icons.html","inputs":{"category":"5","author":"JS工作室 1","subject":"JStudio First Post Taipei 2015","replies":"5","last_post":"2014/06/27"}}]}';
	}
}else if($paths[0]==="Meeting"){
	if($type==="New"){

		if($name==="Meeting"){
			echo '{"result":"1","meeting_id":"1","company_id":"1","company_name":"JStudio","establish_date":"2014/03/05 14:00"}';
		}
		else if($name==="Meeting/Event/Item")
		{
			$text = sprintf('{"result":"%d","id":"%d","inputs":"{}"}',1 ,rand ( 100, 1000000));
			echo $text;
		}
	}else if($type==="Update"){
		echo '{"result":"1"}';
	}else if($type==="Delete"){
			$text = sprintf('{"result":"%d"}',1);
			echo $text;
	}
}
else if($type==="Unknown"){
	echo '{"result":"1"}';
}
else{
	echo '{"result":"0","message":"Unknow Error"}';
}

?>
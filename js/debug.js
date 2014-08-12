/*!
 * Bootstrap Custom Sample
 * Copyright 2014 JStudio
 * Licensed under MIT
 */

function debugMessage(text){
	var debug=true;
	if(debug){
		console.log(text);
	}
}


function Debug(){
	this.log=function(text){
		console.log(text);
	};

	this.e = function (text) {
		console.log(text);	
	};

	this.i = function (text) {
		console.log(text);	
	};

	this.w = function (text) {
		console.log(text);	
	};
}

var Debug = new Debug();

/*
	日期:20140718
	說明:common-api 
*/
(function($) { 
	'use strict';

	//base64 encode / decode 
	$.JSBase64 ={
		encode:function( str ) {
	  	return window.btoa(encodeURIComponent( escape( str )));
	  	//return window.btoa( str );
	  },
		decode:function( str ) {
	  	return unescape(decodeURIComponent(window.atob( str )));
	  	//return window.atob( str );
		}
	}

	$.JSInitJsonParse = function(initJson){
		var rcJson={};
		$.extend(rcJson,initJson);

		if(rcJson.base64){
			delete rcJson.base64;
			for(name in rcJson){
				if(name==="result"||name==="message"||name==="initial"||name==="type"||name==="base64"){

				}else{
					rcJson[name]=$.JSApiJSonBase64.decode(rcJson[name]);	
				}
			}
		}
		return rcJson;
	}

	// JSON PARSE
	$.JSApiJSonParse=function(json){
		var rcJson={result:"0",message:"Unknown"};
		try{
			rcJson = JSON.parse(json);
		}catch(e){
			rcJson={result:"0",message:"JSON Parse Error<br>@:"+e};
			console.log(json);
		}

		try{
			if(rcJson.base64){
				delete rcJson.base64;
				for(name in rcJson){
					if(name==="result"||name==="message"||name==="initial"||name==="type"||name==="base64"){

					}else{
						rcJson[name]=$.JSApiJSonBase64.decode(rcJson[name]);	
					}
				}
			}
		}catch(e){
			rcJson={result:"0",message:"JSON Parse Base64 Error<br>@:"+e};
			console.log(json);
		}

		return rcJson;
	}
	
	// Api Base64 編碼
	$.JSApiJSonBase64 = {

		encode:function(json){
			var type = typeof(json);
			//console.log(type);
			if(type==='string'){
				json=$.JSBase64.encode(json);
				//console.log(json);
			}else if(type==='object'){
				if($.isArray(json)){
					for(var i = 0 ; i < json.length;i++){
						json[i] = $.JSApiJSonBase64.encode(json[i]);	
					}
				}else{
					for(name in json){
						json[name] = $.JSApiJSonBase64.encode(json[name]);
					}		
				}		
			}
			return json;
		},
		decode:function(json){
			var type = typeof(json);
			if(type==='string'){
				json=$.JSBase64.decode(json);
				//console.log(json);
			}else if(type==='object'){
				if($.isArray(json)){
					for(var i = 0 ; i < json.length;i++){
						json[i] = $.JSApiJSonBase64.decode(json[i]);	
					}
				}
				else{
					for(name in json){
						json[name] = $.JSApiJSonBase64.decode(json[name]);
					}		
				}		
			}
			return json;
		}
	}

	//begin-> success/error -> always
	$.JSApiPost = {
	  direct:function(api,postData,callback){
	  	console.log("****POST******");
	  	console.log(postData);
	    callback("begin",null);
	    $.post(api,postData)
	      .done(function(rc) {
	        var rcJson = $.JSApiJSonParse(rc);
	        console.log("****RETURN****");
	        console.log(rcJson);

	        if(rcJson.result==="1"){
	          callback("success",rcJson);
	        }else{
	          callback("fail",rcJson);
	        }  
	      })
	      .fail(function(e) {
	        var rc={title:stringMap.Message,description:e};
	        callback("error",rc);
	      })
	      .always(function() {
	        callback("end",null);
	    }); 
	  },
	  // 使用loading介面
	  block:function(api,postData,callback){
	    var loader = $.JSUiFactory("circular3d-loader");
	    $("body").append(loader); 

	    callback("begin",null);

	    loader.fadeIn( 1000 ,function(){
	    	console.log("****POST******");
	  		console.log(postData);
	      $.post(api,postData)
	        .done(function(rc) {
	          var rcJson = $.JSApiJSonParse(rc);

		        console.log("****RETURN****");
		        console.log(rcJson);

	          if(rcJson.result==="1"){
	            callback("success",rcJson);
	          }else{
	            callback("fail",rcJson);
	          }                  
	        })
	        .fail(function(e) {
		        var rc={title:stringMap.Message,description:e};
		        callback("error",rc);
	        })
	        .always(function() {
	          loader.fadeOut(1000,function(){
	            $(this).remove();
	          });
	          callback("end",null); 
	        }); 
	    }); 
	  }
	}
}(window.jQuery || window.$));

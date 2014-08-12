/*
作者:shijie
日期:20140308
說明:input controller 
修改日:20140326
*/

(function($) { 
'use strict';
/*input-group For JsTable*/

$.fn.JSInputGroup = function(options) {
	var parent = $(this);

	if(options.act&&options.act==="Update"){
		var value = options.value;
		var input = parent.find("[name=inputText]");
		input.val(value);
		return;
	}

	parent.html("");

	var group= $("<div>");

	group.append(input);

	group.addClass("input-group");

	var input = $("<input type='text' class='form-control' style='white-space:nowrap'>");

	group.append(input);

	if(options.placeholder!==undefined){
		input.attr("placeholder",options.placeholder); 
	}

	if(options.name!==undefined){
		input.attr("name",options.name);
	}

	if(options.id!==undefined){
		input.attr("id",options.id);
	}

	if(options.buttons){
		for(var i=0;i<options.buttons.length;i++){
			var obtn =  options.buttons[i];
			var btn = $('<span class="input-group-addon btn">');
			var type=(obtn.type)?obtn.type:"button";
			
			if(obtn.iconCssClass){
				var si=$("<i>");
				si.addClass(obtn.iconCssClass);
				btn.append(si);		
			}

			if(obtn.title){
				if(btn.find("i").length){
					btn.append("&nbsp;");
				}

				var span = $("<span>");
				span.html(obtn.title);
				btn.append(span);
			}

			if(obtn.cssClass!==undefined){
				btn.addClass(obtn.cssClass);
			}

			if(obtn.id!==undefined){
				btn.attr("id",obtn.id);
			}

			if(obtn.name!==undefined){
				btn.attr("name",obtn.name);
			}

			if(obtn.group!==undefined){
				btn.attr("group",obtn.group);
			}

			if(obtn.click!==undefined){
				btn.click(obtn.click);
			}

			group.append(btn);
		};	
	}

	input.on("keyup",function(event){	
		if(event.keyCode === 13&&event.shiftKey){
			if(options.StateCallback!==undefined){
  			options.StateCallback({state:"ENTER",input:input});		
  		}
		}	
	});

	parent.append(group);
}

$.fn.JSAutoComplete = function(options){
	try{
		$(this).AutoCompleteInput(options);
	}catch(e){
		console.log(e);
	}
}

$.fn.AutoCompleteInput = function(options) {
	
	var parent = $(this);

	function UpdateState(state){

		var ui=parent.find(".input-group-addon");
		//console.log(ui);
		if(ui.length){
							
			if(state==="ok"||state==="error"||state==="loading"){	
				ui.JSRemoveClass("state-*","state-"+state);
			}else{
				ui.JSRemoveClass("state-*","");
			}
		}
		return;
	}

	if(options.act&&options.act==="Update"){
		var name = options.value.name;
		var id   = options.value.id;

		UpdateState("ok");

		var input = THIS.find("[name=inputText]");
		input.val(name);
    input.attr("select_id",id);
		return;
	}

	var minLength = (options.minLength!==undefined)?options.minLength:2;
	var ospan = (options.stateSpan!==undefined)?options.stateSpan:{};
	var stateOK=(ospan.okCssClass!==undefined)?ospan.okCssClass:"fa fa-check";
	var stateError=(ospan.errorCssClass!==undefined)?ospan.errorCssClass:"fa fa-times";
	var stateLoading=(ospan.loadingCssClass!==undefined)?ospan.loadingCssClass:"effect-rotate fa fa-repeat";

	parent.html("");
	
	var group= $("<div>");
	
	var stateSpan= $("<span class='input-state input-group-addon'>");

	var spanOk = $("<i class='state-ok'></i>");
	spanOk.addClass(stateOK);
	var spanError = $("<i class='state-error'></i>");
	spanError.addClass(stateError);
	var spanLoading = $("<i class='state-loading'></i>");
	spanLoading.addClass(stateLoading);

	stateSpan.append(spanOk);
	stateSpan.append(spanError);
	stateSpan.append(spanLoading);

	var input = $("<input type='text' class='form-control' style='white-space:nowrap'>");

	if(options.placeholder!==undefined){
		input.attr("placeholder",options.placeholder); 
	}

	if(options.name!==undefined){
		input.attr("name",options.name);
	}

	if(options.id!==undefined){
		input.attr("id",options.id);
	}

	if(options.stateSpan!==undefined){
		var opState=options.stateSpan;
		if(opState.position||opState.position==="front"){
			group.append(stateSpan);
			group.append(input);
		}else{
			group.append(input);
			group.append(stateSpan);
		}
		group.addClass("input-group");
	}else{
		group.append(input);''
	}

	if(options.buttons){
		for(var i=0;i<options.buttons.length;i++){
			var obtn =  options.buttons[i];
			var btn = $('<span class="input-group-addon btn">');
			var type=(obtn.type)?obtn.type:"button";
			
			if(obtn.iconCssClass){
				var si=$("<i>");
				si.addClass(obtn.iconCssClass);
				btn.append(si);		
			}

			if(obtn.title){
				if(btn.find("i").length){
					btn.append("&nbsp;");
				}

				var span = $("<span>");
				span.html(obtn.title);
				btn.append(span);
			}

			if(obtn.cssClass!==undefined){
				btn.addClass(obtn.cssClass);
			}

			if(obtn.id!==undefined){
				btn.attr("id",obtn.id);
			}

			if(obtn.name!==undefined){
				btn.attr("name",obtn.name);
			}

			if(obtn.group!==undefined){
				btn.attr("group",obtn.group);
			}

			if(obtn.click!==undefined){
				btn.click(obtn.click);
			}

			group.append(btn);
		};	
	}

	parent.append(group);

	// 暫存id及名稱
	var AutoCompleteCache = {};	

	// 設定cache暫存值
	if(options.values){
		for(var i = 0 ; i < options.values.length;i++){
			AutoCompleteCache[options.values[i].name.toLowerCase()]=options.values[i];
		}
	}

	function CheckInput(){
		var name=input.val();
		
		if(options.novalidate!==undefined){
			if(name.length>=minLength){
				options.StateCallback({state:"OK",input:input});	
				return true;
			}else {
				options.StateCallback({state:"ERROR",input:input});	
				return false;
			}
		}

		var obj = AutoCompleteCache[name.toLowerCase()];
		if(obj!=undefined && name!==""){
			UpdateState("ok");

			input.val(obj.name);
      input.attr("select_id",obj.id);

      if(options.StateCallback!==undefined){
      	options.StateCallback({state:"OK",input:input});		
      }
      return true;
		}else{
			input.removeAttr("select_id");

			if(name.length<minLength){
				UpdateState("");
	      if(options.StateCallback!==undefined){
	      	options.StateCallback({state:"NONE",input:input});		
	      }
			}else{
				UpdateState("error");
				if(options.StateCallback!==undefined){
      		options.StateCallback({state:"ERROR",input:input});		
      	}
			}
		}
		return false;
	}

	if(options.autocomplete){
		var opAuto = options.autocomplete;
		input.autocomplete({
	    minLength:minLength,
	    source: function( request, response ) {
				var api = opAuto.api;
				console.log("url:"+api);
				UpdateState("loading");

				if(options.StateCallback!==undefined){
	    		options.StateCallback({state:"LOADING",input:input});		
	    	}

		  	opAuto.postData["term"]=request.term;
		  	console.log(opAuto.postData);
		  	$.post(api,opAuto.postData)
				  .done(function(rc) {
				  	var json = JSON.parse(rc);	
				  	console.log(json);
					  if(parseInt(json.result)!=1){
					  	console.log("Error:"+api);
					  	return;
					  }	
						var list = [];
					  for(var i=0;i<json.list.length;i++){
					  	var item = json.list[i];
							if(item.id!==undefined && item.name!==undefined){
					  		var data = {id:item.id,label:item.name};
					  		list.push(data);
					  		AutoCompleteCache[item.name.toLowerCase()]=item;
					  	}
						}

					  response(list);
				  })
				  .fail(function() {
						console.log("AutoComplete:Fail");
				  })
				  .always(function() {
				  	CheckInput();	
					}
				);	
	    },
	    select: function( event, ui ) {
	      var label = ui.item.label;
	      var id = ui.item.id;
	      $(this).val(label);
	      $(this).attr("select_id",id);
	      CheckInput();	       
	      return false;
	    }
	  });
	}
	group.find(".ui-helper-hidden-accessible").remove();
	
	input.on("focusout", function(){
		CheckInput();
	});

	input.on("keyup",function(event){	
		if(CheckInput()===true){
			if(event.keyCode === 13&&event.shiftKey){
				if(options.StateCallback!==undefined){
    			options.StateCallback({state:"ENTER",input:input});	
    			event.preventDefault();	
    		}
  		}
		}		
	})

	input.on("change",function(){
		if(input.val()===""){
			CheckInput();
		}
	});

	CheckInput();
}	

}(window.jQuery || window.$));

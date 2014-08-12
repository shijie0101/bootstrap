/*
作者:shijie
日期:20140426
說明:button controller */

/*
// switch button
$(".btn-switch").SwitchButton({options:{on:"ON",off:"OFF",active:"off",action:"collapse"}});
*/

(function($) { 
'use strict';
$.fn.JSToolbar = function(json){
	//console.log(json);
	if(json.title!==undefined){
		var uiTitle=$("<span class='title' style='float:left'></span>");
		uiTitle.html(json.title);
		$(this).append(uiTitle).append("&nbsp;&nbsp;");
	}else{
		$(this).html("");
	}

	var tempBtn = $("<button type='button' class='btn'>");

	var right = undefined;

	var space=true;

	if(json.space&&json.space==="none"){
		space=false;
	}

	for(var i=0;i<json.buttons.length;i++){
		var obtn =  json.buttons[i];
		var btn = null;
		var btnG= null;
		var type=(obtn.type)?obtn.type:"button";
		
		if(type==="select"){
			btn = $('<select type="select" class="btn">');

			if(obtn.options!==undefined){
				for(var x=0 ; x<obtn.options.length;x++){
					var op = obtn.options[x];
					btn.append($.sprintf("<option value='%s'>%s</option>",op.value,op.text));
				}   
			}

			if(obtn.value){
				btn.val(obtn.value);
			}

			btnG=btn;

		}else if(type==="popmenu"){

			btnG = $('<div class="btn-group">');

			var btn=tempBtn.clone();
			btn.addClass("dropdown-toggle");
			btn.attr("data-toggle","dropdown");
			btnG.append(btn);

			var menu = $('<ul class="dropdown-menu" role="menu">');

			if(obtn.items){

				for(var x=0 ; x<obtn.items.length;x++){
					var op = obtn.items[x];

					if(op.type==="divider"){
						menu.append('<li type="divider" class="divider">');
					}else{
						menu.append($.sprintf("<li type='item' value='%s' name='%s'><label>%s</label></li>",op.value,op.name,op.text));
					}
				}  		
			}

			btnG.append(menu);
		}else{
			btn = tempBtn.clone();
			btnG=btn;
		}

		if(obtn.iconCssClass){
			var si=$("<i>");
			si.addClass(obtn.iconCssClass);
			btn.append("&nbsp;");
			btn.append(si);
			btn.append("&nbsp;");		
		}

		if(obtn.title){
			var span = $("<span class='title'>");
			if(btn.find("i").length){
				span.addClass("hide-sm-size");			
				btn.find("i").tooltip({
					placement:"bottom",
					title:obtn.title
				});
			}
		
			span.html(obtn.title);

			btn.append(span);
		}	

		if(obtn.cssClass){
			btn.addClass(obtn.cssClass);
		}

		if(obtn.dataTarget){
			btnG.attr("data-target",obtn.dataTarget);	
		}

		if(obtn.id!==undefined){
			btnG.attr("id",obtn.id);
		}

		if(obtn.name!==undefined){
			btnG.attr("name",obtn.name);
		}

		if(obtn.group!==undefined){
			btnG.attr("group",obtn.group);
		}

		if(obtn.click!==undefined){
			if(type==="popmenu"){
				btnG.find("li[type=item]").click(obtn.click);
			}else{
				btn.click(obtn.click);
			}
		}

		if(obtn.change){
			btn.change(obtn.change);
		}
	
		if(obtn.tooltip){
			btnG.tooltip(obtn.tooltip);
		}
	
		if(obtn.data){
			btn.data("data",obtn.data);
		}
	

		if(obtn.pullRight!==undefined){

			if(right===undefined){
				right = $("<div>");
				right.addClass("pull-right");
				$(this).append(right);
				right.append(btnG);
			}else{
				if(space)
					right.append("&nbsp;"); 
				right.append(btnG);
			}			
		}else{
			$(this).append(btnG);
			if(space)
			  $(this).append("&nbsp;");
		}
	};
}

$.fn.JSSearchbar = function(json){

	$(this).html("");
	var inputGroup = $("<div class='input-group'>");
	var input = $("<input type='search' class='form-control'>");
	inputGroup.append(input);

	if(json.placeholder!==undefined){
		input.attr("placeholder",json.placeholder);
	}

	if(json.id!==undefined){
		input.attr("id",json.id);
	}

	if(json.name!==undefined){
		input.attr("name",json.name);
	}

	if(json.group!==undefined){
		input.attr("group",json.group);
	}

	var inputGroupBn=undefined;

	for(var i=0;i<json.buttons.length;i++){
		var obtn =  json.buttons[i];

		var btn = $("<span class='input-group-addon btn'>");
		btn.html(obtn.title);
	
		if(obtn.iconCssClass!==undefined){
			var si=$("<i>");
			si.addClass(obtn.iconCssClass);
			btn.append(si);
		}

		if(obtn.cssClass!==undefined){
			btn.addClass(obtn.cssClass);
		}

		if(obtn.dataTarget!==undefined){
			btn.attr("data-target",obtn.dataTarget);	
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

		inputGroup.append(btn);		
	};

	$(this).append(inputGroup);
}

$.fn.SwitchButton = function(json){
	var on="ON";
	var off="OFF";
	var action="collapse";
	var def_act="on";

	if(json!=null||json!=undefined){
		
		var op = json.options;
		if(op!=undefined){
			if(op.on!=undefined){
				on = op.on;
			}
			if(op.off!=undefined){
				off = op.off;
			}
			if(op.action!=undefined){
				action = op.action;
			}
			if(op.active!=undefined){
				def_act = op.active;
			}
		}
		
	}

	var wbn = $(this);
	if(wbn.hasClass("btn-group")==false){
		wbn.addClass("btn-group");
		wbn.addClass("btn-group-xs");
	}

	var target = wbn.attr("data-target");
	
	wbn.html("");

	wbn.append('<span class="btn" action="on" style="margin:0px">ON</span>');
	
  wbn.append('<span class="btn" action="off" style="margin:0px">OFF</span>');

  wbn.find("[action=on]").text(on);
  wbn.find("[action=off]").text(off);

  
  wbn.find("span").each(function(){
  	if(def_act===$(this).attr("action")){
  		$(this).addClass("btn-info");
  		$(this).addClass("active");
  	}else{
  		$(this).addClass("btn-default");
  	}
  });

	if(action==="collapse"){
	  if("on"===def_act){
	  	$( target ).show();
	  }else{
	  	$( target ).hide();
	  }
	}

	wbn.find("span").click(function() {
	  wbn.find('.btn').toggleClass('active');  	  
	  if (wbn.find('.btn-primary').size()>0) {
	  	wbn.find('.btn').toggleClass('btn-primary');
	  }
	  if (wbn.find('.btn-danger').size()>0) {
	  	wbn.find('.btn').toggleClass('btn-danger');
	  }
	  if (wbn.find('.btn-success').size()>0) {
	  	wbn.find('.btn').toggleClass('btn-success');
	  }
	  if (wbn.find('.btn-info').size()>0) {
	  	wbn.find('.btn').toggleClass('btn-info');
	  }
	  wbn.find('.btn').toggleClass('btn-default');

	  var bn=wbn.find(".active").attr("action");
	  
	  if(action==="collapse"){
	  	var effectOptions={};
		  if("on"===bn){
		  	$( target ).show( "clip",effectOptions, 200 ,null);
		  }else{
		  	$( target ).hide( "clip",effectOptions, 200 ,null);
		  }
		}
	});

}

}(window.jQuery || window.$));
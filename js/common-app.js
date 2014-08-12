/* JSApplication*/

(function($) { 
'use strict';

$.JSApp = {
	Create:function(type,options){

		//重要! Callback
		window.Callback = {};

		window.Callback.FromChild = function (data) {

			if(options.FromChild && options.FormChild(data)){
				return true;
			}
		  if(data.act==="Return"){
		  	$.JSApp.ToggleView("PrimaryView");
		  	return true;  	
		  }else if(data.act==="FrameLoaded"){
		    $("#SecondaryView").attr("frame-name",data.frame.name);
		    $.JSApp.ToggleView("SecondaryView");
		    $.JSApp.LoadingView(false);
		    return true;
		  }else if(data.act==="FrameError"){
		    $.JSApp.LoadingView(false);       
		  }else if(data.act==="GetParent"){
		    data.parent.push(mFrame);
		  }

			return $.JSApp.CallParent(data);
		};

		window.Callback.FromParent = function (data) {

			if(options.FromChild && options.FormChild(data)){
				return true;
			}

		  if(data.act==="GetChild"){
		    data["child"].push(mFrame); 
		  }
		  return $.JSApp.CallChild(data);
		};
		
		var container=$("<div class='cbp-box'>");
		$("body").html("");
		$("body").append(container);

		if(options.background){
			container.addClass(options.background);
		}
	
		var primary   = $('<div id="PrimaryView" class="cbp cbp-box">');
		var secondary = $('<div id="SecondaryView" class="cbp cbp-box cbp-close">');
		var menu      = $('<div id="FrameMenuView" class="cbp cbp-box-ss cbp-close">');

		container.append(primary);
		container.append(secondary);
		container.append(menu);

		if(options.effect){
			primary.addClass("cbp-left");
			secondary.addClass("cbp-right");
		}else{
			primary.addClass("disable-effect");
			secondary.addClass("disable-effect");
		}

		if(type==="BasicView"){
			primary.append(
			'<div class="inner-vertical">'+
      	'<div id="EntryView"><h2 class="page-title"></h2><div class="formContainer"></div></div>'+
      	'<div id="BasicInfoView"><h2 class="page-title"></h2><div class="formContainer"></div></div>'+
      '</div>');	

      primary.find(".inner-vertical").children().hide();
		}
	},
	Destroy:function(){
		return false;
	},
	GetLocalStorage:function(id){
		return false;
	},
	UpdateLocalStorageItem:function(id,data){
		return false;
	},
	CallParent:function(data){
		if(window!==window.parent&&window.parent.Callback){
  		window.parent.Callback.FromChild(data);
  	}
	},
	CallChild:function(data){
		var f = document.getElementById('ContainIFrame');
	  if(f){
	    var fContent = f.contentWindow || f.contentDocument;
	    fContent.Callback.FromParent(date);
	  }
	},
	// 通知事件定
	Notification:function (postData){
	  return $JSApp.CallParent({act:"Notification",data:postData});
	},
	//
	ToggleView:function(viewName){
		if(viewName==="PrimaryView"){
			$("#PrimaryView").removeClass("cbp-close");
		  $("#SecondaryView").addClass("cbp-close");
		  var btn = $.JSApp.Menu("FrameBackBn");
		  if(btn){
		  	btn.JSRemoveClass(btn.attr("Back"),btn.attr("Return")).attr("target","Return");
		  }
		  return $("#PrimaryView"); 
		}else if(viewName==="SecondaryView"){
			$("#PrimaryView").addClass("cbp-close");
		  $("#SecondaryView").removeClass("cbp-close");
		  var btn = $.JSApp.Menu("FrameBackBn");
		  if(btn){
		  	btn.JSRemoveClass(btn.attr("Return"),btn.attr("Back")).attr("target","Back");
		  }
		  return $("#SecondaryView");
		}
		return null;
	},
	// Iframe Link
	LinkFrame:function(src,options){
	  var opt = (options)?options:{direct:false};

	  if($('#SecondaryView #ContainIFrame').length===0){
	   $('#SecondaryView').append('<iframe id="ContainIFrame" frameborder="0" class="frame">'); 
	  }

	  if(opt.direct){
	    $.JSApp.ToggleView("PrimaryView");
	    $('#SecondaryView #ContainIFrame').attr("src",src); 
	  }else if(opt.newPage){
	    $.JSApp.CallParent({act:"Link",data:{link:src,newPage:true}});
	  }else if(opt.askNewPage){ 
	    $.JSApp.CallParent({act:"Link",data:{link:src,askNewPage:true}});
	  }else{
	    $.JSApp.LoadingView(true);
	    $('#SecondaryView #ContainIFrame').attr("src",src); 
	  }
	  return true;
	},
	View:function(select){
		if(select==="PrimaryView")
			return $("#PrimaryView");
		else if(select==="SecondaryView")
			return $("#SecondaryView");
		else if(select==="FrameMenuView")
			return $("#FrameMenuView");
		else{
			var view = $("#"+select);
			if(view.length){
				return view;
			}
		}
		return null;
	},
	LoadingView:function(show){
		return $.JSUiShowLoadingView(show); 
	},
	ReturnFrame:function(frameData){
		$.JSApp.CallParent({act:"Return",frame:frameData});
	},
	Menu:function(name){
		return $("#FrameMenuView [name="+name+"]");
	},
	SetTitle:function(text){
		var menu  = $("#FrameMenuView");
		if(menu.length===0){
			return false;
		}
		menu.find(".title").html(text);

		return true;
	},
	CreateMenu:function(menuJson){
		var position = (menuJson.position)?menuJson.position:"left";
		
		var primary   = $("#PrimaryView").addClass("padding-left-ss");
		var secondary = $("#SecondaryView").addClass("padding-left-ss");		
		var menu      = $("#FrameMenuView");

		if(menu.length===0){
			return false;
		}

		if(position==="left"){
			menu.JSRemoveClass("cbp-right cbp-top cbp-bottom","cbp-left");
			primary.JSRemoveClass("padding-*","padding-left-ss");
			secondary.JSRemoveClass("padding-*","padding-left-ss");		
		}else if(position==="top"){
			menu.JSRemoveClass("cbp-right cbp-left cbp-bottom","cbp-top");
			primary.JSRemoveClass("padding-*","padding-top-ss");
			secondary.JSRemoveClass("padding-*","padding-top-ss");		
		}else if(position==="right"){
			menu.JSRemoveClass("cbp-left cbp-top cbp-bottom","cbp-right");
			primary.JSRemoveClass("padding-*","padding-right-ss");
			secondary.JSRemoveClass("padding-*","padding-right-ss");		
		}else if(position==="bottom"){
			menu.JSRemoveClass("cbp-right cbp-left cbp-top","cbp-bottom");
			primary.JSRemoveClass("padding-*","padding-bottom-ss");
			secondary.JSRemoveClass("padding-*","padding-bottom-ss");		
		}

		menu.JSRemoveClass("cbp-close","bg-frame-menu");
		menu.html("");

		var backBn = $("<span name='FrameBackBn' class='icon'>");

		backBn.attr("Back","fa fa-sign-in");
		backBn.attr("Return","fa fa-sign-out rotation-180");

		backBn.click(function(){
			if($(this).attr("target")==="Back"){
				$.JSApp.ToggleView("PrimaryView");
			}else if($(this).attr("target")==="Return"){
				$.JSApp.ReturnFrame(menuJson.frame);
			}
		});

		menu.append(backBn);

		for(var i=0 ;i< menuJson.items.length;i++){
			var icon = menuJson.items[i];
			var ui = $("<span class='icon'>");
			menu.append(ui);
			
			if(icon.name){
				ui.attr("name",icon.name);
			}
			if(icon.cssClass){
				ui.addClass(icon.cssClass);
			}
			if(icon.click){
				ui.click(icon.click);
			}
		}

		if(menuJson.title){
			var ui = $("<span class='text title'>");
			if(position==="left"||position==="right"){
				ui.addClass("vertical-text");
			}
			ui.html(menuJson.title);
			menu.append(ui);
		}

	  return true;
	},
	//更新page控制狀態 //loading - ok - error 
	UpdateViewControlState:function (formName,state){
	  if(state==="loading"){
	    $("#ViewControl .navigation").find("[data-target="+formName+"] .state").html('<span class="fa fa-refresh effect-rotate">');
	  }else if(state==="ok"){
	    $("#ViewControl .navigation").find("[data-target="+formName+"] .state").html('<span class="fa fa-check">');
	  }else if(state==="error"){
	    $("#ViewControl .navigation").find("[data-target="+formName+"] .state").html('<span class="fa fa-times">');
	  }else{
	    $("#ViewControl .navigation").find("[data-target="+formName+"] .state").html("");
	  }
	},
	// 建立form分頁控制列
	CreateViewControl:function(formJson){

		var primary = $.JSApp.View("PrimaryView");

		if(primary.find("#ViewControl").length===0){
			primary.append('<div id="ViewControl" class="navbar-fixed-bottom"><div class="navigation"></div></div>');
		}

		$("#ViewControl .navigation").html("");

		var ul = $("<ul>");
		$("#ViewControl .navigation").append(ul);

	  for(name in formJson){
	    if(name==="initial"||name==="result"||name==="type"||name==="message"){
	      continue;
	    }

	    var uiName= name;
	    var title = formJson[name].title;

	    if(title==="")
	    	continue;

	    var li=$('<li><a href="#"><span class="title"></span>&nbsp;<span class="state"></span></a></li>');

	    li.find(".title").html(title);

	    li.find("a").attr("data-target",uiName).click(function(){
	      if($(this).closest("li").hasClass("selected")===true)
	        return;
	      $("#ViewControl").find("li").removeClass("selected");
	  
	       var targetName = $(this).attr("data-target");
	       var target = $("[name="+targetName+"]");
	       if(target.length){
	         var t = target.scrollTop();
	         var tb = target.offset().top;
	       	 var innerV = target.closest(".inner-vertical");
	         innerV.animate({
	          scrollTop: innerV.scrollTop()+tb
	        },400); 
	      }
	    })

	    ul.append(li);
	  };

	  if(ul.children().length<=1){
	    ul.hide();
	  }else{
	  	primary.find(".inner-vertical").children().css("padding-bottom","30px");
			$("#ViewControl").show("blind",{},400,null);	  	
	  }
	}
}
}(window.jQuery || window.$));	
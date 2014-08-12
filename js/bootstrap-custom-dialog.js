/*
	作者:shijie
	日期:20140308
	說明:dialog controller 
*/

(function($) { 
	'use strict';
	/*格式說明
		message:"",
		cssClass:"",//alert-info alert-danger alert-success ...
								//alert-list
		close:""    //是否加入close btn
	*/	
	$.fn.JSAppendAlertMessage = function(json){

		var alert = $('<div class="alert alert-dismissable">');
		var closebtn = $('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>');
		
		if(json.cssClass!==undefined){
				alert.addClass(json.cssClass);
		}
		if(json.close!==undefined){
			alert.append(closebtn);
		}

		alert.append(json.message);

		$(this).append(alert);		
	}
	/*格式說明
		title:"",
		message:"",
		cssClass:"",//modal-lg and modal-sm
		ok:{
			title:"",
			click:function(){}
		},
		cancel:{
			title:""
		}
	*/	

	$.fn.JSModalDialogOk = function(json){
		var text = '<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>';

		var dialog = $(text);

		var css = "modal-sm"; //modal-lg and modal-sm

		if(json.cssClass!==undefined){
			css = json.cssClass;			
		}

		dialog.find(".modal-dialog").addClass(css);

		dialog.find(".modal-title").html(json.title);
		dialog.find(".modal-body").html(json.message);
		var footer = dialog.find(".modal-footer");

		var ok = $('<button type="button" class="btn btn-primary"></button>');
		ok.html(json.ok.title);
		footer.append(ok);
		footer.append('&nbsp;');
		ok.click(function(){
			json.ok.click();
			dialog.modal('hide');	
		});	

		dialog.on('hidden.bs.modal', function (e) {
		  $(this).remove();
		});

		dialog.modal();
	}
	//$.fn.ModalDialogOkCancel = function(json){
	$.fn.JSModalDialogOkCancel = function(json){
		var text = '<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>';

		var dialog = $(text);

		var css = "modal-sm"; //modal-lg and modal-sm

		if(json.cssClass!==undefined){
			css = json.cssClass;			
		}

		dialog.find(".modal-dialog").addClass(css);

		dialog.find(".modal-title").html(json.title);
		dialog.find(".modal-body").html(json.message);
		var footer = dialog.find(".modal-footer");

		var ok = $('<button type="button" class="btn btn-primary"></button>');
		ok.html(json.ok.title);
		footer.append(ok);
		footer.append('&nbsp;');
		ok.click(function(){
			if(json.ok.click)
				json.ok.click();
			dialog.modal('hide');	
		});	

		var cancel = $('<button type="button" class="btn btn-default" data-dismiss="modal"></button>');
		cancel.html(json.cancel.title);
		footer.append(cancel);

		cancel.click(function(){
			if(json.cancel.click)
				json.cancel.click();

			dialog.modal('hide');	
		});

		dialog.on('hidden.bs.modal', function (e) {
		  $(this).remove();
		});

		dialog.modal();
	}

	$.fn.AppendAlertCheckBoxs = function(list,options){
		var view = $(this);	
		view.html("");
		//alert-success alert-info alert-warning alert-danger

		var row = $("<div style='position:relative'>");

		if(list.name){
			row.attr("name",list.name);	
		}

		var alert = $('<div class="alert alert-light" style="margin-bottom:2px">');
		
		//alert.addClass("list-style");

		var closebtn = $('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>');
		closebtn.css({"position":"absolute","top":"5px","right":"15px"});

		var btnToolbar = $("<div style='padding:8px;height:50px'><div class='pull-right'>");
		var header=$("<div class='' style='min-height:30px>");


		var form=$("<div class=''>");
		var message=$("<div>");	
		var footer=$("<div class=''>");
		footer.append(btnToolbar);
		
		if(options.close){
			alert.append(closebtn);

			if(options.close.removeAfterClick){
				closebtn.click(function(){
					//row.hide("blind", {}, 500, function(){row.remove();});
					row.remove();
				});
			}

		}
		alert.append(header); 
		alert.append(form); 
		alert.append(message);
		alert.append(footer); 
		row.append(alert);
		view.append(row);

		if(options.title){
			form.append("<h4>"+options.title+"</h4>");
		}

		var addclass="col-sm-3";
		if(options.option!==undefined){
			addclass=(options.option.addClass!==undefined)?options.option.addClass:addclass;
		}

		var categorys=new Array();

		for(var i=0;i<list.length;i++){
			var item = list[i];
			//console.log(item);
			var category=(item.category===undefined)?"":item.category;

			var parent = categorys[category];
			if(parent===undefined){
				parent = $("<div class='row'>");
				categorys[category]=parent;
			}

			var div = $($.sprintf("<div class='%s'>",addclass));
			var input = $($.sprintf("<input type='%s' tid='%s' style='%s'>","checkbox",item.id,"margin:10px 4px" ));

			if(item.checked!=undefined){
				input.prop("checked",true);
			}

			div.text(item.label);
			div.prepend(input);
			
			parent.append(div);
		}

		for (var key in categorys){
			var cate=$($.sprintf("<h4>%s</h4>",key));
			form.append(cate);
			form.append(categorys[key]);
		}

		if(options.cancel!==undefined){
			var cancelbtn = $("<button class='btn btn-info' type='button'>Cancel</button>");
			if(options.cancel.title!==undefined){
				cancelbtn.html("");
				//cancelbtn.append("<span class='fa fa-times'>&nbsp;");
				cancelbtn.append(options.cancel.title);	
			}
			btnToolbar.find(".pull-right").append(cancelbtn).append("&nbsp;");	

			cancelbtn.click(function(){		
			  if(options.cancel.removeAfterClick!==undefined){
			  	row.remove();
			  }else{
			  	view.hide();
			  } 
			});
		}

		if(options.selectAll){
			var allbtn = $("<button class='btn btn-primary' selectAll='true' type='button'>All/None</button>");
			if(options.selectAll.title!==undefined){
				allbtn.html("");
				//okbtn.append("<span class='fa fa-check'>&nbsp;");
				allbtn.append(options.selectAll.title);	
			}

			btnToolbar.find(".pull-right").append(allbtn).append('&nbsp;');	

			allbtn.click(function(){
				if($(this).attr("selectAll")){
					$(this).removeAttr("selectAll");
					form.find("[type=checkbox]").prop("checked",false);
				}else{
					$(this).attr("selectAll",true);
					form.find("[type=checkbox]").prop("checked",true);	
				}
			});	
		}

		if(options.ok!==undefined){
			var okbtn = $("<button class='btn btn-primary' type='button'>OK</button>");
			if(options.ok.title!==undefined){
				okbtn.html("");
				//okbtn.append("<span class='fa fa-check'>&nbsp;");
				okbtn.append(options.ok.title);	
			}

			btnToolbar.find(".pull-right").append(okbtn);	

			okbtn.click(function(){
				var rc=new Array();

				//jquery clone
				$.extend(rc,list);

		  	for(var ii=0;ii<rc.length;ii++){
		  		var item=rc[ii];
		  		if(form.find("[tid="+item.id+"]").prop("checked")==true){
		  			item["checked"] = true;
		  		}else{
		  			item["checked"] = undefined;
		  		}
		  	}

			  if(options.ok.callback!=undefined){
			  	options.ok.callback(rc);	
			  }

			  if(options.ok.removeAfterClick!==undefined){
			  	//row.hide("blind", {}, 500, function(){row.remove();});
			  	row.remove();
			  } 
			  else{
			  	view.hide();
			  }
			});
		}
	}
}(window.jQuery || window.$));



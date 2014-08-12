/*
	作者:shijie
	日期:20140308
	說明:Table controller 
	額外套件 : jquery-ui-datetimepicker.js 
	          bootstrap-custom-ui-factory.js
	          bootstrap-custom-dialog.js
	          jquery-sprintf.js
*/

(function($) { 
	'use strict';

	$.fn.ModuleTable = function(json,options){

		var form = $("<div class='table-responsive'>")
		form.attr("tid",json.id);

		if((options&&options.scrollbox)){
			form.css({"overflow":"auto"});
		}else{
			form.css({"overflow-x":"auto"});
		}
	
		if((options&&options.height)){
			form.css({"height":options.height});
		}
	
		var tcache = $("<tcache>");
		tcache.hide();
		var table = $('<table class="table table-hover"><thead></thead><tbody></tbody></table>');	
		
		table.attr("type",json.type);

		table.append(tcache);
		form.append(table);
		$(this).append(form);


		if(json.enableOrder!==undefined){
			var tbody = table.find("tbody");	
			tbody.prop("order",true);
		}	
		
		var thead = table.find("thead");
		thead.html("");

	  var tr=$("<tr style='white-space:nowrap'>");
		tr.append("<th type='order'>#</th>");
	  for(var i=0;i<json.inputs.length;i++){
	  	var item=json.inputs[i];
	  	var th=$("<th>");
	  	th.text(item.title);
	  	
	  	if(item.type!=undefined){
	  		//th.attr("type",item.type);
	  		th.attr("tid",item.id);
	  		th.attr("name",item.name);
	  	}

	  	if(item.tooltip){
	  		th.attr("tagTooltip","true");
	  	}

	  	if(item.sortable!==undefined){
	  		//th.css("text-align","center");//There's ▲ (&#9650;) and ▼ (&#9660;)
	  		th.html($.sprintf("<div>%s&nbsp;<b>&#9650;</b></div>",item.title));
	  		th.attr("sortMode","up");

	  		th.click(function(){
	  			var tid = $(this).attr("tid");
	  			var sortMode="up";
	  			if($(this).attr("sortMode")==="up"){
	  				$(this).find("b").html("&#9660;");
	  				sortMode="down";
	  				$(this).attr("sortMode",sortMode);
	  			}else{
	  				$(this).find("b").html("&#9650;");
	  				$(this).attr("sortMode",sortMode);
	  			}
	  			
	  			form.ModuleTable_Sort(tid,sortMode);
	  		});

	  		th.hover(function(){
					$(this).css({cursor:"pointer"});
				});
	  	}

	  	tr.append(th);
	  }

	  thead.append(tr);

		var tr=$("<tr>");

		var orderTh = $("<th type='order'>"+
										"<div class='tool-control' group='EditMode'><input type='checkbox'></div>"+
										"<div class='tool-control order' group='ViewMode' style='display:hidden'></div>"+
										"</th>");

		tr.append(orderTh);

	  for(var i=0;i<json.inputs.length;i++){
	  	var item=json.inputs[i];
	  	var td=$("<td>");

	  	td.attr("gname",item.name);
	  	td.attr("type",item.type);

	  	tr.append(td);

	  	var input = $("<div>");
	  	var defaultValue=undefined;

			if(item.type==="text"){
				input = $("<input class='form-control' type='text'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);

				if(item.placeholder!=undefined){
					input.attr("placeholder",item.placeholder);
				}
				defaultValue = (item.value!==undefined)?item.value:undefined;
			}
			else if(item.type==="textarea"){
				input = $("<textarea spellcheck='false' class='form-control' type='textarea'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.css({"min-width":"400px"});
		
				input.autosize();

				if(item.placeholder!=undefined){
					input.attr("placeholder",item.placeholder);
				}
				defaultValue = (item.value!==undefined)?item.value:undefined;
			}
			else if(item.type==="datepicker"){
				input = $("<input class='form-control datepicker' type='text'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.css({"min-width":"100px"});
				if(item.placeholder!=undefined){
					input.attr("placeholder",item.placeholder);
				}
				if(item.format!=undefined){
					input.attr("format",item.format);
				}
				defaultValue = (item.value!==undefined)?item.value:undefined;
			}else if(item.type==="select"){
				input = $("<select class='form-control'  type='select'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				for(var x=0 ; x<item.options.length;x++){
					var op = item.options[x];
					input.append($.sprintf("<option value='%s'>%s</option>",op.value,op.text));
				}
				defaultValue = (item.value!==undefined)?item.value:undefined;
			}else if(item.type==="selectable"){
				input = $("<div class=''>");
				var inputText = $("<input class='form-control' type='text'>");
				inputText.attr("tid",item.id);
				inputText.attr("list","list_"+item.id);
				inputText.attr("name",item.name);
			  input.append(inputText);

	      var datalist=$($.sprintf("<datalist id='list_%d'>",item.id));
				if(item.options!=undefined){
					for(var x=0 ; x<item.options.length;x++){
						var op = item.options[x];
						datalist.append($.sprintf("<option value='%s'>%s</option>",op.value,op.text));
					}   
					input.append(datalist);
				}
				for(var x=0 ; x<item.options.length;x++){
					input.append($.sprintf("<option>%s</option>",item.options[x]));
				}
				if(item.value!=undefined){
					input.val(item.value);
				}		
			}else if(item.type==="autocomplete"){
				input = $("<div class='form-group'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.append("<div class='form-input' group='EditMode'>");
				input.append("<div class='form-message'>");
				input.css({"min-width":"160px"});
			}else if(item.type==="list"){
				input = $("<div class='form-group'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.append("<div class='form-input' group='EditMode'>");
				input.append("<div class='form-message'>");
				input.css({"min-width":"400px"});
			}else if(item.type==="texteditor"){
				input = $("<div class='form-group texteditor'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.css({"min-width":"400px"});
			}else if(item.type==="linkbutton"){
				input = $("<div class='form-control link-button' type='linkbutton'>");
				input.attr("tid",item.id);
				input.attr("name",item.name);
				input.attr("link","");
				input.html(item.title);
			}

			if(defaultValue !== undefined){
				input.val(defaultValue);
			}

			td.append(input);	
		}


		tcache.append(tr);
		
	}

	$.fn.ModuleTable_Sort= function(tid,sortMode){

		var table = $(this).find("table");	
		var type=table.attr("type");
		//console.log(table);

		var tbody = table.find("tbody");	

    var $rows = tbody.find("tr");
   
   	//console.log("find rows:"+$rows.length);
    
		var selector="[tid="+tid+"]";	
    //console.log(selector);

    var mode=0;
    if(sortMode==="up"){
    	mode=1;
    }

    $rows.sort(function(a, b){

    	var keyA ="";
      var keyB ="";
    	//if(type==="form"||type==="table"){
    		keyA = $(a).find(selector).val();
      	keyB = $(b).find(selector).val();
    	//}else{
      // 	keyA = $(a).find(selector).html();
      //	keyB = $(b).find(selector).html();
    	//}

			var rc = 0;

      if(keyA!==undefined && keyB!==undefined){
        //console.log(keyA);
        //console.log(keyB);  
        if(keyA > keyB){ 
        	rc=-1;
        }else if(keyA < keyB){ 
        	rc= 1;
        }
      }else{
      	console.log("This is undefined.");
      }

      if(mode==1){
      	rc=rc*(-1);
      }

      return rc;
    });

    $.each($rows, function(index, row){
      tbody.append(row);
    });

    if(tbody.prop("order")===true){
    	var index=1;
    	tbody.find("tr th[type=order]").each(function(){	
				$(this).html(index);
				index+=1;
    	});
			
		}
	}

	$.fn.ModuleTable_Tooltip = function(){

		$(this).tooltip({
			trigger:"manual",
	   	placement:function(tooltip,ele){
	   		return "top";
	   	},
	   	title:function(){
				var txt=" ";
				var tr = $(this);
				var thead = tr.closest("table").find("thead");	

				var txtArray=[];
				//console.log(thead);
				thead.find("[tagTooltip=true]").each(function(){
					var tooltipName = $(this).attr("name");
					var input = tr.find("[name="+tooltipName+"]");
					if(input.attr("type")==="text"||input.attr("type")==="datepicker"||input.attr("type")==="textarea"){
						txt=input.val().replace(/\n/g, " ");
						if(txt.length){
							txtArray.push(txt);
						}						
						//var res = str.substring(1, 4)
					}else if(input.attr("type")==="select"){
						txt=input.find("option:selected").text();
						if(txt.length){
							txtArray.push(txt);
						}	
					}
				});
				txt="";
				for(var i=0;i<txtArray.length;i++){
					if(txt.length){
						txt+="/";
					}		
					if(txtArray[i].length>20){
						txt+=txtArray[i].substring(0,16);
						txt+="...";
					}else{
						txt+=txtArray[i];	
					}
				}
		  	return txt;
		  }
		}).bind(
        "mouseover mouseout",
        function( event ){
          //console.log( event.type, " :: ", this.id ); 
        }
    ).bind(
      "mouseenter mouseleave",
      function( event ){
        if(event.type==="mouseenter"){
      		var tr=$(this);
      		tr.tooltip('show');
					//$('.tooltip-inner').css("white-space","nowrap");
					var tooltip = $('.tooltip');
					tooltip.css('left',parseInt(tr.css('left'))+'px');
					tooltip.css('right','auto');
					var sizeW=parseInt(tooltip.css('width'))/2;
					tooltip.find(".tooltip-arrow").css({'left':sizeW+'px'});  	
        }else{
        	var tr=$(this);
        	tr.tooltip('hide');
        }
        //console.log( event.type, " :: ", this.id ); 
      }
    );
	}

	// json={id:1,inputs:[level:"2",...] }	
	// options.change				
	$.fn.ModuleTable_New = function(json,options){

    var formName    = options.formName;
    var formOptions = (options.formOptions)?options.formOptions:{};
    var formData    = (options.formData)?options.formData:{};
    var readonly    = (options.readonly)?options.readonly:false;
  
		var tbody  = $(this).find("tbody");
		var thead  = $(this).find("thead");		
		var tcache = $(this).find("tcache");	
		var table  = tbody.closest("table");
		var cachetr = tcache.find("tr").first();
		var tr = cachetr.clone();

		var onEvent = (options.onEvent)?options.onEvent:function(){};

		// 變更事件處理
		function selectChange(){
			console.log("selectChange");
			var td=$(this).closest("td");
			var tr=td.closest("tr")
			var name=$(this).attr("name");
			var type=$(this).attr("type");
			
			var value=$(this).val();

			var data={};
			data[name]=value;
			onEvent("rowChange",{ui:tr});
		}

		function inputChange(){
			console.log("inputChange");
			var td=$(this).closest("td");
			var tr=td.closest("tr")
			var name=$(this).attr("name");
			var type=$(this).attr("type");
			
			var value=$(this).val();

			var data={};
			data[name]=value;
			onEvent("rowChange",{ui:tr});
		}

		//由button新增之物件由此處通知變更
		//ui為td
		function listItemChange(ui){
			var tr = ui.closest("tr");
			onEvent("rowChange",{ui:tr});
		}	

		function inputKeydown(event){
			if(event.keyCode===13&&event.shiftKey){
				$(this).blur();
			}
		}

		function inputKeyup(event){
			$(this).attr('size', $(this).val().length+4);
			if(event.keyCode===13&&event.shiftKey){
				$(this).blur();
			}
		}

		function createListItem(json){

			var div = $.JSUiFactory("alert-item");

			if(json.cssClass){
				div.addClass(json.cssClass);
			}

			var closeBn = div.find("button.close");

			if(json.enableClose){ 
				closeBn.click(function(){		
		      $(this).closest("div").hide("slide", {}, 200, function(){
		        $(this).remove();
		        if(json.afterClose){
		          json.afterClose();
		        }   
		      });
				});
			}else{
				closeBn.remove();
			}

			var strong = div.find("span");
			//div.prepend('<span class="fa fa-bars draggable">&nbsp;&nbsp;&nbsp;</span>');

			if(json.title){
				var span = $("<span>");
				span.addClass("badge");
				span.css({"color":"#fff"});
				span.css({"background-color":"rgba(0,0,0,0.75)"});
				
				span.html(json.title);
				strong.append(span);
				strong.append("&nbsp;&nbsp;&nbsp;");
			}

			if(json.subtitle){
				var span = $("<span>");
				span.addClass("badge");
				span.css({"color":"#fff"});
				span.css({"background-color":"rgba(0,0,0,0.75)"});
				
				span.html(json.subtitle);
				strong.append(span);
				strong.append("&nbsp;&nbsp;&nbsp;");
			}

			if(json.text){
				var span = $("<span>");
				span.html(json.text);
				strong.append(span);
			}

			var index = 0;
			for(name in json.item){
				var text = json.item[name];
				var input = $('<input type="hidden">');
				input.attr("name",name);
				input.val(text);
				div.append(input);
			}
			return div;
		}

		// UI 產生函式
		function createItem(json){
		  
			var div = $('<div class="input-group">'+
				'<input type="text" class="form-control" disabled style="width:100%;min-width:140px">'+
				'<div class="hidden"></div>'+
				'<span class="input-group-addon btn" group="EditMode" name="deleteBn">'+
				'<i class="fa fa-times"></i>'+
				'</span>'+
			'</div>');

			div.find("[name=id]").val(json.id);
			div.find("[name=name]").val(json.name);
			div.find("[name=deleteBn]").click(function(){
	      $(this).closest("div").hide("slide", {}, 200, function(){
	        $(this).remove();
	        if(json.afterClose){
	          json.afterClose();
	        }   
	      });
			});

		  return div;
		}

		function addListItem(parent,item){

			var find=false;

			if(item.checkitem){
				parent.find("input[type=hidden][name="+item.checkitem+"]").each(function(){
					if($(this).val()===item[item.checkitem]){
						find=true;
					}
				});
			}

			if(find===false){
				item["afterClose"] = function(){
					listItemChange(parent.closest("td"));	
				}
				item["enableClose"]=true;
				var div=createListItem(item);

				parent.append(div);							
			}else{
				return false;
			}
			
			return true;
		}

		if(thead.length && thead.find("[tagTooltip=true]").length){
			tr.ModuleTable_Tooltip();
		}

		if(options&&options.insertFirst){
			tr.find("[type=order] .order").html(1);
			tbody.prepend(tr);	
		}
		else{
			var index=tbody.find("tr").length;
			tr.find("[type=order] .order").html(++index);
			tbody.append(tr);	
		}

		if(json.id){
			tr.attr("tid",json.id);
		}

		if(table.attr("type")==="form"){
			tr.find("td[type=list]").each(function(){
			  var aJson = {
					name:"inputText",
					placeholder:"",
					enableEnter:true,
					buttons:[{
		        name:"addBn",
		        title:"",
		        iconCssClass:"fa fa-plus",
		        cssClass:"",
		        click:function(){
		        	
		        	var formG = $(this).closest(".form-group");
		        	var inputG= formG.find(".form-input .input-group");
		        	var formM = formG.find(".form-message");
		        	var input = inputG.find("input[type=text]");

		        	if(input.val().length===0)
		        		return;

		        	var item = {text:input.val(),item:{value:input.val()}};
							input.val("");
		        	if(addListItem(formM,item)){
		        		listItemChange(formM.closest("td"));	
		        	}
		        }
					}],
					stateSpan:{
						position:"front",
						okCssClass:"fa fa-check-circle-o",
						loadingCssClass:"effect-rotate fa fa-refresh",
						errorCssClass:"fa fa-times-circle-o"
					},					
					StateCallback:function(rc){	
						if(rc.state==="ENTER"){
							var input = rc.input;
							if(input===undefined){
								console.log("StateCallback:Input Undefined");
								return;
							}
							var formG=input.closest(".form-group");
		        	formG.find("[name=addBn]").click();
						}
					},
				};

				var input = $(this).find(".form-input");
				var iname = $(this).attr("gname");
				input.JSInputGroup(aJson);
				input.find("[name=inputText]").css({"width":"400px","min-width":"400px"});			
			});

			tr.find("td[type=autocomplete]").each(function(){
				
			  var aJson = {
					name:"inputText",
					placeholder:"",
					enableEnter:true,
					buttons:[{
		        name:"addBn",
		        title:"",
		        iconCssClass:"fa fa-plus",
		        cssClass:"",
		        click:function(){
		        	var formG = $(this).closest(".form-group");
		        	var inputG= formG.find(".form-input .input-group");
		        	var formM = formG.find(".form-message");
		        	var input = inputG.find("input[type=text]");
		        	
		        	if(input.attr("select_id")===undefined){
		        		return;
		        	}

		        	var item = {text:input.val(),item:{id:input.attr("select_id"),name:input.val()}};
		        	
							input.val("");
		        	if(addListItem(formM,item)){
		        		listItemChange(formM.closest("td"));	
		        	}
		        }
					}],
					stateSpan:{
						position:"front",
						okCssClass:"fa fa-check-circle-o",
						loadingCssClass:"effect-rotate fa fa-refresh",
						errorCssClass:"fa fa-times-circle-o"
					},
					StateCallback:function(rc){	
						if(rc.state==="OK"){

						}else if(rc.state==="ERROR"){
							
						}else if(rc.state==="LOADING"||rc.state==="NONE"){
							
						}else if(rc.state==="ENTER"){
							var input = rc.input;
							if(input===undefined){
								console.log("StateCallback:Input Undefined");
								return;
							}
							var formG=input.closest(".form-group");
		        	formG.find("[name=addBn]").click();
						}
					},
					autocomplete:{}
				};

				if(formOptions.autocomplete){
					var input = $(this).find(".form-input");
					var iname = $(this).attr("gname");

					aJson.autocomplete=formOptions.autocomplete[iname];	
					input.AutoCompleteInput(aJson);

					input.find("[name=inputText]").css({"width":"160px","min-width":"100px"});
				}		
			});

			tr.find("td[type='datepicker']").each(function(){

				var input = $(this).find("input.datepicker");
				input.on("focus",function (){

					console.log("click:datepicker");
					var input = $(this);
					
					var date=input.val();

					var timeOp={
						//step:30,minTime:"8:00",maxTime:"22:00",
						scrollMonth:false,			        
						onShow:function(ct,$input ){
							date=$input.val();
		        },
		        onClose:function(dp,$input){
		       		//$input.blur();
		       		if(options&&options.change){
		       		if(date!==$input.val())
		       			$input.change();
		       		}
		       		$input.datetimepicker('destroy');
		        }
					};

					if(input.attr("format")==="Y/m/d"){
						timeOp["format"]="Y/m/d";
						timeOp["timepicker"]=false;
					}

					input.datetimepicker(timeOp);

				});		
			});
		}
		
		if(json.inputs){
			tr.find("td[gname]").each(function(){
				var name = $(this).attr("gname");
				var type = $(this).attr("type");
				var value = json.inputs[name];
				
				if(value){
					if(type==="textarea"){
						$(this).find("[name="+name+"]").val(value.replace(/<br\/>/g, "\n"));	
					}else if(type==="autocomplete"){
						var formG = $(this).find(".form-group");
						var formM = formG.find(".form-message");
						if(value.size&&value.items){
							for(var i = 0 ; i < value.items.length ; i++){
	          		var item = value.items[i];     
	          		if(addListItem(formM,{text:item.name,item:item})){
		  
		          	}
	          	}
						}
					}else if(type==="list"){
						var formG = $(this).find(".form-group");
						var formM = formG.find(".form-message");
						if(value.size&&value.items){
							for(var i = 0 ; i < value.items.length ; i++){
	          		var item = value.items[i];     
	          		if(addListItem(formM,{text:item.value,item:item})){
		  
		          	}
	          	}
						}						
					}
					else if(type==="texteditor"){
						$(this).find("[name="+name+"]").html(value);	
					}
					else if(type==="linkbutton"){
						$(this).find("[name="+name+"]").attr("link",value);	
					}
					else{
						$(this).find("[name="+name+"]").val(value);	
					}
				}
			});
		}

		// textarea resize
		tr.find("textarea").addClass("animate").autosize().trigger( "resize" );
		
		// text resize
		tr.find("input[type=text]").each(function(){

			if(readonly){
				return;
			}

			if($(this).val().length<12){
				$(this).attr('size',12);
			}else{
				$(this).attr('size', $(this).val().length+4);
			}

			$(this).change(function(){
				$(this).attr('size', $(this).val().length+4);
			});
		});	

		if(json.link){
			tr.attr("link",json.link);

			tr.click(function(){
				onEvent("link",{ui:$(this),link:$(this).attr("link")});
			});
		}

		tr.find(".link-button").click(function(){
			onEvent("link",{ui:$(this),link:$(this).attr("link")});
		});
		
		if(table.attr("type")==="form"){
			//enter會先換行，提前使用keydown
			tr.find("td > textarea").keydown(inputKeydown).change(inputChange);
			tr.find("td > select").change(selectChange);
			tr.find("td > input[type=text]").keyup(inputKeyup).change(inputChange);
			tr.find("td > input.datepicker").change(inputChange);		
		}else{
			tr.find("[name]").prop("disabled",true);
			$(this).prop("disabled",true);
			$(this).ModuleTable_RefreshOrder();
		}

	}

  $.fn.ModuleTable_RefreshOrder = function(){
    var index=1;
    $(this).find("tbody tr .order").each(function(){
      $(this).html(index++);
    });
  }  

	// json={id:1}
	$.fn.ModuleTable_Remove = function(json){
		var tbody = $(this).find("tbody");	
		tbody.find("tr[tid="+json.id+"]").hide("blind",{},400,function(){$(this).remove();});
	}

	$.fn.ModuleTable_Clear = function(){
		var tbody = $(this).find("tbody");
		tbody.html("");	
	}

	$.fn.ModuleTable_GetCheckedId = function(){
    var formT = $(this);
    var formName = formT.attr("name");
    var tableF = formT.find("fieldset");
    var tableName = tableF.attr("gname");

    var checkedItemId=[];
    formT.find("tbody tr").each(function(){
      if($(this).find("[type=checkbox]").prop("checked")==true){
        //$(this).closest("tr").remove();
        checkedItemId.push($(this).attr("tid"));
      } 
    });
    return checkedItemId;
	}

	$.fn.ModuleTable_GetDataById = function(id){
    var formT = $(this);
    var formName = formT.attr("name");
    var tableF = formT.find("fieldset");
    var tableName = tableF.attr("gname");
    
    var data=[];

    var table = tableF.find("table");
    var tbody = table.find("tbody");
    var thead = table.find("thead");
    var tcache= table.find("tcache");
    var tbody = table.find("tbody");

    tbody.find("tr[tid="+id+"]").each(function(){
      
      var tid = $(this).attr("tid");
      var item={id:tid,inputs:{}};
      
      $(this).find("td").each(function(){
				var type = $(this).attr("type");
				var name = $(this).attr("gname");
        if(type==="textarea"){
          item.inputs[name]=$(this).find("[name="+name+"]").val().replace(/\n/g,"<br/>");
        }
        else if(type==="autocomplete"||type==="list"){
        	var items=[];
        	$(this).find(".form-message .alert-item").each(function(){
        		var innerData={};
        		$(this).find("input[type=hidden]").each(function(){
        			var iname = $(this).attr("name");
        			var ivalue = $(this).val();
        			innerData[iname] = ivalue;
        		});
        		items.push(innerData);
        	});
        	item.inputs[name]={size:items.length,items:items};
        }
        else if(type){
          item.inputs[name]=$(this).find("[name="+name+"]").val();
        }
      });
      data.push(item);
    });

    return data;
	}

	$.fn.ModulTable_GetItemsData = function(){
    var formT = $(this);
    var formName = formT.attr("name");
    var tableF = formT.find("fieldset");
    var tableName = tableF.attr("gname");
    
    var data=[];

    var table = tableF.find("table");
    var tbody = table.find("tbody");
    var thead = table.find("thead");
    var tcache = table.find("tcache");
    var tbody = table.find("tbody");

    tbody.find("tr").each(function(){
      var tid = $(this).attr("tid");
      var item={id:tid,inputs:{}};
      
      $(this).find("td").each(function(){
				var type = $(this).attr("type");
				var name = $(this).attr("gname");
        if(type==="textarea"){
          item.inputs[name]=$(this).find("[name="+name+"]").val().replace(/\n/g,"<br/>");
        }
        else if(type==="autocomplete"||type==="list"){
        	var items=[];
        	$(this).find(".form-message .alert-item").each(function(){
        		var innerData={};
        		$(this).find("input[type=hidden]").each(function(){
        			var iname = $(this).attr("name");
        			var ivalue = $(this).val();
        			innerData[iname] = ivalue;
        			//console.log(iname+"/"+ivalue);
        		});
        		items.push(innerData);
        	});
        	item.inputs[name]={size:items.length,items:items};
        }
        else if(type){
          item.inputs[name]=$(this).find("[name="+name+"]").val();
        }
      });
      data.push(item);
    });
    return data;
	}

	$.fn.ModuleTable_TriggerSelectForm = function(target,header,stringMap){
    var formT = $(this);
    var formName = formT.attr("name");
    var tableF = formT.find("fieldset");
    var tableName = tableF.attr("gname");

    var AlertDiv = $(target).parent().find("[name=ColSelectForm]");
    
    if(AlertDiv.length!==0){
    	AlertDiv.hide("blind", {}, 400, function(){$(this).remove();});
      return;
    }

    var lists=new Array();
    var table = tableF.find("table");
    var tbody = table.find("tbody");
    var thead = table.find("thead");
    var tcache = table.find("tcache");
  
    for(var i=0;i<header.inputs.length;i++){
      var item = header.inputs[i];

      var data = {id:item.id,label:item.title};

      var selector = "[tid="+item.id+"]";
      if(table.find("thead").find(selector).is(':hidden')!==true){
        data["checked"]="";
      }
      lists.push(data);
    }

    AlertDiv =  $("<div name='ColSelectForm' style='display:none'>");
      
    $(target).after(AlertDiv);

    AlertDiv.AppendAlertCheckBoxs(lists,
      {
        option:{
          addClass:"col-sm-3"
        },
        selectAll:{
        	title:stringMap.AllNone
        },
        ok:{
          title:stringMap.Ok,
          close:"true",
          callback:function(rc){
            
            for(var i = 0 ; i < rc.length ; i++){
              var item = rc[i];
              var id = item.id;
              var selector = "[tid="+item.id+"]";
              var show = (item.checked!==undefined)?true:false;
              
              if(show){
                thead.find(selector).show();
              }
              else{
                thead.find(selector).hide();  
              }

              tcache.find("tr").each(function(){
                if(show){
                  $(this).find(selector).closest("td").show();
                }
                else{
                  $(this).find(selector).closest("td").hide();  
                }
              });
                                
              tbody.find("tr").each(function(){
                if(show){
                  $(this).find(selector).closest("td").show();
                }
                else{
                  $(this).find(selector).closest("td").hide();  
                }
              });
            }
            AlertDiv.hide("blind", {}, 400, function(){$(this).remove();});
          }
        }
      }
    );
		AlertDiv.show("blind", {}, 400);    
	}

}(window.jQuery || window.$));
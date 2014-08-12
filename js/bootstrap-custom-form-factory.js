/*
	Author:Shijie
  Date:20140604
  Version:1.0
  Description:UI Form Factory
  Require:
   1.jquery
	 2.bootstrap-custom-ui-factory
	 3.jquery-ui-datetimepicker
*/

(function($) { 
	'use strict';

  var stringTable = {
    en:{
    	//Task
    	priority:"Priority",
    	deadline:"Deadline",
    	remind:"Remind",
    	description:"Description",
    	remark:"Description",
    	attachment:"Attachments",
    	comment:"Comment",
    	//meeting label
    	attendee:"Attendee",
			company_name:"Company Name",
			meeting_date:"Date",
			meeting_location:"Location",
			meeting_type:"Type",
    	//Exhabit label
    	title:"Title",
    	location:"Location",
    	host:"Host",
    	date:"Date",
    	date_begin:"Date",
    	//Company label
      cname:"Company Name",
      ename:"Company Name",
     	short_name:"Short Name",
     	website:"Web Site",
     	address:"Address",
     	phone:"Phone",
     	fax:"Fax",
     	level:"Level",
     	erp_id:"ERP ID",
     	contact_method:"Contact Type",
     	channel:"Channel",
     	sell_area:"Region",
     	industry:"Industry",
     	transaction:"Transcation",
     	vatnumber:"Vatnumber",
     	soldproduct:"Product",
     	note:"Note",
     	area:"Area",
     	state:"state",
     	commission:"product",
     	commission_contact_phone:"Phone",
     	commission_contact_name:"Contact",
     	member:"Member",
     	cc:"CC",
     	//placeholder
     	placeholder_cname:"Chinese Name",
      placeholder_ename:"English Name",
      placeholder_erp_id:"",
      placeholder_short_name:"",
      placeholder_soldproduct:"",
      placeholder_commission:"%"
    },    
    tw:{
     	priority:"優先權",
    	deadline:"期限",
    	remind:"提醒",
    	description:"說明",
    	remark:"說明",
    	attachment:"附件",
    	comment:"說明",
			//meeting label
			attendee:"參與人員",
			company_name:"公司名稱",
			meeting_date:"日期",
			meeting_location:"會議地點",
			meeting_type:"會議方式",
			//Exhabit label
			title:"標題",
			location:"地點",
			host:"主辨單位",
			date:"日期",
			date_begin:"日期",
    	//Company label
      cname:"中文名稱",
      ename:"英文名稱",
     	short_name:"公司簡稱",
     	website:"網址",
     	address:"地址",
     	phone:"電話",
     	fax:"傳真",
     	level:"重要性",
     	erp_id:"ERP ID",
     	contact_method:"聯絡方式",
     	channel:"通路",
     	sell_area:"銷售區域",
     	industry:"產業類型",
     	transaction:"交易方式",
     	vatnumber:"統一編號",
     	soldproduct:"銷售產品",
     	area:"區域",
     	note:"備註",
     	state:"狀態",
     	commission:"產品",
     	commission_contact_phone:"電話",
     	commission_contact_name:"介紹人",
     	member:"成員",
     	cc:"告知成員",
     	//placeholder
     	placeholder_cname:"請輸入公司名稱",
      placeholder_ename:"請輸入公司英文名稱",
      placeholder_erp_id:"請輸入ERP ID",
      placeholder_short_name:"請輸入簡稱",
      placeholder_soldproduct:"請輸入產品資訊",
      placeholder_commission:"獎勵金%"
      //button
    },
    cn:{
      priority:"优先权",
    	deadline:"期限",
    	remind:"提醒",
    	description:"说明",
    	remark:"说明",
    	attachment:"附件",
    	comment:"说明",
			//meeting label
			attendee:"参与人员",
			company_name:"公司名称",
			meeting_date:"日期",
			meeting_location:"会议地点",
			meeting_type:"会议方式",
			//Exhabit label
			title:"标题",
			location:"地点",
			host:"主辨单位",
			date:"日期",
			date_begin:"日期",
    	//Company label
			cname:"中文名称",
			ename:"英文名称",
			short_name:"公司简称",
			website:"网址",
			address:"地址",
			phone:"电话",
			fax:"传真",
			level:"重要性",
			erp_id:"ERP ID",
			contact_method:"联络方式",
			channel:"通路",
			sell_area:"销售区域",
			industry:"产业类型",
			transaction:"交易方式",
			vatnumber:"统一编号",
			soldproduct:"销售产品",
			area:"区域",
			state:"状态",
			note:"备注",
			commission:"产品",
			commission_contact_phone:"电话",
			commission_contact_name:"介绍人",
			member:"成员",
			cc:"告知成员",
			//placeholder
			placeholder_cname:"请输入公司名称",
			placeholder_ename:"请输入公司英文名称",
			placeholder_erp_id:"请输入ERP ID",
			placeholder_short_name:"请输入简称",
			placeholder_soldproduct:"请输入产品资讯",
			placeholder_commission:"奖励金%"
		}
  }

	$.JSFormFactory = function(parent,formData,options){

		var stringMap=stringTable.en;

		if(options.language){
			if(options.language==="zh_TW"){
				stringMap=stringTable.tw;
				$.extend(stringMap,$.JSStringMap.tw);
			}else if(options.language==="zh_CN"){
				stringMap=stringTable.cn;
				$.extend(stringMap,$.JSStringMap.cn);
			}else{
				$.extend(stringMap,$.JSStringMap.en);
			}
		}else{
			$.extend(stringMap,$.JSStringMap.en);
		}

		var onEvent=(options.onEvent)?options.onEvent:function(act,data){};

		var opSelect = (options.select)?options.select:{};
		var opUI     = (options.ui)?options.ui:{};
		var opAutoComplete = (options.autocomplete)?options.autocomplete:{};
		
		var opInitial  = (options.initial)?options.initial:{};
		// 需要驗証欄位
		var opValidate = (options.validate)?options.validate:{};
		//console.log("XML");
		//console.log(options);

		var fname = parent.attr("gname");
		
		parent.data("initial",opInitial);
		parent.data("validate",opValidate);
		parent.data("formData",formData);
    
    // 記錄web 額外資料	
    if(options.webApi)
    	parent.data("webApi",options.webApi);
    if(options.api)
    	parent.data("api"   ,options.api[fname]);
    if(options.upload)
    	parent.data("upload",options.upload[fname]);


    function dataChange(formG,data){
    	console.log("dataChange");
    	var changed=false;
    	var formInputs = formData.inputs;

  	  for(var tname in data){
        if(data[tname]===formInputs[tname]){
          console.log(tname+":Unchange");
        }else{
          console.log("\""+tname+"\""+" has changed from "+ "\""+formInputs[tname]+"\""+ "to" +"\""+data[tname]+"\"");
          formInputs[tname]=data[tname];
          changed=true;
        }
      }

      if(changed===true){
      	onEvent("dataChange",{ui:formG,data:data});
      }
    }

    function dataObjectChange(formG,data){
    	var formInputs = formData.inputs;

  		for(var tname in data){
	  	  console.log("\""+tname+"\""+" has changed.");
	      console.log(formInputs[tname]);
	      console.log("to");
	      console.log(data[tname]);
	      formInputs[tname]=data[tname];
    	}

      onEvent("dataChange",{ui:formG,data:data});
    }

		// 變更事件處理
		function selectChange(){
			var formG = $(this).closest(".form-group");
			var name=$(this).attr("name");
			var value=$(this).val();
			var data={};
			data[name]=value;
			var tarName=$(this).attr("dependent-target");
			if(tarName){
				data[tarName]=formG.find("[name="+tarName+"]").val();
			}
			dataChange(formG,data);
		}

		function mutipleSelectChange(){
			var formG = $(this).closest(".form-group");
			var name=formG.attr("gname");
			var items={};
			var data={};

			formG.find("select[name]").each(function(){
				var select = $(this);
				var value = (select.val())?select.val():0;
				items[select.attr("name")]=value;
			});
			data[name]=items;
			dataObjectChange(formG,data);
		}

		function checkboxChange(){
			var formG=$(this).closest(".form-group");
			var name=formG.attr("gname");
			var list={size:0,items:[]};
			var data={};

			formG.find("input[type=checkbox][name="+name+"]").each(function(){
				if($(this).prop("checked")){
					list.items.push({value:$(this).val()});
				}	
			});
			list.size=list.items.length;
			data[name]=list;
			dataObjectChange(formG,data);
		}

		function radioChange(){
			var formG=$(this).closest(".form-group");
			var name=formG.attr("gname");
			var data={};
			
			formG.find("input[type=radio][name="+name+"]").each(function(){
				if($(this).prop("checked")){
					data[name]=$(this).val();	
				}	
			});
			//onEvent("inputChange",{ui:formG,data:data});
			dataChange(formG,data);
		}

		function inputChange(){
			var formG=$(this).closest(".form-group");
			var name=$(this).attr("name");
			var type=$(this).attr("type");
			var value=$(this).val();

			var data={};
			data[name]=value;

			var tarName=$(this).attr("dependent-target");
			if(tarName){
				data[tarName]=formG.find("[name="+tarName+"]").val();
			}
			//onEvent("inputChange",{ui:formG,data:data});
			dataChange(formG,data);
		}

		function inputKeyup(event){
			if(event.keyCode===13 && event.shiftKey){
				var formG=$(this).closest(".form-group");
				$(this).blur();
				var name=$(this).attr("name");
				var value=$(this).val();
				var data={};
				data[name]=value;
				//onEvent("inputChange",{ui:formG,data:data});
				dataChange(formG,data);
			}
		}

		function inputKeydown(event){
			if(event.keyCode===13 && event.shiftKey){
				var formG=$(this).closest(".form-group");
				$(this).blur();
			}
		}

		//WYSIWYG 編輯變更
		function textEditorChange(ui){
			var name=ui.attr("gname");
			var editor=ui.find(".text-editor[name="+name+"]");
			console.log(editor);
			var value=editor.cleanHtml();
			var data={};
			data[name]=value;
			//onEvent("inputChange",{ui:formG,data:data});
			dataChange(formG,data);
		}

		//由button新增之物件由此處通知變更
		function listItemChange(ui){
			var name=ui.attr("gname");
			var data={};
			var list={size:0,items:[]};
			var formM = ui.find(".form-message");
			//ui.find(".alert-list").each(function(){
			formM.children().each(function(){
				var item={};
				$(this).find("input:hidden").each(function(){
					item[$(this).attr("name")]=$(this).val();
				});

				var extendData = $(this).data("data");

				$.extend(item,extendData);

				list.items.push(item);
			});
			list.size=list.items.length;
			//onEvent("listChange",{ui:formG,data:data});
			data[name]=list;
			dataObjectChange(formG,data);
		}

		function uploadItemChange(ui){
			console.log("uploadItemChange");
			var name = ui.attr("gname");
			var data={};
			var list={size:"0",items:[]};
      ui.find("li").each(function(){
      	var uItem = $(this);
      	var file = uItem.data("file");
      	//var fname=$(this).find(".title").cleanHtml();
      	//var fname=$(this).find(".title").html();
      	var item={};
      	$.extend(item,file);
      	list.items.push(item);
      });
			//onEvent("listChange",{ui:formG,data:data});
			list.size=list.items.length;
			data[name]=list;
			dataObjectChange(formG,data);
		}	

		//建立 ui checkbox與radiobox類型ui
		function createUI(parent,option){
 
 			var div=$('<div class="col-xs-12">');
 			var ui=null;
			if(option.type==="checkbox"){
				ui= $.JSUiFactory(option.type);
				var checkbox = ui.find("input[type=checkbox]");
				checkbox.attr("name",option.name);
				checkbox.attr("value",option.value);
				ui.find(".title").html(option.title);
	
			}else if(opt.type==="radio"){
				ui= $.JSUiFactory(option.type);
				var radio = ui.find("input[type=radio]");
				radio.attr("name",option.name);
				radio.attr("value",option.value);
				ui.find(".title").html(option.title);
			}

			if(option.input){
				var input=$("<input type='text' class='input-bottom-border'>");

				input.attr("type",option.input.type);
				input.attr("name",option.input.name);

				if(option.input.maxlength){
					input.attr("maxlength",option.input.maxlength);	
					var width=parseInt(option.input.maxlength)*20;
					input.css({width:""+width+"px"});
				}				

				if(option.input.cssClass){
					input.addClass(option.input.cssClass);
				}

				ui.append("&nbsp;");
				ui.append(input);
				if(option.input.title){
					ui.append("&nbsp;");
					ui.append("<span>"+option.input.title+"</span>");
				}
			}
			div.append(ui);
			parent.append(div);
		}

		// 關閉ui
		function closeItem(ui,json){
			ui.JSModalDialogOkCancel({
				title:stringMap.Message,
				message:stringMap.AskDelete,
				ok:{
					title:stringMap.Delete,
					click:function(){
						ui.remove();
						if(json.afterClose){
							json.afterClose();
						}		
					}
				},
				cancel:{
					title:stringMap.Cancel
				}
			});	
		}

		// 建立alert-note
		function createItem(json){
			var div = $.JSUiFactory("alert-list");

			if(json.cssClass!==undefined){
				div.addClass(json.cssClass);
			}
			var closeBn = div.find("button.close");

			if(json.enableClose!==undefined){ 
				closeBn.click(function(){
					closeItem(div,json);	
				});
			}else{
				closeBn.remove();
			}

			var strong = div.find("strong");

			var index = 0;
			for(name in json.item){
				var text = json.item[name];
				var label = $("<label>");
				label.html(text);
				var input = $('<input type="hidden">');
				input.attr("name",name);
				input.val(text);
				label.append(input);
				strong.append(label);	
				index++;
				if(index<json.item.length){
					strong.append("<br>");
				}	
			}

			div.append(strong);
			return div;
		}

		function createIconItem(json){
			var div = $.JSUiFactory("alert-list");
		}

		function createListItem(json){

			var div = $.JSUiFactory("alert-list");

			if(json.cssClass!==undefined){
				div.addClass(json.cssClass);
			}
			var closeBn = div.find("button.close");

			if(json.enableClose!==undefined){ 
				closeBn.click(function(){
					closeItem(div,json);	
				});
			}else{
				closeBn.remove();
			}

			var strong = div.find("strong");

			div.prepend('<span class="fa fa-bars draggable">&nbsp;&nbsp;&nbsp;</span>');
			

			if(json.title!==undefined){
				var span = $("<span>");
				span.addClass("badge");
				span.css({"color":"#fff"});
				span.css({"background-color":"rgba(0,0,0,0.75)"});
				
				span.html(json.title);
				strong.append(span);
				strong.append("&nbsp;&nbsp;&nbsp;");
			}

			if(json.subtitle!==undefined){
				var span = $("<span>");
				span.addClass("badge");
				span.css({"color":"#fff"});
				span.css({"background-color":"rgba(0,0,0,0.75)"});
				
				span.html(json.subtitle);
				strong.append(span);
				strong.append("&nbsp;&nbsp;&nbsp;");
			}

			if(json.text!==undefined){
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

		// 新增參與人ui
		function createMemberItem(json){
		  var div=$("<div style='float:left'>");
		  var label = $("<label class='person'><span class='title'></span></label>");
		  label.find(".title").html(json.title);

		  div.append(label); 

		  if(json.cssClass){
		    label.addClass(json.cssClass);
		  } 

		  if(json.enableClose){
		    var deletebn = $("<span class='btn remove-self fa fa-times' group='EditMode'></span>");

		    deletebn.click(function(){
		      $(this).closest("div").hide("slide", {}, 200, function(){
		        $(this).remove();
		        if(json.afterClose){
		          json.afterClose();
		        }   
		      });
		    });
		    label.append(deletebn);
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

		function addRemark(parent,items){
			
			for(var i=0;i<items.length;i++){
				var item={};
				$.extend(item,items[i]);

				var blockquote =$("<blockquote>");
				blockquote.html(item.text.replace(/\n/g,"<br>").replace(/'\n'/g,"<br>"));
				blockquote.append("<footer><span>"+item.date+"</span></footer>");
				parent.append(blockquote);

				blockquote.data("data",item);

			}
			return true;
		}


		function addMessage(parent,items){
			for(var i=0;i<items.length;i++){
				var text=items[i];
				var span = createItem({
						cssClass:"alert-note",
						enableClose:"true",
						item:text,						
						afterClose:function(){
							//PostWhenChange("#BasicInfoView [name=inputNote]",paramJson);
							listItemChange(parent.closest(".form-group"));
						}
					});
				parent.append(span);
			}
			return true;
		}

		function addData(parent,items){
			for(var i=0;i<items.length;i++){
				var item=items[i];
				var span = createListItem({
						title:item.title,
						subtitle:item.subtitle,
						text:item.text,
						cssClass:(item.cssClass)?item.cssClass:"alert-note",
						enableClose:"true",
						item:item.item,						
						afterClose:function(){
							listItemChange(parent.closest(".form-group"));
						}
					});
				parent.append(span);
			}
			return true;
		}

		function addMember(parent,list){
			//$(name).html("");
			for(var i = 0;i<list.length;i++){
				var item = list[i];
				//console.log(item);
				var find=false;
				parent.find("input[type=hidden][name=id]").each(function(){
					if($(this).val()===item.item.id){
						find=true;
					}
				});

				if(find===false){
					var span=createMemberItem(
						{ cssClass:"",
							enableClose:true,
							title:item.title,
							item:item.item,					
							afterClose:function(){
								listItemChange(parent.closest(".form-group"));	
							}});

					parent.append(span);							
  			}else{
  				return false;
  			}
			}	
			return true;
		}
    	
		for(var name in formData.inputs) {
      var data = formData.inputs[name];
 
      //form-group-input
      if( name==="title"||                    //各類標題
      		name==="company_name"||
      		name==="cname"||
      		name==="ename"||
      		name==="short_name"||
      		name==="erp_id"||     
      		name==="website"|| 
      		name==="vatnumber"||              	//統一發票  
      		name==="commission_contact_name"||    
      		name==="commission_contact_phone"||
      		name==="location"||    							//展覽位置
					name==="meeting_location"||
					name==="meeting_type"||
					name==="subject"
      	){

    		var formG = $.JSUiFactory("form-group-input");
				formG.attr("gname",name);

    		var input = formG.find("input");
				input.attr("name",name);
				input.attr("placeholder",stringMap["placeholder_"+name]);
    		
    		input.change(inputChange);
    		input.keyup(inputKeyup);
    		input.val(data);

    		parent.append(formG);
      }
    	// Append List
    	else if(name==="remark"){
    		var formG = $.JSUiFactory("form-group-textarea-button");
				formG.attr("gname",name);
    		parent.append(formG);

    		var textarea = formG.find("textarea");
    		var btn   = formG.find("[name=addBn]");
    		var formM   = formG.find(".form-message");
    		textarea.val("").addClass("animate").autosize();

				btn.click(function(){
					var formG = $(this).closest(".form-group");
					var formM = formG.find(".form-message");
					var text=textarea.val();
					if(text==="")
						return;

					textarea.val("");
					var list=[{date:$.JSGetCurrentDate(),text:text}];

					if(addRemark(formM,list)){
						listItemChange(formG);
					}
				});

				if(data.items){
					addRemark(formM,data.items);
				}
    		
      }
    	// List
    	else if(name==="note"){
    		var formG = $.JSUiFactory("form-group-input-button");
				formG.attr("gname",name);
    		
    		var input = formG.find("input");
    		var btn   = formG.find("[name=addBn]");
    		var formM   = formG.find(".form-message");

				btn.click(function(){
					var formM   = $(this).closest(".form-group").find(".form-message");
					var text=input.val();
					if(text==="")
						return;

					input.val("");
					var list=[{value:text}];

					if(addMessage(formM,list)){
						listItemChange(formG);
					}

				});
				//{size:"1",items:[{value:"WWWW jAKJLF"},{value:"ASDKLJDLASKL KKLASDLK"}]}
				// 新增事件處
				input.keyup(function(event){
					if(event.keyCode===13 && event.shiftKey){
						btn.click();
					}
				});

				if(data.items){
					addMessage(formM,data.items);
				}

    		parent.append(formG);
      }
      //
      //commission:{size:"1",items:[{product_type_id:"1",percent:"1",product_name:"A"}]},
      else if(name==="commission"){
    		var formG = $.JSUiFactory("form-group-select-input2");
				formG.attr("gname",name);
    		
    		var selectFirst = formG.find("[name=inputSelect]");
    		var inputFirst = formG.find("[name=inputTextFirst]");
    		var inputSecond = formG.find("[name=inputTextSecond]");
    		var btn   = formG.find("[name=addBn]");
    		var formM   = formG.find(".form-message");

    		inputFirst.attr("type","number");
				inputFirst.attr("placeholder",stringMap["placeholder_commission"]);
				inputSecond.attr("placeholder",stringMap["placeholder_soldproduct"]);

				var sOption = (opSelect[name])?opSelect[name]:[];
				
				selectFirst.html("");
				for(var i=0;i<sOption.length;i++){
					var op = sOption[i];
			 		var ui_op = $("<option>");
					ui_op.attr("value",op.value);
					ui_op.html(op.name);
					selectFirst.append(ui_op);
				}

				//建立初始資料
				if(data.items){

					var items=[];
					for(var i=0;i<data.items.length;i++){
						var item=data.items[i];
					
						var product_type_id = item.product_type_id;
						
						var percent=item.percent;

						var title=selectFirst.find("option[value="+product_type_id+"]").text();
						
						var subtitle=percent+"%";

						var text=item.product_name;

						items.push({title:title,subtitle:subtitle,text:text,item:item});
					}
					addData(formM,items);
				}

				btn.click(function(){
					var formG = $(this).closest(".form-group");	
					var name = formG.attr("gname");	
			
					var selectFirst = formG.find("[name=inputSelect]");
    			var inputFirst 	= formG.find("[name=inputTextFirst]");
    			var inputSecond = formG.find("[name=inputTextSecond]");
    			var formM   		= formG.find(".form-message");

    			inputFirst.attr("type","number");
					inputFirst.attr("placeholder",stringMap["placeholder_commission"]);
					inputSecond.attr("placeholder",stringMap["placeholder_soldproduct"]);
					
					var selectId=selectFirst.val();
					var value1=inputFirst.val();
					var value2=inputSecond.val();
					var item={product_type_id:selectId,percent:value1,product_name:value2};
					
					if(value1===""||value2==="")
						return;

					inputSecond.val("");

					var title = selectFirst.find("option:selected").text();
					var subtitle=value1+"%";
					var text=value2;
					
					var items=[];
					items.push({title:title,subtitle:subtitle,text:text,item:item});
					
					if(addData(formM,items))
						listItemChange(formG);

				});

				inputSecond.keyup(function(event){
					if(event.keyCode===13 && event.shiftKey){
						btn.click();
					}
				});

    		parent.append(formG);
      }
      else if(name==="area"||name==="sell_area"){
      	var formG = $.JSUiFactory("form-group-select3");
				formG.attr("gname",name);
    		
      	var selectFirst = formG.find("[name=inputSelectFirst]");
      	var selectSecond = formG.find("[name=inputSelectSecond]");
      	var selectThird = formG.find("[name=inputSelectThird]");
				selectFirst.attr("name","region");
				selectSecond.attr("name","country");     	 
				selectThird.attr("name","city"); 

				selectFirst.html("");

				var sOpRegion = (opSelect["regions"])?opSelect["regions"]:[];

				for(var i = 0 ;i < sOpRegion.length ;i++){
					var area = sOpRegion[i];
					var option = $("<option>");
					option.attr("value",area.value);
					option.html(area.name);
					selectFirst.append(option);
				}

				var CountryCache=[];
				selectFirst.change(function() {
					var optionSelected = $(this).find("option:selected");
					var valueSelected  = optionSelected.val();
					var textSelected   = optionSelected.text();

					var inSel2 = $(this).closest(".form-group").find("[name=country]");
					inSel2.html("");

					var sOpCountries = (opSelect["countries"])?opSelect["countries"]:[];
				
					for(var i=0;i<sOpCountries.length;i++){
						var country = sOpCountries[i];

						if(country.cities!==undefined){
							CountryCache[country.value]=country;
						}

						if(country.region_id===valueSelected){
							var option = $("<option>");
							option.attr("value",country.value);
							option.html(country.name);
							inSel2.append(option)
						}
					}

					inSel2.change(function(){
						var optionSelected = $(this).find("option:selected");
						var valueSelected  = optionSelected.val();
						var textSelected   = optionSelected.text();
						var country = CountryCache[valueSelected];
						var inSel3 = $(this).closest(".form-group").find("[name=city]");
						
						if(country!==undefined&&country.cities){
							inSel3.html("");
							for(var i=0;i<country.cities.length;i++){
								var city = country.cities[i];
								var option = $("<option>");
								option.attr("value",city.value);
								option.html(city.name);
								inSel3.append(option);
							}
							inSel3.show();
					 	}else{
					 		inSel3.html("");
					 		inSel3.val(0);
					 		inSel3.hide();	
					 	}
					}).change();
				}).change();
				
				if(data.region){
					selectFirst.val(data.region).change();
				}

				if(data.country){
					selectSecond.val(data.country).change();
				}

				if(data.city){
					selectThird.val(data.city);
				}

				selectFirst.change(mutipleSelectChange);
				selectSecond.change(mutipleSelectChange);
				selectThird.change(mutipleSelectChange);

				parent.append(formG);
				
      }
      //Select 產業類別 / 重要性
      else if(name==="industry"||
      				name==="level"||
      				name==="state"||
      				name==="priority")
      {
    		var formG = $.JSUiFactory("form-group-select");
				formG.attr("gname",name);
    		
      	var selectFirst = formG.find("[name=inputSelect]");
				selectFirst.attr("name",name);
		
				var sOption = (opSelect[name])?opSelect[name]:[];
				
				selectFirst.html("");
				for(var i=0;i<sOption.length;i++){
					var op = sOption[i];
			 		var ui_op = $("<option>");
					ui_op.attr("value",op.value);
					ui_op.html(op.name);
					selectFirst.append(ui_op);
				}

				selectFirst.val(data);

				selectFirst.change(selectChange);

    		parent.append(formG);
      }
      // 成員
      // member:{size:"2",items:[{id:"1",name:"HTC"},{id:"2",name:"APPLE"}]}
      else if(name==="member"||name==="attendee"||name==="cc"){
    		var formG = $.JSUiFactory("form-group-autocomplete-input");
				formG.attr("gname",name);
    		

    		var formM = formG.find(".form-message");
    		formM.addClass("attendee");

				var autocomplete=opAutoComplete[name];

				if(autocomplete===undefined){
					console.log("\""+name+"\""+ ":autoComplete Error");
					console.log(opAutoComplete);
					return;
				}

				var URAutoCompleteJson = {
					name:"inputText",
					placeholder:stringMap.inputAttendee,
					enableEnter:true,
					stateSpan:{
						okCssClass:"fa fa-check",
						loadingCssClass:"effect-rotate fa fa-refresh",
						errorCssClass:"fa fa-times"
					},
					StateCallback:function(rc){
						var input = rc.input;
						if(input===undefined){
							console.log("StateCallback:Input Undefined");
							return;
						}
						var formG=input.closest(".form-group");
						var btnAdd=formG.find("[name=addBn]");
						
						
						if(rc.state==="OK"){
							btnAdd.removeClass("disabled");
						}else if(rc.state==="ERROR"){
							btnAdd.addClass("disabled");
						}else if(rc.state==="LOADING"||rc.state==="NONE"){
							btnAdd.addClass("disabled");
						}else if(rc.state==="ENTER"){
							btnAdd.click();
						}
					},
					autocomplete:autocomplete
				};

				formG.find(".form-input").AutoCompleteInput(URAutoCompleteJson);

				//建立初始資料
				if(data.items){

					var items=[];
					for(var i=0;i<data.items.length;i++){
						var item=data.items[i];
										
						var title=item.name;
						
						items.push({title:title,item:item});
					}
					addMember(formM,items);
				}

				var btn = formG.find("button[name=addBn]");
				btn.click(function(){
					var formG = $(this).closest(".form-group");
					var formM = formG.find(".form-message");
					var input = formG.find("input[name=inputText]");
	

					var name=input.attr("name");	
					var selectName = input.val();
					var selectId   = input.attr("select_id");

					if(value===""||selectId===undefined||selectId==="")
						return;

					input.val("").change().focus();

					var items=[];
					var item = {id:selectId,name:selectName}
					items.push({title:selectName,item:item});

					if(addMember(formM,items)){
						listItemChange(formG);
					}

				});
				
				var inputText = formG.find("input[name=inputText]");
				inputText.keyup(function(event){
					if(event.keyCode===13 && event.shiftKey){
						btn.click();
					}
				});
      	parent.append(formG);
      }
      // 售出產品
      else if(name==="soldproduct"){
    		var formG = $.JSUiFactory("form-group-select-input");
				formG.attr("gname",name);
    		

      	var selectFirst = formG.find("[name=inputSelect]");
      	var inputText = formG.find("[name=inputText]");
      	var formM = formG.find(".form-message");
      	var btn   = formG.find("button[name=addBn]");

      	inputText.attr("placeholder",stringMap["placeholder_"+name]);

				var sOption = (opSelect[name])?opSelect[name]:[];
				
				selectFirst.html("");
				for(var i=0;i<sOption.length;i++){
					var op = sOption[i];
			 		var ui_op = $("<option>");
					ui_op.attr("value",op.value);
					ui_op.html(op.name);
					selectFirst.append(ui_op);
				}

				//建立初始資料
				if(data.items){
					var items=[];
					for(var i=0;i<data.items.length;i++){
						var item=data.items[i];
					
						var product_type_id = item.product_type_id;
						
						var title=selectFirst.find("option[value="+product_type_id+"]").text();
						
						var text=item.product_name;

						items.push({title:title,text:text,item:item});
					}
					addData(formM,items);
				}

				btn.click(function(){
					var formG = $(this).closest(".form-group");	
					var name = formG.attr("gname");	
			
					var selectFirst = formG.find("[name=inputSelect]");
    			var inputFirst 	= formG.find("[name=inputText]");
    			var formM   		= formG.find(".form-message");

					var selectId=selectFirst.val();
					var text=inputFirst.val();
			
					var item={product_type_id:selectId,product_name:text};
					
					if(text==="")
						return;

					inputFirst.val("");

					var title = selectFirst.find("option:selected").text();

					var items=[];
					items.push({title:title,text:text,item:item});
				
					if(addData(formM,items))
						listItemChange(formG);

				});

				inputText.keyup(function(event){
					if(event.keyCode===13 && event.shiftKey){
						btn.click();
					}
				});

    		parent.append(formG);
      }
      //checkbox AND radio
      //transaction:{size:"3",items:[{value:"1"},{value:"2"},{value:"3"}]},
			//channel:{size:"3",items:[{value:"1"},{value:"2"},{value:"3"}]},
    	else if(name==="transaction"||name==="channel"||name==="contact_method"){
    		var formG = $.JSUiFactory("form-group");
				formG.attr("gname",name);
    		
      	var row = formG.find(".row");

      	var ui = (opUI[name])?opUI[name]:[];

				for(var i=0;i<ui.length;i++){
					var opt = ui[i];
					createUI(row,opt);
				}	

				formG.find("input[type=text]").each(function(){
					var iname=$(this).attr("name");
					$(this).val(formData.inputs[iname]);
				});

				formG.find("input[type=number]").each(function(){
					var iname=$(this).attr("name");
					$(this).val(formData.inputs[iname]);
				});

				//checkbox
				if(name==="channel"||name==="transaction"){
					if(data.items){
						for(var i=0;i<data.items.length;i++){
							var value = data.items[i].value;
							formG.find('input[type=checkbox][value='+value+']').prop('checked', true);
						}
					}
				}
				//radio
				else if(name==="contact_method"){
					formG.find('input[type=radio][value='+data+']').prop('checked', true);
				}

				formG.find("input[type=text]").change(inputChange).keyup(inputKeyup);
				formG.find("input[type=number]").change(inputChange).keyup(inputKeyup);

				formG.find("input[type=checkbox]").change(checkboxChange);
				formG.find("input[type=radio]").change(radioChange);

      	parent.append(formG);
      }

      // 地址/電話/傳真
      //fax:{size:"1",items:[{country_id:"1",number:"02-55555555",category:"1"}]},
			//phone:{size:"1",items:[{country_id:"0",number:"02-55555555",category:"1"}]},
			//note:{size:"2",items:[{value:"WWWW jAKJLF"},{value:"ASDKLJDLASKL KKLASDLK"}]},
      else if(name==="address"||name==="phone"||name==="fax"){
      	var formG = $.JSUiFactory("form-group-select2-input");
      	
      	formG.attr("gname",name);
      	var selectFirst = formG.find("[name=inputSelectFirst]");
      	var selectSecond = formG.find("[name=inputSelectSecond]");
      	var input = formG.find("input[name=inputText]");
      	var formM = formG.find(".form-message");
      	var btn   = formG.find("button[name=addBn]");
      	
      	parent.append(formG);
				// Select First Country 
				var sOption = (opSelect[name])?opSelect[name]:{};

				var sOp1=(sOption.countries)?sOption.countries:[];
				for(var i=0;i<sOp1.length;i++){
					var country = sOp1[i];
			 		var option = $("<option>");
			 		var c_id   = country.value;
			 		var c_code = country.country_code;
					option.attr("value",c_id);
					if(name==="address"){
						option.html(country.name);
					}else{
						option.html(country.name+" ("+c_code+")");
					}
					selectFirst.append(option);
				}				

				if(opInitial.country_id){
					selectFirst.val(opInitial.country_id);
				}

				// Select Second 
				var sOp2=(sOption.categories)?sOption.categories:[];
				for(var i=0;i<sOp2.length;i++){
					var type = sOp2[i];
			 		var option = $("<option>");
					option.attr("value",type.value);
					option.html(type.name);
					selectSecond.append(option);
				}

				if(data.items){
					var items=[];
					for(var i=0;i<data.items.length;i++){
						var item=data.items[i];
						
						var conutry_id = item.country_id;
						
						var category=item.category;

						var title=selectFirst.find("option[value="+conutry_id+"]").text();
						
						var subtitle=selectSecond.find("option[value="+category+"]").text();

						var text=item.number;

						var css="alert-note";

						if(name==="address"){
							text=item.address; 
						}
						else if(name==="phone"){
							css="alert-note sign-first";
						}

						items.push({title:title,subtitle:subtitle,text:text,item:item,cssClass:css});
					}
					addData(formM,items);
				}

				//事件處理
				btn.click(function(){
					var formG = $(this).closest(".form-group");
      	 	var input = formG.find("input[name=inputText]");
      		var formM = formG.find(".form-message");
       		var selectFirst = formG.find("[name=inputSelectFirst]");
      		var selectSecond = formG.find("[name=inputSelectSecond]");

					var items=[];

					var conutry_id = selectFirst.val();
					
					var category=selectSecond.val();

					var title=selectFirst.find("option:selected").text();
	
					var subtitle=selectSecond.find("option:selected").text();

					var text=input.val();

					if(text==="")
						return;

					input.val("");

					var item={country_id:conutry_id,category:category};

					if(formG.attr("gname")==="address"){
						item["address"]=text; 
					}else{
						item["number"]=text; 
					}

					var css="alert-note";

					if(formG.attr("gname")==="phone"){
						css="alert-note sign-first";
					}
	
					items.push({title:title,subtitle:subtitle,text:text,item:item,cssClass:css});
	
					if(addData(formM,items))
						listItemChange(formG);
				});

				input.keyup(function(event){
					if(event.keyCode===13 && event.shiftKey){
						$(this).closest(".form-group").find("button[name=addBn]").click();
					}
				});
      }
      else if(name==="attachment"){
      	var formG = $.JSUiFactory("form-group-upload");
      	

      	formG.attr("gname",name);

      	var formM=formG.find(".form-message");

      	var AddBn=formG.find(".form-inline .fileinput-button .title").html(stringMap.Add);

      	formM.append("<ul class='ff-items'>");

      	var formP = formG.find(".progress-bar");

      	formP.find(".title").html("").removeClass("sr-only");
      	
      	parent.append(formG);

      	var updateFileItem = function(view,uid,file){
	      	var uItem = view.find("li[uid="+uid+"]");
	      	var icon = $("<img>");
	      	icon.attr("src",file.thumbnailUrl);
	      	uItem.find(".ff-icon").html("").append(icon);
	      	uItem.find(".ff-menu").show();
	      	uItem.removeClass("ff-state-loading");
	      	var editor = uItem.find(".title");
	      	editor.html(file.name);
	     
	      	//{id , type , name , size , thumbnailUrl ,deleteUrl}
					uItem.attr("tid",file.id);
					uItem.data("file",file);
					
					uItem.tooltip({
			   	placement:"top",
				   	title:function(){
				   		var file = $(this).data("file");
				   		var type = file.type;
				   		var size = file.size;
				   		var date = (file.date)?(file.date):"";
				   		return date;
				   	}
			   	});

			   	if(!file.deleteUrl){
			   		uItem.find("[name=removeBn]").remove();		
			   	}

			   	uItem.find("[name=removeBn]").click(function(){
						var formG = $(this).closest(".form-group");
						var uItem = $(this).closest("li[tid]");
						var file = uItem.data("file");
						if(file.deleteUrl){
							$.post(file.deleteUrl)
							  .done(function(rc) {
									console.log(rc);
									uItem.hide("slide", {}, 200, function(){
										$(this).tooltip("destroy").remove();
										uploadItemChange(formG);
						      });
							  })
							  .fail(function() {				
							  })
							  .always(function() {
								}
							);	
						}else{
				   		uItem.hide("slide", {}, 200, function(){				
								$(this).tooltip("destroy").remove();
								uploadItemChange(formG);
				      });
			   		}
			   	});

			   	uItem.find("[name=downloadBn]").click(function(){
			   		var uItem = $(this).closest("li[tid]");
			   		var file = uItem.data("file");
						//window.open(url, 'Download');
						var url  = file.url;
	          var name = file.name;
	          var type = file.type;

	          //var ext=$.JSGetFileExtFromUrl(url);
	          //var filename = name+"."+ext;
	          //var a = $("<a>").attr("href",url).attr("download", filename).appendTo("body");
	          //a[0].click();
	          //a.remove();

		        $("<div>").JSModalDialogOkCancel({
		            title:mStringMap.Message,
		            message:mStringMap.AskDownload,
		            ok:{
		              title:mStringMap.Ok,
		              click:function(){
		                var fext=$.JSGetFileExtFromUrl(file.name);
		                var ext =$.JSGetFileExtFromUrl(file.url);
		                var filename = file.name;
		                if(fext!==ext){
		                  filename = file.name+"."+ext;
		                }
		                var a = $("<a>").attr("href",file.url).attr("download", filename).appendTo("body");
		                a[0].click();
		                a.remove();               
		              }
		            },
		            cancel:{
		              title:mStringMap.Cancel
		            }
		          });
			   	}).hide();
			   	/* 取消改檔名
					uItem.find(".title").addClass("text-editor").click(function(){
				    if($(this).attr("contenteditable")){
				      $(this).attr("contenteditable",true);
				    }else{
				      $(this).wysiwyg({}); 
				    }   
				  }).keydown(function(e){
				    if(e.keyCode===13){
				    	if(e.shiftKey){
				      	$(this).blur();
				    	}
				      return false;
				    }
				  }).blur(function(){
				    $(this).attr("contenteditable",false);
				    uploadItemChange($(this).closest(".form-group"));
				  });*/
      	}
      	//console.log(data);
				for(var i=0;i<data.items.length;i++){
	      	var file = data.items[i];
	      	//console.log(file);
	      	var uid =$.JSUniqueID();
	      	var uItem =  $.JSUiFactory("form-group-file-item"); 
	      	uItem.attr("uid",uid);
	      	uItem.find(".ff-icon").html("uploading");
	      	uItem.find(".ff-menu").hide();
	      	uItem.addClass("ff-state-loading");
	      	formG.find(".ff-items").append(uItem);

	      	updateFileItem(formG,uid,file);
	      }

    		var uploadApi = parent.data("upload");

    		if(!uploadApi){
    			uploadApi = {api:"Upload",target:""};
    		}

    		var initialData = parent.data("initial");

				formG.fileupload({
					url:uploadApi.api, //Upload
			    filesContainer:formM.find(".ff-items"),
			    uploadTemplateId: null,
			    downloadTemplateId: null,
			    maxFileSize: 600000000, 
      		acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp4|mp3|pdf|doc|ppt|zip|xls)$/i,
      		previewSourceFileTypes: '/^image\/(gif|jpeg|png)$/',
			    progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        //console.log(progress+"%");
		        formP.css("width",progress+"%").attr("aria-valuenow",progress).find(".title").html(progress+"%");
			    },
			    drop: function (e, data) {
			    	return false;
			    },
			    add: function (e, data) {
			    	var view = $(this);
			      console.log("add");
			      var files = data.files;
			      var uid =$.JSUniqueID();
			      data.formData = {uid:uid,target:uploadApi.target};

			      for(name in initialData){
			      	data.formData[name]=initialData[name];	
			      }

			      for(var i=0;i<files.length;i++){
			      	var file = files[i];
			      	console.log(file);
			      	var uItem =  $.JSUiFactory("form-group-file-item"); 
			      	uItem.attr("uid",uid);
			      	uItem.find(".ff-icon").html("uploading");
			      	uItem.find(".ff-menu").hide();
			      	uItem.addClass("ff-state-loading");
			      	view.find(".ff-items").append(uItem);
			      }
			      data.submit();
			    },
			    done:function (e, data) {
			    	console.log("done");
			    	console.log(data);
			    	var view = $(this);

			    	if(data.result){
			    		var uid = data.formData.uid;
			    		console.log(uid);
				      for(var i=0;i<data.result.files.length;i++){	
				      	var file = data.result.files[i];
				      	console.log(file);
				      	updateFileItem(view,uid,file);
							}
			    	}
			    	uploadItemChange(view);
			    }
				});
      }
      ///
			else if(name==="no use description"){
				var formG = $.JSUiFactory("form-group-editor");
      	
      	formG.attr("gname",name);
      	parent.append(formG);
				
    		var toolbar= $.JSToolbarFactory("basic-text-editor-toolbar",options);
       
       	var dataTarget = "#editor_"+name;
    		toolbar.attr("data-target",dataTarget);    
    		toolbar.attr("id","editor_toolbar_"+name);

        var editor = $('<div id="editor" class="text-editor form-control">');
          
        editor.attr("id","editor_"+name);
        editor.attr("toolbar-target","#editor_toolbar_"+name);
        editor.attr("name",name);

        formG.find(".form-input").append(toolbar).append(editor);

			  editor.html(data);

				editor.wysiwyg({toolbarSelector:"#editor_toolbar_"+name}).keydown(function(e){
					if(e.keyCode===13&&e.shiftKey){
						$(this).blur();	
						return true;
					}
				}).blur(function(){
					textEditorChange($(this).closest(".form-group"));
				});
			}
      ///
      else if(name==="reply"){
      	var div = $("form");
      	parent.append(div); 

      	div.attr(name="reply");
      		
      	$.JSFormFactory(div,data,options);
      	
      }
			else if(name==="host"||name==="comment"||name==="description"){
				var formG = $.JSUiFactory("form-group-textarea");
      	
      	formG.attr("gname",name);
      	
      	var textarea = formG.find("textarea");
      	textarea.attr("name",name);
      	parent.append(formG);
      	//textarea.css("min-height","60px");
      	textarea.val(data.replace(/<br\/>/g, "\n").replace(/<br>/g, "\n"));
      	//textarea.css("height","60px");
      	//textarea.addClass("animate").autosize().trigger( "resize" );

      	textarea.change(inputChange);
      	textarea.keydown(inputKeydown);
			}
      ///
      else if(name==="date"||name==="meeting_date"||name==="deadline"||name==="remind"){
      	var formG = $.JSUiFactory("form-group-date");
      	
      	formG.attr("gname",name);
      	var inputFirst = formG.find("[name=inputText]");
     
      	parent.append(formG);

				inputFirst.attr("name",name);

				inputFirst.css("text-align","left");

				//設定值
				inputFirst.val(data);

				//清除內容
				formG.find(".input-clear").click(function(){
					console.log("click");
					var formG = $(this).closest("[gname]");
					var name = formG.attr("gname");
					formG.find("input[name="+name+"]").val("").change();
				});

				var dateOp={scrollMonth:false};

				if(name==="date"){
					dateOp["format"]="Y/m/d";	
					dateOp["timepicker"]=false;	
				}
				
				dateOp["onShow"]=function( ct ,$input){

				  };
			  dateOp["onClose"]=function(dp,$input){
			    $input.change();
			  };

				inputFirst.datetimepicker(dateOp);

				inputFirst.change(inputChange);
      }
      ///
      else if(name==="date_begin"){
      	var formG = $.JSUiFactory("form-group-date2-input");
      	
      	formG.attr("gname",name);
      	var inputFirst = formG.find("[name=inputFirst]");
      	var inputSecond = formG.find("[name=inputSecond]"); 	
      	parent.append(formG);

				inputFirst.attr("name","date_begin");
				inputFirst.attr("dependent-target","date_end");
				inputSecond.attr("name","date_end");
				inputSecond.attr("dependent-target","date_begin");

				//設定值
				inputFirst.val(data);
				if(formData.inputs["date_end"])
					inputSecond.val(formData.inputs["date_end"]);

				inputFirst.datetimepicker({
				  format:'Y/m/d',
				  scrollMonth:false,
				  onShow:function( ct ,$input){
				  	var formG = $input.closest(".form-group");	
				  	var dName = $input.attr("dependent-target");
				  	var dInput=formG.find("[name="+dName+"]");
				 
				   	this.setOptions({
				    maxDate:dInput.val()?dInput.val():false
				   })
				  },
				  onClose:function(dp,$input){
				    $input.change();
				  },
				  timepicker:false
				});
				inputSecond.datetimepicker({
				  format:'Y/m/d',
				  scrollMonth:false,
				  onShow:function( ct ,$input){
				  	var formG = $input.closest(".form-group");	
				  	var dName = $input.attr("dependent-target");
				  
				  	var dInput=formG.find("[name="+dName+"]");
				   	this.setOptions({
				    minDate:dInput.val()?dInput.val():false
				   })
				  },
				  onClose:function(dp,$input){
				    $input.change();
				  },
				  timepicker:false
				});

				inputFirst.change(inputChange);
				inputSecond.change(inputChange);
      }
      ///
    }
		
		// 標記必填欄位
		var required = (formData.required)?formData.required:{};
    parent.find(".form-group[gname]").each(function(){
    	var formG = $(this);
    	var name = formG.attr("gname");
    	var label = stringMap[name];
			if(required[name]){
				label+=" (*)";

				formG.find(".control-label").tooltip({
	  			placement:"bottom",
	  			title:stringMap.HintRequire
	  		});	
			}
  		formG.find(".control-label").html(label+":");
  		formG.find(".control-label").attr("for",name);
    });
        
    //設定介面共用介面字串
    parent.find("[name=addBn] .title").text(stringMap.Add);
    parent.find("[name=addBn] i").tooltip({
    	placement:"bottom",
    	title:stringMap.Add
    });

    //只有list可排序
		parent.find(".sortable").sortable({
			cancel:"strong",
		  start: function (event, ui) {
          //var currPos1 = ui.item.index();
      },
      change:  function (event, ui) {
          //var currPos2 = ui.item.index();
      },
      update: function(event, ui) {
        //console.log("update");
        var formG = $(this).closest(".form-group");
        listItemChange(formG);
      },
      stop: function (event, ui) {

      }      
    });
	}

  // 新增 note list
  $.JSUiCreateAlertListItem=function(json){
    var div = $("<div>");
    div.addClass("alert alert-list alert-dismissable");
    if(json.cssClass!==undefined){
      div.addClass(json.cssClass);
    }
    if(json.enableClose!==undefined){
      //data-dismiss="alert" 
      var closeBn = $('<button type="button" class="close" aria-hidden="true">x</button>');
      div.append(closeBn);  

      closeBn.click(function(){
        $("<div>").ModalDialogOkCancel({
          title:stringMap.Message,
          message:stringMap.AskDelete,
          ok:{
            title:stringMap.Delete,
            click:function(){
              div.remove();

              if(json.afterClose){
                json.afterClose();
              }   
            }
          },
          cancel:{
            title:stringMap.Cancel
          }
        });   
      });
    }
    var strong = $("<strong>");
    for(var i=0;i<json.list.length;i++){

      if(i>0 && i<json.list.length){
        strong.append("<br>");
      }

      var item = json.list[i];
      var label = $("<label>");
      label.html(item.value);
      var input = $('<input type="hidden">');
      input.attr("name",item.name);
      input.val(item.value);
      label.append(input);
      strong.append(label);
    }

    div.append(strong);

    return div;
  }

}(window.jQuery || window.$));
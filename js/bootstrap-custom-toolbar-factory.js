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
    //
    Sort:"Sort",    
    Deadline:"Deadline",
    Priority:"Priority",
    All:"All",
    Done:"Done",
    Undone:"Undone",
    Refresh:"Refresh",
    ToDo:"To Do",
    Assign:"Assign"
  },
  tw:{
    Sort:"排序",
    Deadline:"期限",
    Priority:"優先權",
    All:"全部",
    Done:"完成",
    Undone:"未完成",
    Refresh:"更新",
    ToDo:"工作",
    Assign:"指派"
    },
  cn:{
    Sort:"排序",
    Deadline:"期限",
    Priority:"优先权",
    All:"全部",
    Done:"完成",
    Undone:"未完成",
    Refresh:"更新",
    ToDo:"工作",
    Assign:"指派"
  }
}

$.JSToolbarFactory  = function(name,options){
	var stringMap = stringTable.en;

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
  
  // click / state / notification / Link 
	var onEvent=(options.onEvent)?options.onEvent:function(){};
  var formName=(options.formName)?options.formName:"";
  var formData=(options.formData)?options.formData:{};
  var formOptions=(options.formOptions)?options.formOptions:{};

	if(name==="basic-edit-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"EditBn",
          title:stringMap.Edit,
          iconCssClass:"fa fa-edit",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },
        {
          name:"SaveBn",
          group:"EditMode",
          title:stringMap.Save,
          iconCssClass:"fa fa-save",
          cssClass:"btn-success",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        }
    ]};
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
	}
  else if(name==="basic-reply-toolbar"){
    var toolbar =$('<div class="toolbar"></div>');
    var uiTitle=$("<div class='title' style='min-height:10px'></div>");
    toolbar.append(uiTitle).append("&nbsp;&nbsp;");
    
    if(options.title){  
      uiTitle.html(options.title);   
    }

    var fieldset = $("<fieldset>");

    if(options.formName){
      fieldset.attr("gname",options.formName);
    }

    toolbar.append(fieldset);

    $.JSFormFactory(fieldset,formData,formOptions);

    var toolbarJson = {
      title:"",//(options.title)?options.title:"",
      buttons:[
        {
          name:"PublishBn",
          title:stringMap.Publish,
          iconCssClass:"fa fa-comment-o",
          cssClass:"btn-primary",
          group:"EditMode",
          pullRight:true,
          click:function(){  
            onEvent("buttonClick",{ui:$(this)});
          }
        }
      ]
    };
    var div =$('<div style="height:36px"></div>');
    div.JSToolbar(toolbarJson);
    toolbar.append(div);

    return toolbar;
  }
  else if(name==="basic-task-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"sortSelect",
          title:"Sort",
          iconCssClass:"fa fa-tasks",
          cssClass:"btn-primary",
          tooltip:{
            placement:"bottom",
            title:stringMap.Sort
          },
          type:"select",
          options:[
            {text:stringMap.Deadline,value:"0"},{text:stringMap.Priority,value:"1"}
          ],
          group:"",
          change:function(){
            onEvent("selectChange",{ui:$(this)});  
          }
        }
        ,{
          name:"showByStateSelect",
          title:stringMap.Show,
          iconCssClass:"fa fa-tasks",
          cssClass:"btn-primary",
          type:"select",
          options:[
            {text:stringMap.All,value:"0"},{text:stringMap.Done,value:"1"},{text:stringMap.Undone,value:"2"}
          ],
          group:"",
          change:function(){
            onEvent("selectChange",{ui:$(this)});  
          }
        },{
          name:"showByRoleSelect",
          title:stringMap.Show,
          iconCssClass:"fa fa-bullseye",
          cssClass:"btn-success",
          group:"",
          type:"select",
          options:[
            {text:stringMap.All,value:"0"},{text:stringMap.ToDo,value:"1"},{text:stringMap.Assign,value:"2"}
          ],
          change:function(){
            onEvent("selectChange",{ui:$(this)});  
          }
        },{
          name:"newToDoBn",
          title:stringMap.Add,
          iconCssClass:"fa fa-plus",
          cssClass:"btn-warning",
          group:"",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"refreshBn",
          title:stringMap.Refresh,
          iconCssClass:"fa fa-refresh",
          cssClass:"btn-info",
          group:"",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        }
      ]
    }
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
  }
  else if(name==="basic-link-button-toolbar"){

    var buttons=[];

    for(var i=0;i<formData.buttons.length;i++){
      var btn = formData.buttons[i];
      buttons.push({
          name:"LinkBn",
          title:btn.title,
          iconCssClass:"",
          cssClass:"btn-primary",
          pullRight:true,
          data:btn,
          click:function(){  
            onEvent("buttonClick",{ui:$(this)});
          }
        });  
    }

    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:buttons
    };
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;   
  }
  //
  else if(name==="basic-publish-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"PublishBn",
          title:stringMap.Publish,
          iconCssClass:"fa fa-comment-o",
          cssClass:"btn-primary",
          group:"EditMode",
          pullRight:true,
          click:function(){  
            onEvent("buttonClick",{ui:$(this)});
          }
        }
      ]
    };
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
  }
  //
  else if(name==="basic-submit-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"SubmitBn",
          title:stringMap.Submit,
          iconCssClass:"fa fa-upload",
          cssClass:"btn-primary",
          group:"EditMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },
        {
          name:"CancelBn",
          title:stringMap.Cancel,
          iconCssClass:"fa fa-times",
          cssClass:"btn-danger",
          group:"EditMode",
          pullRight:true, 
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }         
        }
      ]
    };
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
  }
  //最基本title bar
  else if(name==="basic-title-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[]
    };
    var toolbar =$('<div class="toolbar"></div>'); 
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
	}
  else if(name==="calendar-toolbar"){
    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"PrevYearBn",
          title:"",
          iconCssClass:"fa fa-angle-double-left",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"PrevBn",
          title:"",
          iconCssClass:"fa fa-angle-left",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"NextBn",
          title:"",
          iconCssClass:"fa fa-angle-right",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"NextYearBn",
          title:"",
          iconCssClass:"fa fa-angle-double-right",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"TodayBn",
          title:"Today",
          iconCssClass:"",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"MonthBn",
          title:"Month",
          iconCssClass:"",
          cssClass:"btn-info",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },{
          name:"WeekBn",
          title:"Week",
          iconCssClass:"",
          cssClass:"btn-success",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        }
      ]
    } 
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
  }
  //Table
  else if(name==="table-edit-toolbar"){

    var postApi  = (formOptions.api)?formOptions.api[formName]:{};
    var postInit = (formOptions.initial)?formOptions.initial:{};
    var webApi   = (formOptions.webApi)?formOptions.webApi:"action";

    var toolbarJson = {
      title:(options.title)?options.title:"",
      buttons:[
        {
          name:"EditBn",
          title:stringMap.Edit,
          iconCssClass:"fa fa-edit",
          cssClass:"btn-primary",
          group:"ViewMode",
          pullRight:true,
          click:function(){
            onEvent("buttonClick",{ui:$(this)});
          }
        },
        {
          name:"SelectAllBn",
          title:stringMap.AllNone,
          iconCssClass:"fa fa-check-square-o",
          cssClass:"btn-primary disabled",
          group:"EditMode", 
          click:function(){
            var formT = $(this).closest(".form-table");
            var formName = formT.attr("name");
            var tableF = formT.find("fieldset");
            
            if($(this).hasClass("selectAll")){
              $(this).removeClass("selectAll");
              tableF.find("tbody tr [type=checkbox]").prop("checked",false);  
            }else{
              $(this).addClass("selectAll");
              tableF.find("tbody tr [type=checkbox]").prop("checked",true); 
            } 
          }         
        },
        {
          name:"NewBn",
          title:stringMap.Add,
          iconCssClass:"fa fa-plus",
          cssClass:"btn-warning disabled",
          group:"EditMode",
          pullRight:true,
          click:function(){
            var formT = $(this).closest(".form-table");
            var formName = formT.attr("name");
            var tableF = formT.find("fieldset");

            var postData={};
            postData["type"]="New";

            for(var tname in postApi){
              postData[tname]=postApi[tname];
            }
						
            for(var iname in postInit){
              postData[iname]=postInit[iname]; 
            }

            postData["items"]=[];

            $.JSApiPost.direct(webApi,postData,function(act,rcJson){

              switch(act){
                case "begin":{
                  onEvent("state",{name:formName,state:"loading"});
                  break;
                }
                case "success":{
                  if(rcJson.inputs===undefined){
                    rcJson["inputs"]={};
                  }

                  if(options.defaultValue){
                    for(iname in options.defaultValue){
                      if(rcJson.inputs[iname]===undefined){
                        rcJson.inputs[iname]=options.defaultValue[iname];
                      }
                    }
                  }

                  var opts = {insertFirst:true};

                  for(var name in options){
                    opts[name]=options[name];
                  }

                  tableF.ModuleTable_New(rcJson,opts);
                  
                  onEvent("state",{name:formName,state:"ok"});

                  break;                  
                }
                case "fail":{
                  onEvent("state",{name:formName,state:"error"});
                  onEvent("notification",{title:stringMap.Message,description:rcJson.message});     
                }
                case "error":{
                  onEvent("state",{name:formName,state:"error"});
                  onEvent("notification",{title:stringMap.Message,description:stringMap.Error});
                }
                case "end":
                default:{
                  break;
                }

              }
            });                      
          }
        },
        {
          name:"DeleteBn",
          title:stringMap.Delete,
          iconCssClass:"fa fa-trash-o",
          cssClass:"btn-danger disabled",
          group:"EditMode", 
          pullRight:true,
          click:function(){

            var formT = $(this).closest(".form-table");
            var formName = formT.attr("name");
            var tableF = formT.find("fieldset");

            var removeItems=[];
            removeItems = formT.ModuleTable_GetCheckedId();

            if(removeItems.length==0)
              return;

            $("<div>").JSModalDialogOkCancel({
              title:stringMap.Message,
              message:stringMap.AskDelete,
              ok:{
                title:stringMap.Delete,
                click:function(){

                  var postData={};
                  postData["type"]="Delete";
       
					        for(var tname in postApi){
					          postData[tname]=postApi[tname];
					        }
									
					        for(var iname in postInit){
					          postData[iname]=postInit[iname]; 
					        }

                  postData["items"]=removeItems;
                          
                  onEvent("state",{name:formName,state:"none"});

                  $.JSApiPost.block(webApi,postData,function(act,rcJson){

                    switch(act){
                      case "begin":{
                        onEvent("state",{name:formName,state:"loading"});
                        break;
                      }
                      case "success":{   
                        for(var i=0;i<postData.items.length;i++){
                          var id = postData.items[i];
                          tableF.ModuleTable_Remove({id:id});
                        }
                        //onEvent("state",{name:formName,state:"ok"});
                        break;                  
                      }
                      case "fail":{
                        onEvent("state",{name:formName,state:"error"});
                        onEvent("notification",{title:stringMap.Message,description:rcJson.message});  
                        break;   
                      }
                      case "error":{
                        onEvent("state",{name:formName,state:"error"});
                        onEvent("notification",{title:stringMap.Message,description:stringMap.Error});
                        break;
                      }
                      case "end":{
                        for(var i=0;i<postData.items.length;i++){
                          var id = postData.items[i];
                          tableF.ModuleTable_Remove({id:id});
                        }
                      }
                      default:{
                        break;
                      }
                    }
                  }); 
                }
              },
              cancel:{
                title:stringMap.Cancel
              }
            });
          }   
        }
        ,
        {
          name:"SaveBn",
          title:stringMap.Save,
          iconCssClass:"fa fa-save",
          cssClass:"btn-success disabled",
          group:"EditMode",
          pullRight:true,
          click:function(){
            var button = $(this);
            var formT = $(this).closest(".form-table");
            var formName = formT.attr("name");
            var tableF = formT.find("fieldset");
            //var tableName = tableF.attr("gname");
            
            //onChangeViewMode(formT,"ViewMode");            
            var postData={};
            postData["type"]="Update";

            for(var tname in postApi){
              postData[tname]=postApi[tname];
            }

            for(var iname in postInit){
              postData[iname]=postInit[iname]; 
            }

            postData["items"]=formT.ModulTable_GetItemsData();

            $.JSApiPost.block(webApi,postData,function(act,rcJson){

              switch(act){
                case "begin":{
                  break;
                }
                case "success":{
                  // 通知已完成儲存
                  onEvent("buttonClick",{ui:button});
                  onEvent("notification",{title:stringMap.Message,description:stringMap.UpdateSuccess}); 
                  break;                  
                }
                case "fail":{
                  onEvent("notification",{title:stringMap.Message,description:rcJson.message});
                  break; 
                }
                case "error":{
                  onEvent("notification",{title:stringMap.Message,description:stringMap.UpdateFailed});
                  break;
                }
                case "end":
                default:{
                  break;
                }

              }
            });
            
          } 
        }
        ,
        { 
          name:"DisplayBn",
          title:stringMap.Display,
          iconCssClass:"fa fa-th",
          cssClass:"btn-info",
          dataTarget:".table-select-panel",
          pullRight:true,
          click:function(){ 
            var formT = $(this).closest(".form-table");
            var formName = formT.attr("name");
            var tableF = formT.find("fieldset");
            //var tableName = tableF.attr("gname");
            var target = $(this).attr("data-target");
            formT.ModuleTable_TriggerSelectForm(target,formOptions.header[formName],stringMap);
          }
          //-->顯示按鍵開啟和關閉-->end
        }
      ]
    } 
    var toolbar =$('<div class="toolbar"></div>');
    toolbar.JSToolbar(toolbarJson);
    return toolbar;
	}else if(name==="basic-text-editor-toolbar"){

    //data-role="editor-toolbar"
    var toolbar=$('<div class="text-editor-toolbar" group="EditMode" data-target="#editor"></div>');
    
    // font-style 
    toolbar.append(
        '<div class="btn-group btn-sm">'+
          '<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>'+
           '<ul class="dropdown-menu"></ul>'+
        '</div>');        
    // font-size
    toolbar.append('<div class="btn-group btn-sm">'+
          '<a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="fa fa-text-height"></i><b class="caret"></b></a>'+
            '<ul class="dropdown-menu">'+
              '<li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>'+
              '<li><a data-edit="fontSize 4"><font size="4">Large</font></a></li>'+
              '<li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>'+
              '<li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>'+
            '</ul>'+
          '</div>');  
    toolbar.append('<div class="btn-group btn-sm hidden">'+
            '<select data-edit="ForeColor" class="btn btn-default form-control " title="Font Color">'+
            '<option value="transparent">Transparent</option>'+
            '<option value="#303030">Dark</option>'+
            '</select>'+
          '</div>');

    toolbar.append('<div class="btn-group btn-sm hidden">'+
            '<select data-edit="hiliteColor" class="btn btn-default form-control " title="Font Color">'+
            '<option value="transparent">Transparent</option>'+
            '</select>'+
          '</div>');

    toolbar.append('<div class="btn-group btn-sm">'+
            '<a class="btn btn-default" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>'+
            '<a class="btn btn-default" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>'+
            '<a class="btn btn-default" data-edit="strikethrough" title="Strikethrough"><i class="fa fa-strikethrough"></i></a>'+
            '<a class="btn btn-default" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>'+
          '</div>');
    toolbar.append('<div class="btn-group btn-sm">'+
            '<a class="btn btn-default" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>'+
            '<a class="btn btn-default" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>'+
            '<a class="btn btn-default" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="fa fa-outdent"></i></a>'+
            '<a class="btn btn-default" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>'+
          '</div>');
    toolbar.append('<div class="btn-group btn-sm">'+
            '<a class="btn btn-default" data-edit="justifyleft" title="Align Left"><i class="fa fa-align-left"></i></a>'+
            '<a class="btn btn-default" data-edit="justifycenter" title="Center"><i class="fa fa-align-center"></i></a>'+
            '<a class="btn btn-default" data-edit="justifyright" title="Align Right"><i class="fa fa-align-right"></i></a>'+
            '<a class="btn btn-default" data-edit="justifyfull" title="Justify"><i class="fa fa-align-justify"></i></a>'+
          '</div>');
    toolbar.append('<div class="btn-group btn-sm hidden">'+
            '<a class="btn btn-default" data-toggle="dropdown" title="Hyperlink"><i class="fa fa-link"></i></a>'+        
            '<div class="dropdown-menu input-append">'+
              '<div class="input-group" style="padding:5px">'+
                '<input class="form-control" placeholder="URL" type="text" data-edit="createLink"/>'+
                '<span class="btn input-group-addon" type="button">Add</span>'+
              '</div>'+
            '</div>'+  
            '<a class="btn btn-default" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-unlink"></i></a>'+
          '</div>');
    toolbar.append('<div class="btn-group btn-sm hidden">'+
            '<a class="btn btn-default" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i>'+
            '<input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" /></a>'+
          '</div>');
    toolbar.append('<div class="btn-group btn-sm">'+
            '<a class="btn btn-default" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>'+
            '<a class="btn btn-default" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>'+
          '</div>');

    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
              'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
              'Times New Roman', 'Verdana'];
    var fontTarget = toolbar.find('[title=Font]').siblings('.dropdown-menu');

    $.each(fonts, function (idx, fontName) {
        fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
    });

    toolbar.find('a[title]').tooltip({container:'body'});
    
    toolbar.find('.dropdown-menu input').click(function() {return false;})
          .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
          .keydown('esc', function () {this.value='';$(this).change();});

    toolbar.find('[data-role=magic-overlay]').each(function () { 
          var overlay = $(this), target = $(overlay.data('target')); 
          overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });
    return toolbar;
  }

	return $('<div class="toolbar"></div>');
}
}(window.jQuery || window.$));
/*
	Author:Shijie
  Date:20140512
  Version:1.0
  Description:UI Factory
  Require:
   1.JQuery

  name:
   1.loader:3D Loading Effect 

*/

(function($) { 
	'use strict';

  $.JSUiFactory=function(name){

  	var ui=null;

  	if(name==="circular3d-loader"){
	    ui = $('<div class="circular3d-loader" style="width:100%;height:100%;top:0px;left:0px;position:absolute;display:none;"> ');
  	
      var type=parseInt(Math.random() * 3);


      if(type===0){
        ui.css("background","rgba(0,0,0,0.75)");
    		var loadingCss='<style>#circular3dG{position:relative;width:128px;height:128px;}.circular3dG{position:absolute;background-color:#FFFFFF;width:36px;height:36px;-moz-border-radius:38px;-moz-animation-name:bounce_circular3dG;-moz-animation-duration:1.04s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-webkit-border-radius:38px;-webkit-animation-name:bounce_circular3dG;-webkit-animation-duration:1.04s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-ms-border-radius:38px;-ms-animation-name:bounce_circular3dG;-ms-animation-duration:1.04s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-o-border-radius:38px;-o-animation-name:bounce_circular3dG;-o-animation-duration:1.04s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;border-radius:38px;animation-name:bounce_circular3dG;animation-duration:1.04s;animation-iteration-count:infinite;animation-direction:linear;}#circular3d_1G{left:52px;top:8px;-moz-animation-delay:0.39s;-webkit-animation-delay:0.39s;-ms-animation-delay:0.39s;-o-animation-delay:0.39s;animation-delay:0.39s;}#circular3d_2G{left:78px;top:30px;-moz-animation-delay:0.52s;-webkit-animation-delay:0.52s;-ms-animation-delay:0.52s;-o-animation-delay:0.52s;animation-delay:0.52s;}#circular3d_3G{left:94px;top:58px;-moz-animation-delay:0.65s;-webkit-animation-delay:0.65s;-ms-animation-delay:0.65s;-o-animation-delay:0.65s;animation-delay:0.65s;}#circular3d_4G{left:88px;top:86px;-moz-animation-delay:0.78s;-webkit-animation-delay:0.78s;-ms-animation-delay:0.78s;-o-animation-delay:0.78s;animation-delay:0.78s;}#circular3d_5G{left:54px;top:94px;-moz-animation-delay:0.9099999999999999s;-webkit-animation-delay:0.9099999999999999s;-ms-animation-delay:0.9099999999999999s;-o-animation-delay:0.9099999999999999s;animation-delay:0.9099999999999999s;}#circular3d_6G{left:10px;top:62px;-moz-animation-delay:1.04s;-webkit-animation-delay:1.04s;-ms-animation-delay:1.04s;-o-animation-delay:1.04s;animation-delay:1.04s;}#circular3d_7G{left:0px;top:18px;-moz-animation-delay:1.1700000000000002s;-webkit-animation-delay:1.1700000000000002s;-ms-animation-delay:1.1700000000000002s;-o-animation-delay:1.1700000000000002s;animation-delay:1.1700000000000002s;}#circular3d_8G{left:22px;top:0px;-moz-animation-delay:1.3s;-webkit-animation-delay:1.3s;-ms-animation-delay:1.3s;-o-animation-delay:1.3s;animation-delay:1.3s;}@-moz-keyframes bounce_circular3dG{0%{-moz-transform:scale(1)}100%{-moz-transform:scale(.3)}}@-webkit-keyframes bounce_circular3dG{0%{-webkit-transform:scale(1)}100%{-webkit-transform:scale(.3)}}@-ms-keyframes bounce_circular3dG{0%{-ms-transform:scale(1)}100%{-ms-transform:scale(.3)}}@-o-keyframes bounce_circular3dG{0%{-o-transform:scale(1)}100%{-o-transform:scale(.3)}}@keyframes bounce_circular3dG{0%{transform:scale(1)}100%{transform:scale(.3)}}</style>';
  	    ui.append(loadingCss);
  	    var circular=$('<div id="circular3dG" style="margin:auto;top:30%;">');
  	    for(var i=1;i<=8;i++){
  	    	var c=$('<div class="circular3dG"></div>');
  	    	c.attr("id","circular3d_"+i+"G");
  	    	circular.append(c);
  	    }
        ui.append(circular);
      }else if(type===1){
        ui.css("background","rgba(255,255,255,0.75)");
        var loadingCss='<style>#circularG{position:relative;width:128px;height:128px}.circularG{position:absolute;background-color:#000;width:29px;height:29px;-moz-border-radius:19px;-moz-animation-name:bounce_circularG;-moz-animation-duration:0.96s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-webkit-border-radius:19px;-webkit-animation-name:bounce_circularG;-webkit-animation-duration:0.96s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-ms-border-radius:19px;-ms-animation-name:bounce_circularG;-ms-animation-duration:0.96s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-o-border-radius:19px;-o-animation-name:bounce_circularG;-o-animation-duration:0.96s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;border-radius:19px;animation-name:bounce_circularG;animation-duration:0.96s;animation-iteration-count:infinite;animation-direction:linear;}#circularG_1{left:0;top:50px;-moz-animation-delay:0.36s;-webkit-animation-delay:0.36s;-ms-animation-delay:0.36s;-o-animation-delay:0.36s;animation-delay:0.36s;}#circularG_2{left:14px;top:14px;-moz-animation-delay:0.48s;-webkit-animation-delay:0.48s;-ms-animation-delay:0.48s;-o-animation-delay:0.48s;animation-delay:0.48s;}#circularG_3{top:0;left:50px;-moz-animation-delay:0.6s;-webkit-animation-delay:0.6s;-ms-animation-delay:0.6s;-o-animation-delay:0.6s;animation-delay:0.6s;}#circularG_4{right:14px;top:14px;-moz-animation-delay:0.72s;-webkit-animation-delay:0.72s;-ms-animation-delay:0.72s;-o-animation-delay:0.72s;animation-delay:0.72s;}#circularG_5{right:0;top:50px;-moz-animation-delay:0.84s;-webkit-animation-delay:0.84s;-ms-animation-delay:0.84s;-o-animation-delay:0.84s;animation-delay:0.84s;}#circularG_6{right:14px;bottom:14px;-moz-animation-delay:0.96s;-webkit-animation-delay:0.96s;-ms-animation-delay:0.96s;-o-animation-delay:0.96s;animation-delay:0.96s;}#circularG_7{left:50px;bottom:0;-moz-animation-delay:1.08s;-webkit-animation-delay:1.08s;-ms-animation-delay:1.08s;-o-animation-delay:1.08s;animation-delay:1.08s;}#circularG_8{left:14px;bottom:14px;-moz-animation-delay:1.2s;-webkit-animation-delay:1.2s;-ms-animation-delay:1.2s;-o-animation-delay:1.2s;animation-delay:1.2s;}@-moz-keyframes bounce_circularG{0%{-moz-transform:scale(1)}100%{-moz-transform:scale(.3)}}@-webkit-keyframes bounce_circularG{0%{-webkit-transform:scale(1)}100%{-webkit-transform:scale(.3)}}@-ms-keyframes bounce_circularG{0%{-ms-transform:scale(1)}100%{-ms-transform:scale(.3)}}@-o-keyframes bounce_circularG{0%{-o-transform:scale(1)}100%{-o-transform:scale(.3)}}@keyframes bounce_circularG{0%{transform:scale(1)}100%{transform:scale(.3)}}</style>';
        ui.append(loadingCss);
        var circular=$('<div id="circularG" style="margin:auto;top:30%;">');
        for(var i=1;i<=8;i++){
          var c=$('<div class="circularG"></div>');
          c.attr("id","circularG_"+i);
          circular.append(c);
        }
        ui.append(circular);
      }else {
        ui.css("background","rgba(255,255,255,0.75)");
        var loadingCss='<style>#fountainTextG{position:relative;width:220px;}.fountainTextG{color:#000000;font-family:Impact;font-size:42px;text-decoration:none;font-weight:normal;font-style:normal;float:left;-moz-animation-name:bounce_fountainTextG;-moz-animation-duration:1.82s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-moz-transform:scale(.5);-webkit-animation-name:bounce_fountainTextG;-webkit-animation-duration:1.82s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-webkit-transform:scale(.5);-ms-animation-name:bounce_fountainTextG;-ms-animation-duration:1.82s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-ms-transform:scale(.5);-o-animation-name:bounce_fountainTextG;-o-animation-duration:1.82s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;-o-transform:scale(.5);animation-name:bounce_fountainTextG;animation-duration:1.82s;animation-iteration-count:infinite;animation-direction:linear;transform:scale(.5);}#fountainTextG_1{-moz-animation-delay:0.52s;-webkit-animation-delay:0.52s;-ms-animation-delay:0.52s;-o-animation-delay:0.52s;animation-delay:0.52s;}#fountainTextG_2{-moz-animation-delay:0.65s;-webkit-animation-delay:0.65s;-ms-animation-delay:0.65s;-o-animation-delay:0.65s;animation-delay:0.65s;}#fountainTextG_3{-moz-animation-delay:0.78s;-webkit-animation-delay:0.78s;-ms-animation-delay:0.78s;-o-animation-delay:0.78s;animation-delay:0.78s;}#fountainTextG_4{-moz-animation-delay:0.91s;-webkit-animation-delay:0.91s;-ms-animation-delay:0.91s;-o-animation-delay:0.91s;animation-delay:0.91s;}#fountainTextG_5{-moz-animation-delay:1.04s;-webkit-animation-delay:1.04s;-ms-animation-delay:1.04s;-o-animation-delay:1.04s;animation-delay:1.04s;}#fountainTextG_6{-moz-animation-delay:1.17s;-webkit-animation-delay:1.17s;-ms-animation-delay:1.17s;-o-animation-delay:1.17s;animation-delay:1.17s;}#fountainTextG_7{-moz-animation-delay:1.3s;-webkit-animation-delay:1.3s;-ms-animation-delay:1.3s;-o-animation-delay:1.3s;animation-delay:1.3s;}#fountainTextG_8{-moz-animation-delay:1.43s;-webkit-animation-delay:1.43s;-ms-animation-delay:1.43s;-o-animation-delay:1.43s;animation-delay:1.43s;}#fountainTextG_9{-moz-animation-delay:1.56s;-webkit-animation-delay:1.56s;-ms-animation-delay:1.56s;-o-animation-delay:1.56s;animation-delay:1.56s;}#fountainTextG_10{-moz-animation-delay:1.69s;-webkit-animation-delay:1.69s;-ms-animation-delay:1.69s;-o-animation-delay:1.69s;animation-delay:1.69s;}@-moz-keyframes bounce_fountainTextG{0%{-moz-transform:scale(1);color:#000000;}100%{-moz-transform:scale(.5);color:#FFFFFF;}}@-webkit-keyframes bounce_fountainTextG{0%{-webkit-transform:scale(1);color:#000000;}100%{-webkit-transform:scale(.5);color:#FFFFFF;}}@-ms-keyframes bounce_fountainTextG{0%{-ms-transform:scale(1);color:#000000;}100%{-ms-transform:scale(.5);color:#FFFFFF;}}@-o-keyframes bounce_fountainTextG{0%{-o-transform:scale(1);color:#000000;}100%{-o-transform:scale(.5);color:#FFFFFF;}}@keyframes bounce_fountainTextG{0%{transform:scale(1);color:#000000;}100%{transform:scale(.5);color:#FFFFFF;}}</style>';
        ui.append(loadingCss);
        var circular=$('<div id="fountainTextG" style="margin:auto;top:30%;"><div id="fountainTextG_1" class="fountainTextG">L</div><div id="fountainTextG_2" class="fountainTextG">o</div><div id="fountainTextG_3" class="fountainTextG">a</div><div id="fountainTextG_4" class="fountainTextG">d</div><div id="fountainTextG_5" class="fountainTextG">i</div><div id="fountainTextG_6" class="fountainTextG">n</div><div id="fountainTextG_7" class="fountainTextG">g</div><div id="fountainTextG_8" class="fountainTextG">.</div><div id="fountainTextG_9" class="fountainTextG">.</div><div id="fountainTextG_10" class="fountainTextG">.</div></div>');
        ui.append(circular);
      }


    }
    else if(name==="cbp-tmtimeline/li"){
    	var text='<li><time class="cbp-tmtime"> </time><div class="cbp-tmicon"></div><div class="cbp-tmlabel"></div><div class="cbp-tmtoolbar"></div></li>';
    	ui = $(text);
    }
    else if(name==="form-horizontal"){
      var text = '<div class="form-horizontal"></div>';
      ui = $(text); 
    }
    else if(name==="form-group-text"){
      ui = 
        $('<div class="form-group" ui="form-group-text" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-10 form-input">'+ 
                '<div class="form-control" disabled name="text">'+ 
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');  
    }
    else if(name==="form-group-input"){
      ui = 
        $('<div class="form-group" ui="form-group-input" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-sm-10 form-input">'+ 
                '<input type="text" class="form-control" placeholder="" name="">'+ 
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');  
    }
    else if(name==="form-group-textarea"){
      ui = 
        $('<div class="form-group" ui="form-group-input" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-sm-10 form-input">'+ 
                '<textarea type="textarea" class="form-control" name=""></textarea>'+ 
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');  
    }
    else if(name==="form-group-textarea-button"){
      ui = 
        $('<div class="form-group" ui="form-group-textarea-button" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-10 form-input" group="EditMode">'+
                '<textarea type="textarea" class="form-control" placeholder="" name=""></textarea>'+
              '</div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+ 
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+
              '<div class="col-xs-12 form-message"></div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-input-button"){
      ui = 
        $('<div class="form-group" ui="form-group-input-button" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-10 form-input" group="EditMode">'+
                '<input type="text" class="form-control" placeholder="" name="inputText">'+
              '</div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+ 
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+
              '<div class="col-xs-10 form-message sortable"></div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-select-input"){
      ui = 
        $('<div class="form-group" ui="form-group-select-input" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-5 form-input" group="EditMode">'+
                '<select class="form-control" name="inputSelect"></select>'+
              '</div>'+
              '<div class="col-xs-5 form-input" group="EditMode">'+
                '<input type="text" class="form-control" placeholder="" name="inputText">'+ 
              '</div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+ 
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+
              '<div class="col-xs-10 form-message sortable">'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
      
    }else if(name==="form-group-select2-input"){ 
      ui = 
        $('<div class="form-group" ui="form-group-select-input" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-5 form-input" group="EditMode">'+
                '<select class="form-control" name="inputSelectFirst"></select>'+
              '</div>'+
              '<div class="col-xs-5 form-input" group="EditMode">'+
                '<select class="form-control" name="inputSelectSecond"></select>'+
              '</div>'+
              '<div class="col-xs-10 form-input" group="EditMode">'+
                '<input type="text" class="form-control" placeholder="" name="inputText">'+ 
              '</div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+ 
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+
              '<div class="col-xs-10 form-message sortable">'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-select-input2"){
      ui = 
        $('<div class="form-group" ui="form-group-select-input2" gname="">'+
          '<div class="col-sm-2 control-label"></div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-3 form-input" group="EditMode">'+
                '<select name="inputSelect" class="form-control"></select>'+
              '</div>'+               
              '<div class="col-xs-3 form-input" group="EditMode">'+
                '<input type="text" class="form-control" name="inputTextFirst">'+
              '</div>'+
              '<div class="col-xs-4 form-input" group="EditMode">'+
                '<input type="text" class="form-control" name="inputTextSecond" placeholder="">'+
              '</div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+
              '<div class="col-xs-10 form-message sortable">'+
              '</div>'+  
            '</div>'+    
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-select"){
      ui = 
        $('<div class="form-group" ui="form-group-select" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-5 form-input">'+
                '<select class="form-control" name="inputSelect"></select>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-select2"){
      ui = 
        $('<div class="form-group" ui="form-group-select2" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-5 form-input">'+
                '<select class="form-control" name="inputSelectFirst"></select>'+
              '</div>'+
              '<div class="col-xs-5 form-input">'+
                '<select class="form-control" name="inputSelectSecond"></select>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-select3"){
      ui = 
        $('<div class="form-group" ui="form-group-select3" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-3 form-input">'+
                '<select class="form-control" name="inputSelectFirst"></select>'+
              '</div>'+
              '<div class="col-xs-3 form-input">'+
                '<select class="form-control" name="inputSelectSecond"></select>'+
              '</div>'+
              '<div class="col-xs-4 form-input">'+
                '<select class="form-control" name="inputSelectThird"></select>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
    }
    else if(name==="form-group-autocomplete-input"){
      ui = 
        $('<div class="form-group" ui="form-group-autocomplete-input" gname="">'+
          '<div class="col-sm-2 control-label">@@:</div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
              '<div class="col-xs-10 form-input" group="EditMode"></div>'+
              '<div class="col-xs-2 form-inline" group="EditMode">'+
                '<button name="addBn" class="btn btn-primary">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                '</button>'+
              '</div>'+                   
              '<div class="col-xs-10 form-message">'+  
              '</div>'+  
            '</div>'+   
          '</div>'+                     
        '</div>');        
    }
    else if(name==="form-group-date2-input"){
      ui=
        $('<div class="form-group">'+ 
          '<div class="col-sm-2 control-label">Date:</div>'+  
          '<div class="col-sm-10"> '+ 
            '<div class="row">'+ 
              '<div class="col-sm-10 form-input">'+ 
                '<div class="btn-group" style="width:100%">'+  
                  '<input type="text" class="btn form-control" name="inputFirst" style="width:45%">'+  
                  '<button type="button" class="btn form-control" style="width:10%">-</button>'+  
                  '<input type="text" class="btn form-control" name="inputSecond" style="width:45%">'+  
                '</div>'+  
              '</div>'+
              '<div class="col-sm-2 form-inline">'+
              '</div>'+                   
              '<div class="col-sm-10 form-message">'+  
              '</div>'+  
            '</div>'+  
          '</div>'+  
          '</div>');
    }
    else if(name==="form-group-date"){
      ui=
        $('<div class="form-group">'+ 
          '<div class="col-sm-2 control-label">Date:</div>'+  
          '<div class="col-sm-10"> '+ 
            '<div class="row">'+ 
              '<div class="col-xs-5 form-input">'+ 
                '<input type="text" class="form-control" name="inputText"></select>'+
                '<span class="btn fa fa-times input-clear" name="clearBn" group="EditMode"></span>'+
              '</div>'+
              '<div class="col-xs-2 form-inline">'+
              '</div>'+                   
              '<div class="col-sm-10 form-message">'+  
              '</div>'+  
            '</div>'+  
          '</div>'+  
          '</div>');
    }
    else if(name==="form-group-file-item"){
      ui= 
        $('<li class="ff-item-type-image">'+
          '<div class="ff-icon">'+
            '<img src="">'+
          '</div>'+
          '<span class="ff-menu">'+
            '<div class="top">'+ 
              '<span name="downloadBn" class="fa fa-download" group="ViewMode"></span>'+         
              '<span name="removeBn" class="btn fa fa-times-circle" group="EditMode"></span>'+
            '</div>'+
            '<div class="title">'+
            '</div>'+
          '</span>'+
        '</li>');
    }
    else if(name==="form-group-upload"){
      ui=
        $('<div class="form-group">'+ 
          '<div class="col-sm-2 control-label">Attachment:</div>'+  
          '<div class="col-sm-10"> '+ 
            '<div class="row">'+ 
              '<div class="col-xs-10 form-input" group="EditMode">'+ 
                '<div class="progress progress-striped active">'+
                  '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">'+
                    '<span class="title sr-only"></span>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="col-xs-2 form-inline fileupload-buttonbar" group="EditMode">'+                
                '<a class="btn btn-success fileinput-button" name="addBn">'+
                  '&nbsp;<i class="fa fa-plus"></i>&nbsp;<span class="title hide-sm-size">@@</span>'+
                  '<input type="file" name="files" multiple="" style="width:100%;height:100%;">'+
                '</a>'+   
              '</div>'+                   
              '<div class="col-xs-10 form-message">'+  
              '</div>'+  
            '</div>'+  
          '</div>'+  
          '</div>');
    }else if(name==="form-group-editor"){
      ui=
        $('<div class="form-group">'+ 
          '<div class="col-sm-2 control-label"></div>'+  
          '<div class="col-sm-10"> '+ 
            '<div class="row">'+ 
              '<div class="col-sm-10 form-input">'+    
              '</div>'+
              '<div class="col-sm-2 form-inline">'+
              '</div>'+                   
              '<div class="col-sm-10 form-message">'+  
              '</div>'+  
            '</div>'+  
          '</div>'+  
          '</div>'); 
    }
    else if(name==="form-group"){
      ui=
        $('<div class="form-group" ui="form-group" gname="">'+
          '<div class="col-sm-2 control-label"></div>'+
          '<div class="col-sm-10">'+
            '<div class="row">'+
            '</div>'+    
          '</div>'+
        '</div>');
    }
    else if(name==="alert-list"){
      ui=
        $('<div class="alert alert-list alert-dismissable">'+
          '<button type="button" class="close" aria-hidden="true" group="EditMode"><i class="fa fa-times"></i></button>'+
          '<strong></strong>'+
        '</div>');
    }
    else if(name==="alert-item"){
      ui=
        $('<div class="alert-item form-control">'+
          '<button type="button" class="close" aria-hidden="true" group="EditMode"><i class="fa fa-times"></i></button>'+
          '<span></span>'+
        '</div>');
    }
    else if(name==="checkbox"){
      var text = '<div class="control"><input type="checkbox">&nbsp;<span class="title"></span>&nbsp;</div>';
      ui = $(text);
    }
    else if(name==="checkbox-input"){
      var text = '<div class="control"><input type="checkbox">&nbsp;<span class="title"></span>&nbsp;&nbsp;<input type="text" class="input-bottom-border" style="width:auto;" placeholder="" maxlength="64"></div>';
      ui = $(text);
    }
    else if(name==="select"){
      var text = '<select class="form-control"></select>';
      ui = $(text);
    }
    else if(name==="radio"){
      var text = '<div class="control"><input type="radio">&nbsp;<span class="title"></span>&nbsp;</div>';
      ui = $(text);
    }
    else if(name==="radio-input"){
      var text = '<div class="control"><input type="radio">&nbsp;<span class="title"></span>&nbsp;&nbsp;<input type="text" class="input-bottom-border" style="width:auto;" placeholder="" maxlength="64"></div>';
      ui = $(text);
    }

    return ui;
  }

  // 顯示loading，用於介面要被鎖定時
  $.JSUiShowLoadingView = function(show){  
    var loader= $(".circular3d-loader");
    if(show){  
      if(loader.length===0){
        loader = $.JSUiFactory("circular3d-loader");
        $("body").append(loader);
        loader.fadeIn( 250 ,function(){}); 
      }
    }
    else{
      if(loader.length===0){
        return;
      }else{
        loader.fadeOut( 250 ,function(){loader.remove();}); 
      }
    }
  }

  // 顯示loading
  $.fn.JSUiLoadingView = function(show,callback){  
    var loader= $(this).find(".circular3d-loader");
    if(show){  
      if(loader.length===0){
        loader = $.JSUiFactory("circular3d-loader");
        $(this).append(loader);
        loader.fadeIn( 400 ,function(){callback("end");}); 
      }else{
        callback("end");
      }
    }
    else{
      if(loader.length===0){
        return;
      }else{
        loader.fadeOut( 400 ,function(){loader.remove();callback("end");}); 
      }
    }
  }

  // 新增參與人ui
  $.JSUiCreateAlertPerson=function(json){

    var div=$("<div style='float:left'>");
    var label = $("<label class='person'><span class='title'></span></label>");
    label.find(".title").html(json.member_name);

    div.append(label); 

    div.attr("member_id",json.member_id);
    div.attr("member_name",json.member_name);

    if(json.member_id){
      var input = $('<input type="hidden">');
      input.attr("name","member_id");
      input.val(json.member_id);
    }

    if(json.member_id){
      var input = $('<input type="hidden">');
      input.attr("name","member_name");
      input.val(json.member_name);
    }

    if(json.cssClass){
      label.addClass(json.cssClass);
    } 

    if(json.enableClose){
      var deletebn = $("<span class='remove-self btn glyphicon glyphicon-remove-sign'></span>");

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
    
    return div;
  }
}(window.jQuery || window.$));
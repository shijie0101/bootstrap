/*
	作者:shijie
	日期:20140308
	說明:common-library 
*/

(function($) { 
	'use strict';


	// 取得日期簡稱
	$.JSGetToday = function(){
  	var objToday = new Date();
    var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
	  var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var shortmonths = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var curMonth = shortmonths[objToday.getMonth()];
    return curMonth+" "+objToday.getDate(); 
  }

  // Jan 1,2014 14:30
	$.JSStandardDateString=function(date){
    var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  	
    var t= $.JSDateParseToJSon(date);
    var M = parseInt(t.M)-1;
    var d = parseInt(t.d);
    var y = parseInt(t.y);

    var obj = new Date();

    if( obj.getFullYear()===y&&
    	  obj.getMonth()===M&&
    	  obj.getDate()===d){
			return "Today, "+t.h+":"+t.m;
		}else{
  		return months[M]+" "+d+", "+t.y+" "+t.h+":"+t.m;
  	}
	}

  // Jan 1,2014 14:30
	$.JSStandardDateJson=function(date){
		//var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    //var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  	
    var t= $.JSDateParseToJSon(date);
    var M = parseInt(t.M)-1;
    var d = parseInt(t.d);
    var y = parseInt(t.y);
    var h = parseInt(t.h);
    var m = parseInt(t.m);

    if(h===0&&m===0){
    	t.h="18";
    }

    var obj = new Date();
    //1 未到期 0 當日 -1 過期
    var json={state:1,date:""};
    if( obj.getFullYear()===y&&
    	  obj.getMonth()===M&&
    	  obj.getDate()===d){
			json.date = "Today, "+t.h+":"+t.m;
			json.state=0;
		}else{
  		
			if(obj.getFullYear()>y){
				json.state=-1;
			}else if(obj.getFullYear()===y&&obj.getMonth()>M){
				json.state=-1;
			}else if(obj.getFullYear()===y&&obj.getMonth()===M&&obj.getDate()>d){
				json.state=-1;
			}

			json.date = (M+1)+"/"+d+", "+y+" "+t.h+":"+t.m;
			
		}
  	return json;
	}
	
	$.JSGetCurrentDay = function(){
  	var obj = new Date();

		var y = obj.getFullYear();
		var M = obj.getMonth()+1;
		var d = obj.getDate();

		var date = ""+y+"/";
		if(M<10){
			date+="0";
		}
		date+=M+"/";
		if(d<10){
			date+="0";
		}	
		date+=d;

		return date;
	}
  // 2014/06/12 14:00
  $.JSGetCurrentDate =function(){
  	var obj = new Date();

		var y = obj.getFullYear();
		var M = obj.getMonth()+1;
		var d = obj.getDate();
		var h = obj.getHours();
		var m = obj.getMinutes();

		var date = ""+y+"/";
		if(M<10){
			date+="0";
		}
		date+=M+"/";
		if(d<10){
			date+="0";
		}	
		date+=d+" ";

		if(h<10){
			date+="0";
		}
		date+=h+":";
		if(m<10){
			date+="0";
		}	
		date+=m;

		return date;
  }

	// Create UID
	$.JSUniqueID=function(){
		var number = Math.random(); // 0.9394456857981651
		number.toString(36); // '0.xtis06h6'
		return number.toString(36).substr(2, 9);
	}


	$.JSJSonParse=function(json){
		var rcJson=null;
		try{
			rcJson = JSON.parse(json);
		}catch(e){
			rcJson={result:"0",message:"JSON Parse Error<br/>@:"+e};
			console.log(json);
			rcJson={};
		}
		return rcJson;
	}

	// 2014/03/12 14:00 = > {y:2014,M:03,d:12,h:14,m:00}
	$.JSDateParseToJSon=function(date){
    var a = date.split(" ");
    var d,t;
    var rc={y:"",M:"",d:"",h:"",m:""};
    if(a.length===2){
    	d=a[0];
    	t=a[1];
    }else{
    	d=a[0];
    }

    if(d){
	    a=d.split("/");
	    if(a.length===3){
	    	rc.y=a[0];
	    	rc.M=a[1];
	    	rc.d=a[2];
	    }
  	}
    if(t){
	    a=t.split(":");
	    if(a.length===2){
	    	rc.h=a[0];
	    	rc.m=a[1];
	    }
  	}
  	return rc;
	}

	// String 2014/02/16 - > 20140216
	$.JSDateToInteger=function(date){
		var d = $.JSDateParseToJSon(date);
		return parseInt(d.y)*100000000+parseInt(d.M)*1000000+10000*parseInt(d.d)+100*parseInt(d.h)+parseInt(d.m);
	}

	// 取得 file ext from mime
	$.JSGetFileExtFromUrl = function(url){
   	var strings = url.split(".");

   	var ext="";
   	if(strings.length>0){
   		ext = strings[strings.length-1].toLowerCase();
   	}	

    return ext;
	}

	// 更名$.fn.changeElementType => $.fn.JSChangeTagName
	// 變更tag名稱
	$.fn.JSChangeTagName = function(newTag){
    var attrs = {};

    $.each(this[0].attributes, function(idx, attr) {
        attrs[attr.nodeName] = attr.nodeValue;
    });

    var newelement = $("<" + newTag + "/>", attrs).append($(this).contents());
    this.replaceWith(newelement);
    return newelement;
	}

	// 切換class
	$.fn.JSSwitchClass = function(class1,class2) {
	   
		if($(this).hasClass(class1)===true){
			$(this).removeClass(class1);
			$(this).addClass(class2);	
		}else if($(this).hasClass(class2)){
			$(this).removeClass(class2);
			$(this).addClass(class1);	
		}else{
			$(this).addClass(class1);		
		}

	};

	// jquery toggle
	$.fn.JSToggleClass = function(css) {
	  $(this).toggleClass(css);
	}

	/*
	* jQuery JSRemoveClass plugin
	* $( '#foo' ).JSRemoveClass( 'foo-* bar-*', 'foobar' )
	*/
	$.fn.JSRemoveClass = function ( removals, additions ) {
		var self = this;
		if ( removals.indexOf( '*' ) === -1 ) {
			self.removeClass( removals );
			return !additions ? self : self.addClass( additions );
		}
	 
		var patt = new RegExp( '\\s' + 
				removals.
					replace( /\*/g, '[A-Za-z0-9-_]+' ).
					split( ' ' ).
					join( '\\s|\\s' ) + 
				'\\s', 'g' ); 
		self.each( function ( i, it ) {
			var cn = ' ' + it.className + ' ';
			while ( patt.test( cn ) ) {
				cn = cn.replace( patt, ' ' );
			}
			it.className = $.trim( cn );
		});
	 
		return !additions ? self : self.addClass( additions );
	};

	 /*!
	 * jQuery Swapsie Plugin
	 * Examples and documentation at: http://biostall.com/swap-and-re-order-divs-smoothly-using-jquery-swapsie-plugin
	 * Copyright (c) 2010 Steve Marks - info@biostall.com
	 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
	 * Version: 1 (09-JULY-2010)
	 */
	var swapping=false;
  $.fn.JSSwapElement= function(options) {
		
		var defaults = {
		  target: "",
			speed: 1000,
			opacity: "1",
			callback: function() {}
		};
		var options = $.extend(defaults, options);
		
		return this.each(function() {
			
			var obj = $(this);
			
			if (options.target.length>0 && !swapping) {
				
				swapping = true;
				
				// set primary and secondary elements to relative if not already specified a positon CSS attribute
				var current_primary_pos = obj.css("position");
				var current_secondary_pos = options.target.css("position");
				if (current_primary_pos!="relative" && current_primary_pos!="absolute") {
					obj.css("position", "relative");
				}
				if (current_secondary_pos!="relative" && current_secondary_pos!="absolute") {
					options.target.css("position", "relative");
				}
				//
				
				// calculate y-axis movement
				var current_primary_position = obj.offset();
				var current_primary_top = current_primary_position.top;
				var current_secondary_position = options.target.offset();
				var current_secondary_top = current_secondary_position.top;
				var direction_primary_y = '-';
				var direction_secondary_y = '-';
				if (current_primary_top<=current_secondary_top) { // if primary above secondary 
					var direction_primary_y = '+'; 
					var total_y = current_secondary_top-current_primary_top;
				}else{ // if primary below secondary 
					var total_y = current_primary_top-current_secondary_top;
				}
				if (direction_primary_y=='-') { direction_secondary_y='+'; }else{ direction_secondary_y='-'; }
				//
				
				// calculate x-axis movement
				var current_primary_position = obj.offset();
				var current_primary_left = current_primary_position.left;
				var current_secondary_position = options.target.offset();
				var current_secondary_left = current_secondary_position.left;
				var direction_primary_x = '-';
				var direction_secondary_x = '-';
				if (current_primary_left<=current_secondary_left) { // if primary left of secondary 
					var direction_primary_x = '+'; 
					var total_x = current_secondary_left-current_primary_left;
				}else{ // if primary below secondary 
					var total_x = current_primary_left-current_secondary_left;
				}
				if (direction_primary_x=='-') { direction_secondary_x='+'; }else{ direction_secondary_x='-'; }
				//
				
				// do swapping
				obj.animate({
					opacity: options.opacity
				}, 100, function() {
					obj.animate({
						top: direction_primary_y+"="+(total_y)+"px",
						left: direction_primary_x+"="+(total_x)+"px"
					}, options.speed, function() {
						obj.animate({
							opacity: "1"
						}, 100);
					});
				});
				options.target.animate({
					opacity: options.opacity
				}, 100, function() {
					options.target.animate({
						top: direction_secondary_y+"="+(total_y)+"px",
						left: direction_secondary_x+"="+(total_x)+"px"
					}, options.speed, function() {
						options.target.animate({
							opacity: "1"
						}, 100, function() { 
							swapping = false; // call the callback and apply the scope:
  								options.callback.call(this);
							});
					});
				});
				
			}
			
		});
	}

	$.fn.JSRelativePosition = function(target){
    var $this = $(this);
    var $parent = $this.parent();
    var offset = $this.position();
    if(!target) return offset; // Didn't pass a 'top' element 
    else if($parent[0].tagName == "BODY") return offset; // Reached top of document
    else if($parent[0]==target[0]) return offset; // Reached the 'top' element we want the offset to be relative to 
    else { 
        var parent_offset = $parent.JSRelativePosition(target);
        offset.top += parent_offset.top;
        offset.left += parent_offset.left;
        return offset;
    }
  };

	
	$.fn.JSSInsertElement= function(options) {
		
		var defaults = {
		  target: "",
			speed: 1000,
			opacity: "1",
			type:"after",
			callback: function() {}
		};
		var options = $.extend(defaults, options);
		
		return this.each(function() {
			
			var obj = $(this);
			
			if (options.target.length>0 ) {
								
				// set primary and secondary elements to relative if not already specified a positon CSS attribute
				var current_primary_pos = obj.css("position");
				var current_secondary_pos = options.target.css("position");
				if (current_primary_pos!="relative" && current_primary_pos!="absolute") {
					obj.css("position", "relative");
				}
				if (current_secondary_pos!="relative" && current_secondary_pos!="absolute") {
					options.target.css("position", "relative");
				}
				//
				
				// calculate y-axis movement
				var current_primary_position = obj.offset();
				var current_primary_top = current_primary_position.top;
				var current_secondary_position = options.target.offset();
				var current_secondary_top = current_secondary_position.top;
				var direction_primary_y = '-';
				var direction_secondary_y = '-';
				if (current_primary_top<=current_secondary_top) { // if primary above secondary 
					var direction_primary_y = '+'; 
					var total_y = current_secondary_top-current_primary_top;
				}else{ // if primary below secondary 
					var total_y = current_primary_top-current_secondary_top;
				}
				if (direction_primary_y=='-') { direction_secondary_y='+'; }else{ direction_secondary_y='-'; }
				//
				
				// calculate x-axis movement
				var current_primary_position = obj.offset();
				var current_primary_left = current_primary_position.left;
				var current_secondary_position = options.target.offset();
				var current_secondary_left = current_secondary_position.left;
				var direction_primary_x = '-';
				var direction_secondary_x = '-';
				if (current_primary_left<=current_secondary_left) { // if primary left of secondary 
					var direction_primary_x = '+'; 
					var total_x = current_secondary_left-current_primary_left;
				}else{ // if primary below secondary 
					var total_x = current_primary_left-current_secondary_left;
				}
				if (direction_primary_x=='-') { direction_secondary_x='+'; }else{ direction_secondary_x='-'; }
				//
				
				// do swapping
				obj.animate({
					opacity: options.opacity
				}, 100, function() {
					obj.animate({
						top: direction_primary_y+"="+(total_y)+"px",
						left: direction_primary_x+"="+(total_x)+"px"
					}, options.speed, function() {
						
						if(options.type==="after"){
							options.target.after(obj);
							obj.css("position",current_primary_pos);
							obj.css('top', 'auto').css('left', 'auto');
						}
						else{
							options.target.before(obj);
							obj.css("position",current_primary_pos);
							obj.css('top', 'auto').css('left', 'auto');		
						}
						obj.animate({
													opacity: "1"
												}, 100,function(){options.callback.call(this);});
					});
				});
			}
			
		});
	}
}(window.jQuery || window.$));	




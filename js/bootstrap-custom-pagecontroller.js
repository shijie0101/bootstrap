/*
	作者:shijie
	日期:20140302
	說明:page controller
	*selector:"JQuery selector"
	*pages
		*count:每頁項目數量
		*start:起始index
		*total:總數量
		*maxshow:page control btn最大顯示數目	
*/


(function($) { 
	$.JSPageController = function(selector,pages,callbackF){
		

	  $.fn.SetPage = function(pageIndex){
			
			var startpage = parseInt($(this).attr("start-page"));
			var index = parseInt($(this).attr("current-index"));
	  	var pagecount = parseInt($(this).attr("page-count"));
	  	var btns = parseInt($(this).attr("max-btns"));

	  	var start=startpage;
	  	var end=start+btns;
	  	//console.log("si:"+start+"<="+pageIndex+"<"+end);
		  if(pageIndex>=start&&pageIndex<end){
		  	//console.log("or:"+start+"<="+pageIndex+"<"+end);
	  	}else{
	  		if(pageIndex<start){
	  			start=pageIndex-(btns/2);
	  			end=start+btns;
	  		}else if(pageIndex>=end){
	  			start=pageIndex+(btns/2);
	  			end=start+btns;	
	  		}

	  		if(start<0){
	  			start=0;
	  			end = start+btns;
	  		}

	  		if(end>pagecount){
	  			start=pagecount-btns;
	  			end=start+btns;
	  		}
				
				$(this).attr("start-page",start);
				
				//console.log("ui:"+start+"<="+pageIndex+"<"+end);
	  		$.each($("[index]"), function(){
	  			$(this).attr({index:start});
		  		$(this).find("span").html(++start);
		  	});	
	  	}
		  
		  $(this).attr("current-index",pageIndex);
			
		  $("[index]").removeClass("active");
		  var selector = "[index="+pageIndex+"]";
		  $(selector).addClass("active");
	  };


	  var count = pages.count;
	  var start = pages.start;
	  var total = pages.total;
		var maxshow = (pages.maxshow)?pages.maxshow:8;

	  var nums = parseInt(total/count);
	  if((total%count)>0){
	  	nums+=1;
	  }

		var currentIndex = parseInt(start/count);

	  var maxbtns=(nums>maxshow)?maxshow:nums;

	  $(selector).html("");
	  $(selector).attr("current-index",0);
	  $(selector).attr("start-page",0);
	  $(selector).attr("max-btns",maxbtns);
	  $(selector).attr("page-count",nums);


	  var lis="";
	  var first = $.sprintf("<li class='to-first'><span>&laquo;</span></li>");  
	  var last  = $.sprintf("<li class='to-last'><span>&raquo;</span></li>"); 
	  var prev  = $.sprintf("<li class='to-prev'><span>&lsaquo;</span></li>");  
	  var next  = $.sprintf("<li class='to-next'><span>&rsaquo;</span></li>");  

	  for(var i = 0 ; i < maxbtns ;i++){
	    lis += $.sprintf("<li><span></span></li>");
	  }

	  $(selector).append(first+prev+lis+next+last);

	  $.each($(selector).find("li"), function() {

	  	$(this).hover(function(){
	  		$(this).css({cursor:"pointer"});
	  	});

	    if($(this).hasClass("to-first")==true){
	    		$(this).click(function(){
				  	var index=0;
				  	$(this).parent().SetPage(index);
				  	if(callbackF!=null){
				  		callbackF({state:"click",index:index,start:parseInt(index)*count,count:count});
				  	}
			  });
	    }else if($(this).hasClass("to-last")==true){
			  $(this).click(function(){
			  
			  	var index = nums-1;
			  	if(nums>=0){
				  	$(this).parent().SetPage(parseInt(index));
				  	if(callbackF!=null){
				  		callbackF({state:"click",index:index,start:parseInt(index)*count,count:count});
				  	}
			  	}
			  });
	    }else if($(this).hasClass("to-prev")==true){
	    	$(this).click(function(){
		    	var index = parseInt($(this).parent().attr("current-index"))-1;
		   
		    	if(index>=0){
					  	$(this).parent().SetPage(index);
					  	if(callbackF!=null){
					  		callbackF({state:"click",index:index,start:parseInt(index)*count,count:count});
					  	}
		    	}
		    });
	    }else if($(this).hasClass("to-next")==true){
	    	$(this).click(function(){
		    	var index = parseInt($(this).parent().attr("current-index"))+1;
		    
		    	if(index<nums){
					  	$(this).parent().SetPage(index);
					  	if(callbackF!=null){
					  		callbackF({state:"click",index:index,start:parseInt(index)*count,count:count});
					  	}
		    	}
	    	});
	    }else{
	    	$(this).attr({index:0});  		   	 	
			  $(this).click(function(){
			  	var index = $(this).attr("index");
			  	$(this).parent().SetPage(parseInt(index));
			  	if(callbackF!=null){
			  		callbackF({state:"click",index:parseInt(index),start:parseInt(index)*count,count:count});
			  	}
			  });
	    }  
	  });

		if(nums<=1){
			$(selector).find("li").addClass("disabled");
		}

		var pageText=0;
		$.each($("[index]"), function(){
			$(this).attr({index:pageText});
			$(this).find("span").html(++pageText);
		});	

		$(selector).addClass("pagination");
		$(selector).SetPage(currentIndex);
	}
}(window.jQuery || window.$));
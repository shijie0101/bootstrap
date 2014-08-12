/*
	作者:shijie
	日期:20140302
	說明:menu controller

	--menus sample--
	items:[
		{
			title:"Tests",
			links:[
				{
					title:"",
					link:""
				}
			]
		},...
*/

(function($) { 
	'use strict';

	$.JSMenuController = function(name,menus,callbackF){

		$(name).html("");
		$(name).addClass("cbp-menu");

		for(var i=0;i<menus.items.length;i++){
			
			var item=menus.items[i];
			var itemId="menu_"+i;


			var textLinks=$.sprintf("<div id='%s' class='%s'></div>",itemId,"collapse panel-collapse");
			var text=$.sprintf("<div class='%s' data-toggle='collapse' data-parent='' href='#%s'>%s</div>","cbp-menu-item",itemId,item.title);
			$(name).append(text);
			$(name).append(textLinks);

			var links=$(name).find("#"+itemId);
			
			for(var j=0;j<item.links.length;j++){
				var subitem=item.links[j];
				var link = subitem.link;
				var title =subitem.title;
				var method=(subitem.method)?subitem.method:"direct";
				//console.log(title+":"+method);
				var ui = $("<div class='cbp-menu-subitem'>");
				ui.attr("link",link);
				ui.attr("method",method);
				ui.html(title);

				links.append(ui);
			}

			links.children().click(function(){
				var title = $(this).text();
				var link = $(this).attr("link");
				var method = $(this).attr("method");
				if(callbackF!==undefined&&callbackF!==null){
					callbackF({title:title,link:link,method:method});
				}

			});

		}
	}
}(window.jQuery || window.$));
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!--
Designed by shijie
Date:20140307
Forum Source Code
-->
<html>
<head>
<title>Bootstrap Sample Code</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"
	charset="utf-8">
<!-- Bootstrap CSS-->
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-theme.min.css" rel="stylesheet">
<link href="css/custom.bootstrap.css" rel="stylesheet">

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery/jquery.min.js"></script>
<script src="js/jquery/jquery-ui.min.js"></script>
<script src="js/jquery/jquery-sprintf.js"></script>

<!-- for debug message -->
<script src="js/debug.js"></script>

<!-- Bootstrap -->
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-custom-pagecontroller.js"></script>

<!-- Sticky Table-->
<link href="css/custom.table.css" rel="stylesheet">
<script src="js/jquery/jquery-throttle.js"></script>
<script src="js/jquery/jquery-custom-table.js"></script>
<script>

	var mJsonContent;
	var mJsonResult;

	// iframe callback
	window.iFrameCallbackF = function(data){
		if(data.dataTarget!=undefined){
			if(data.action==="Uploaded"){
				$.(data.dataTarget).append($.sprintf("<input type='hidden' name='images' value='%d'>",data.index));
			}
		}
	}

	function getListForum(url, postdata, callbackFunction) {
		Debug.i("Api:" + url);

		var jqxhr = $.post("listForum", postdata).done(function(data) {
			mJsonResult = JSON.parse(data);
			callbackFunction(mJsonResult);
		}).fail(function() {
			Debug.i("error");
		}).always(function() {
			Debug.i("finished");
		});
	}

	function createPageControl(json) {
		//Create page controller
		var pages = {
			start : json.start,
			count : json.count,
			total : json.total,
			maxshow : 8
		};
		$.PageController("#pageController", pages, PageControllerCallback);
	}

	function createTable(json) {

		$("#listView").html("");
		$("#tableView").find("tbody").html("");

		if (json.result != 1) {
			$("#main").find("#listView").html(
					"<h3>" + json.description + "</h3>");
			return null;
		}

		var lists = json.lists;
		console.log("type:" + json.type);
		console.log("description:" + json.description);
		console.log("tables number:" + lists.length);

		var text = "";

		for (var i = 0; i < lists.length; i++) {
			var list = lists[i];
			var title = list.title;
			var id = list.id;
			var publisher = list.publisher;
			var icon = list.icon;
			var link = list.link;
			var publishdate = list.publishdate;
			var category = list.category;
			var readonly = (list.readonly == 1) ? "readonly" : "";
			var rows = "";

			var personCell = $
					.sprintf(
							"<td><div><img class='person-icon img-circle' src='%s'><small>%s</small></div></td>",
							icon, publisher);
			var contentCell = $.sprintf("<td>%s</td>", title);

			var dateCell = $.sprintf("<td class='talign-right'>%s</td>",
					publishdate);

			var categoryCell = $.sprintf(
					"<td><span class='badge'>%s</span></td>", category);

			text = $.sprintf("<tr gid='%d' link='%s' %s>%s%s%s%s</tr>", id,
					link, readonly, personCell, categoryCell, contentCell,
					dateCell);

			$("#tableView").find("tbody").append(text);

			$.StickyTable("#tableView");

		}

		$("table td").click(function() {
			console.log("td click");
			//getJSon;
			var tr = $(this).parent();
			var v = $(this).closest("table").attr("edited");

			if (v == "true") {
				var checkbox = tr.find("input[type=checkbox]");
				if (checkbox != undefined) {
					checkbox.prop({
						checked : !checkbox.prop("checked")
					});
				}
			} else {
				var fid = tr.attr("gid");
				$.post("getForum", {
					id : fid,
				}).done(function(data) {
					setSecondary(JSON.parse(data));
					showSecondary(true);
				}).fail(function() {
					debugMessage("error");
				}).always(function() {
					
					debugMessage("finished");
				});

			}
		});
	}

	function InitialTable(json) {
		createTable(json);
		createPageControl(json);
	}

	function RefreshTable(json) {
		createTable(json);
	}

	function PageControllerCallback(data) {
		var text = $.sprintf("%s:%d start:%d count:%d", data.state, data.index,
				data.start, data.count);
		console.log(text);
		var jsonUrl = "/bootstrap/json/table.txt";

		getListForum(jsonUrl, {
			start : data.start,
			count : data.count,
			category : 0
		}, RefreshTable);

	}

	function setSecondary(json) {

		$("#secondary").find("#title").html(json.title);

		var text = $.sprintf("<p>%s</p>", json.content);
		$("#secondary").find("#content").html(text);

		var images = json.images;

		var carIndicator = $("#imageCarousel").find(".carousel-indicators");
		var carInner = $("#imageCarousel").find(".carousel-inner");
		carIndicator.html("");
		carInner.html("");
		for (var i = 0; i < images.length; i++) {
			var image = images[i];

			var text = $.sprintf(
					"<li data-target='%s' data-slide-to='%d'></li>",
					"#imageCarousel", i);
			carIndicator.append(text);

			text = $
					.sprintf(
							"<div class='item'><img src='%s' style='height:%s;margin:auto;padding-bottom:5px;'><div class='carousel-caption'><h4>%s</h4><p>%s</p></div></div>",
							image.src, "99%", image.title, image.content);

			carInner.append(text);
		}
		$("#imageCarousel li:first-child").addClass("active");
		$("#imageCarousel .item:first-child").addClass("active");
		$("#imageCarousel").carousel();
	}

	function showSecondary(show) {
		var view = $("#secondary");
		var right = view.css('right');

		if (right === "0px") {
			console.log("TopRightView: 0 to " + right);
			view.animate({
				right : "-100%"
			}, 400);
		} else {
			console.log("TopRightView:" + right + " to " + "0");
			view.animate({
				right : 0
			}, 400);
		}
	}

	function showAdvancedSetting(show) {
		if (show == true) {
			$("#AdvancedSettings").show();
		} else {
			$("#AdvancedSettings").hide();
		}
	}

	function changeMode(mode) {
		if (mode === "ReviewMode") {
			$(".sel").hide();
			$("#EditGroup").hide();
			$("#EditBn").show();
		} else if (mode === "EditMode") {
			$(".sel").show();
			$("#EditGroup").show();
			$("#EditBn").hide();
		} else if (mode === "SearchMode") {
			$("#EditGroup").hide();
			$("#EditBn").hide();
		}
	}

	function initial() {
		onResize();

		$("#EditBn").click(
				function(event) {
					event.preventDefault();
					$("table").attr("edited", true);
					$("tbody tr").not("[readonly]").prepend(
							"<th><input type=checkbox></input></th>");
					$("tbody").find("[readonly]").prepend("<th></th>");
					changeMode("EditMode");
				});

		$("#DoneBn").click(function(event) {
			event.preventDefault();
			$("table").removeAttr("edited");
			$("table tbody tr th").remove();
			changeMode("ReviewMode");
		});

		$("#SearchBn").click(
				function(event) {
					event.preventDefault();

					console.log("SearchBn click");

					if ($("#SearchInput").val().toLowerCase() === "UReach"
							.toLowerCase()) {
						$("#ResultText").html("Result:");
						createTable(JsonResult);
					} else {
						$("#ResultText").html("No Results!");
						$("#table").html("");
					}
				});

		$("#AllBn").click(function(event) {
			event.preventDefault();
			$("#ContentView").find("input[type=checkbox]").prop({
				checked : true
			});
		});

		$("#NoneAllBn").click(function(event) {
			event.preventDefault();
			$("#ContentView").find("input[type=checkbox]").prop({
				checked : false
			});
		});

		$("#AdvancedBn").click(function(event) {
			event.preventDefault();
			showAdvancedSetting(true);
		});

		$("#BackBn").click(function(event) {
			event.preventDefault();
			showSecondary(false);
		});

		$(".close").click(function(event) {
			event.preventDefault();
			showAdvancedSetting(false);
		});

		$("#SearchInput").keypress(function(event) {
			console.log("Keypress:" + event.keyCode);
			if (event.keyCode == 13) {
				event.preventDefault();
				$("#SearchBn").click();
			}
		});

		$("#NewArticle").click(function(event) {

			event.preventDefault();

			var inputTitle = $("#inputTitle").val();
			var inputContent = $("#inputContent").val();

			if (inputTitle === "" || inputContent === "") {
				debugMessage("input:empty");
				return;
			}

			var btn = $(this);
			btn.button('submitting');

			var data = new FormData();
			data.append("title", inputTitle);
			data.append("content", inputContent);
			data.append("file", $("#inputFile").val());
			data.append("category", $("#inputCategory").val());

			$('iFrameDataRev').find('input[name=images]').each(function() {
				console.log($(this).val());
				data.append("images", $(this).val());
			});

			$.ajax({
			    url: 'addForum',
			    data: data,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			        
			    }
			}).done(function() {
				btn.button('reset');
				$('iFrameDataRev').html("");
			});
		});

		//設定進階搜尋分類全選
		$("#AdvancedSettings").find("input[type=checkbox]").prop({
			checked : true
		});

		//changeMode("SearchMode");
		showAdvancedSetting(false);

		//測試字串文字
		//getJsonFormat(showMessage); 
		var jsonUrl = "/bootstrap/json/table.txt";

		getListForum(jsonUrl, {
			start : 0,
			count : 10,
			category : 0
		}, InitialTable);

		changeMode("ReviewMode");
	}

	$(window).load(function() {
		initial();
	});

	$(document).ready(function() {
		//console.log("to_do_list_sample ready");
	});

	$(window).resize(function() {
		onResize();
	});

	function onResize() {
		var windows = {
			w : $(this).width(),
			h : $(this).height()
		};
	}
</script>

</head>
<body style="overflow: hidden">
	<div id="main" class="page-top-left"
		style="width: 100%; height: 100%; overflow-y: auto;">
		<div class="container-fluid">
			<div id="menu">
				<div class="row-fluid well">
					<div class="col-xs-6">
						<div class="form-inline">
							<div class="pull-left form-group">
								<button id="EditBn" type="button" class="btn btn-default">Edit</button>
								<div id="EditGroup" class="form-group">
									<button id="DoneBn" type="button" class="btn btn-default">Done</button>
									<button id="AllBn" type="button" class="btn btn-default">All</button>
									<button id="NoneAllBn" type="button" class="btn btn-default">None</button>
									<button id="DeleteBn" type="button" class="btn btn-default">Delete</button>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-6">
						<div class="form-inline">
							<div class="form-group pull-right">
								<input id="SearchInput" type="text" class="form-control"
									placeholder="Search">
								<button id="SearchBn" type="button" class="btn btn-default">Search</button>
								<button id="AdvancedBn" type="button" class="btn btn-default">Advanced</button>
							</div>
						</div>
					</div>

					<div id="AdvancedSettings" class="col-xs-12">
						<h3>
							Advanced Settings<span class="glyphicon glyphicon-remove close"></span>
						</h3>
						<div>
							<label class="checkbox-inline"> <input type="checkbox"
								id="inlineCheckbox1">Name
							</label> <label class="checkbox-inline"> <input type="checkbox"
								id="inlineCheckbox2">Keywords
							</label> <label class="checkbox-inline">Category: <select>
									<s:iterator status="stat" value="category">
										<option value="<s:property value="id" />"><s:property
												value="value" /></option>
									</s:iterator>
							</select>
							</label> <label class="checkbox-inline">Show <select>
									<option>25</option>
									<option>50</option>
									<option>100</option>
							</select> results.
							</label>
						</div>
					</div>
					<!--END AdvancedSettings-->

				</div>
			</div>
			<div id="ContentView">
				<div class="row-fluid" id="tableView">
					<div class="inner">
						<table>
							<thead></thead>
							<tbody></tbody>
						</table>
					</div>
					<div class="inner">
						<div class="pagination pull-left">
							<button class="btn btn-primary" data-toggle="modal"
								data-target="#dialogModal">發表文章</button>
						</div>
						<ul id="pageController" class="pagination pull-right">
							<li class="disabled"><span>&laquo;</span></li>
							<li class="disabled"><span>&lsaquo;</span></li>
							<li class="disabled"><span>&rsaquo;</span></li>
							<li class="disabled"><span>&raquo;</span></li>
						</ul>
					</div>
				</div>
				<div class="modal fade" id="dialogModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h3 class="modal-title" id="myModalLabel">發表文章</h3>
							</div>
							<form action="addForum">
								<div class="modal-body">
									<div class="form-group">
										<label for="inputTitle">Title</label> <input type="text"
											class="form-control" id="inputTitle" placeholder="Title"
											value="this is a sample">
									</div>
									<div class="form-group">
										<label for="inputContent">Content</label>
										<textarea id="inputContent" class="form-control" rows="5">Content</textarea>
									</div>
									<div class="form-group" style="overflow: hidden">
										<label for="inputFile">File input</label> 
										<div id="iFrameDataRev" style="display:none">
										<!--<input type="hidden"
												name="images" id="I1" size="20" value="-1" /> <input
												type="hidden" name="images" id="I2" size="20" value="-1" />
											<input type="hidden" name="images" id="I3" size="20"
												value="-1" /> <input type="hidden" name="images" id="I4"
												size="20" value="-1" /> -->
										</div>
										<iframe data-target="#iFrameDataRev" src="UploadForm" class="form-control" rows="5"
											style="height:50%">
										</iframe>
									</div>
									<div class="form-group">
										<label for="inputCategory">Category</label>
										<div>
											<select id="inputCategory">
												<s:iterator status="stat" value="category">
													<option value="<s:property value="id" />"><s:property
															value="value" /></option>
												</s:iterator>
											</select>
										</div>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default"
										data-dismiss="modal">Cancel</button>
									<input id="NewArticle" type="submit" class="btn btn-primary"
										value="Submit" onclick="location.reload();" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="secondary" class="page-top-right"
		style="width: 100%; height: 100%; right: -100%; background: #fff; overflow-y: auto; display: block; z-index: 3;">
		<div class="container-fluid">
			<div class="row-fluid well">
				<div class="col-xs-6">
					<form class="form-inline">
						<div class="pull-left form-group">
							<button id="BackBn" type="button" class="btn btn-default">
								<span class="glyphicon glyphicon-chevron-left"></span>Back
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="inner">
					<h3 id="title" class="page-header">Secondary Page</h3>
					<div id="content">
						<p>About</p>
					</div>
					<div id="imageCarousel" class="carousel slide"
						style="background: #222; height: 75%">
						<ol class="carousel-indicators">
							<li data-target="#imageCarousel" data-slide-to="0" class="active"></li>
							<li data-target="#imageCarousel" data-slide-to="1"></li>
							<li data-target="#imageCarousel" data-slide-to="2"></li>
						</ol>
						<div class="carousel-inner">
							<div class="item active">
								<img src=""
									style="height: 99%; margin: auto; padding-bottom: 5px">
								<div class="carousel-caption">
									<h4>First label</h4>
									<p>A working Bootstrap carousel example.</p>
								</div>
							</div>
							<div class="item">
								<img src=""
									style="height: 99%; margin: auto; padding-bottom: 5px">
								<div class="carousel-caption">
									<h4>Second label</h4>
									<p>This is the second slide text.</p>
								</div>
							</div>
							<div class="item">
								<img src=""
									style="height: 99%; margin: auto; padding-bottom: 5px">
								<div class="carousel-caption">
									<h4>Third label</h4>
									<p>Take note of the 'active' and 'slide' classes.</p>
								</div>
							</div>
						</div>
						<!-- Controls -->
						<a class="left carousel-control" href="#imageCarousel"
							data-slide="prev"> <span
							class="glyphicon glyphicon-chevron-left"></span>
						</a> <a class="right carousel-control" href="#imageCarousel"
							data-slide="next"> <span
							class="glyphicon glyphicon-chevron-right"></span>
						</a>
					</div>
				</div>
			</div>
		</div>
		<!--END container-fluid-->
	</div>
	<!--END secondary-->
</body>
</html>
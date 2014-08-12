<html>
<head>
<title>Bootstrap Sample Code</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"
	charset="utf-8">
<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<link href="css/custom.bootstrap.css" rel="stylesheet">

<link href="css/upload/fileupload.css" rel="stylesheet">
<link href="css/upload/fileupload-ui.css" rel="stylesheet">

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery/jquery.min.js"></script>
<script src="js/jquery/jquery-ui.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery/jquery-sprintf.js"></script>
<!-- for debug message -->
<script src="js/debug.js"></script>


<!-- Sticky Table-->
<link href="css/custom.table.css" rel="stylesheet">

<script src="js/jquery/jquery-throttle.js"></script>
<script src="js/jquery/jquery-custom-table.js"></script>


<script>
	function initial() {
		onResize();
		$.StickyTable('table');
	}

	$(window).load(function() {
		initial();
	});

	$(window).resize(function() {
		onResize();
	});

	function onResize() {
	}

	function UploadedCallbackF(file) {
		var iCallbackF = window.parent.iFrameCallbackF;

		if(iCallbackF!=undefined){
			var dataTarget = window.parent.$("iframe[data-target]").attr("data-target");
			iCallbackF({action:"Uploaded",target:dataTarget,data:file});
		}
		/*
		var
		i1 = parent.document.getElementById("I1").value;
		var
		i2 = parent.document.getElementById("I2").value;
		var
		i3 = parent.document.getElementById("I3").value;
		var
		i4 = parent.document.getElementById("I4").value;
		if (i1 == -1) {
			parent.document.getElementById("I1").value = index;
		} else if (i2 == -1) {
			parent.document.getElementById("I2").value = index;
		} else if (i3 == -1) {
			parent.document.getElementById("I3").value = index;
		} else if (i4 == -1) {
			parent.document.getElementById("I4").value = index;
		}*/
	}
		
	function DeletedCallbackF(index) {
		//alert(index);
		var
		i1 = parent.document.getElementById("I1").value;
		var
		i2 = parent.document.getElementById("I2").value;
		var
		i3 = parent.document.getElementById("I3").value;
		var
		i4 = parent.document.getElementById("I4").value;
		if (i1 == index) {
			parent.document.getElementById("I1").value = -1;
		} else if (i2 == index) {
			parent.document.getElementById("I2").value = -1;
		} else if (i3 == index) {
			parent.document.getElementById("I3").value = -1;
		} else if (i4 == index) {
			parent.document.getElementById("I4").value = -1;
		}
	}

</script>


</head>
<body>
	<div class="container">
		<!-- The file upload form used as target for the file upload widget -->
		<form id="fileupload" action="apifileupload" method="POST"
			enctype="multipart/form-data">
			<!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
			<div class="row fileupload-buttonbar">
				<div class="col-lg-7">
					<!-- The fileinput-button span is used to style the file input field as button -->
					<span class="btn btn-success fileinput-button"> <i
						class="glyphicon glyphicon-plus"></i> <span>Add files...</span> <input
						type="file" name="uploadFile" multiple>
					</span>
					<button type="submit" class="btn btn-primary start">
						<i class="glyphicon glyphicon-upload"></i> <span>Start
							upload</span>
					</button>
					<button type="reset" class="btn btn-warning cancel">
						<i class="glyphicon glyphicon-ban-circle"></i> <span>Cancel
							upload</span>
					</button>
					<button type="button" class="btn btn-danger delete">
						<i class="glyphicon glyphicon-trash"></i> <span>Delete</span>
					</button>
				</div>
			</div>
			<!-- The table listing the files available for upload/download -->
			<table role="presentation" class="table table-striped">
				<tbody class="files"></tbody>
			</table>

		</form>
	</div>

	<!-- The template to display files available for upload -->
	<script id="template-upload" type="text/x-tmpl">
    {% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
    <td class="preview"><span class="fade"></span></td>
    <td class="name"><span>{%=file.name%}</span></td>
    <td class="size"><span>{%=o.formatFileSize(file.size)%}</span></td>
    {% if (file.error) { %}
    <td class="error" colspan="2"><span class="label label-important">{%=locale.fileupload.error%}</span> {%=locale.fileupload.errors[file.error] || file.error%}</td>
    {% } else if (o.files.valid && !i) { %}
    <td>
    <div style="width:80px;height:34px" class="progress progress-success progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="bar" style="width:0%;"></div></div>
    </td>
    <td class="start">{% if (!o.options.autoUpload) { %}
    <button class="btn btn-primary">
    <i class="icon-upload icon-white"></i>
    <span>{%=locale.fileupload.start%}</span>
    </button>
    {% } %}</td>
    {% } else { %}
    <td colspan="2"></td>
    {% } %}
    <td class="cancel">{% if (!i) { %}
    <button class="btn btn-warning">
    <i class="icon-ban-circle icon-white"></i>
    <span>{%=locale.fileupload.cancel%}</span>
    </button>
    {% } %}</td>
    </tr>

    {% } %}
  </script>

	<!-- The template to display files available for download -->
	<script id="template-download" type="text/x-tmpl">
      {% for (var i=0, file; file=o.files[i]; i++) { %}
      <tr class="template-download fade">
      {% if (file.error) { %}
      <td></td>
      <td class="name"><span>{%=file.name%}</span></td>
      <td class="size"><span>{%=o.formatFileSize(file.size)%}</span></td>
      <td class="error" colspan="2"><span class="label label-important">{%=locale.fileupload.error%}</span> {%=locale.fileupload.errors[file.error] || file.error%}</td>
      {% } else { CallbackUploaded(file); %}
      <td class="preview">{% if (file.thumbnail_url) { %}
      <a href="{%=file.url%}" title="{%=file.name%}" rel="gallery" download="{%=file.name%}"><img src="{%=file.thumbnail_url%}"></a>
      {% } %}</td>
      <td class="name">
      <a href="{%=file.url%}" title="{%=file.name%}" rel="{%=file.thumbnail_url&&'gallery'%}" download="{%=file.name%}">{%=file.name%}</a>
      </td>
      <td class="size"><span>{%=o.formatFileSize(file.size)%}</span></td>
      <td colspan="2"></td>
      {% } %}
      <td class="delete">
      <button class="btn btn-danger" data-type="{%=file.delete_type%}" data-url="{%=file.delete_url%}">
      <i class="icon-trash icon-white"></i>
      <span>{%=locale.fileupload.destroy%}</span>
      </button>
      <input type="checkbox" name="delete" value="1">
      </td>
      </tr>
      {% } %}
  </script>

	<script src="js/upload/vendor/jquery.ui.widget.js"></script>
	<!-- The Templates plugin is included to render the upload/download listings -->
	<script src="js/upload/tmpl.min.js"></script>
	<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
	<script src="js/upload/load-image.min.js"></script>
	<!-- The Canvas to Blob plugin is included for image resizing functionality -->
	<script src="js/upload/canvas-to-blob.min.js"></script>
	<!-- Bootstrap JS and Bootstrap Image Gallery are not required, but included for the demo -->
	<script src="js/upload/bootstrap-image-gallery.min.js"></script>
	<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
	<script src="js/upload/jquery.iframe-transport.js"></script>
	<!-- The basic File Upload plugin -->
	<script src="js/upload/jquery.fileupload.js"></script>
	<!-- The File Upload file processing plugin -->
	<script src="js/upload/jquery.fileupload-fp.js"></script>
	<!-- The File Upload user interface plugin -->
	<script src="js/upload/jquery.fileupload-ui.js"></script>
	<!-- The localization script -->
	<script src="js/upload/locale.js"></script>
	<!-- The main application script -->
	<script src="js/upload/main.js"></script>
	<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE8+ -->
	<!--[if gte IE 8]><script src="js/cors/jquery.xdr-transport.js"></script><![endif]-->
</body>
</html>
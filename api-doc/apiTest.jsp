<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="js/jquery/jquery.min.js"></script>
<script src="js/jquery/jquery-ui.min.js"></script>
<script src="js/jquery/jquery-sprintf.js"></script>

<script>
	function upload(){
		var data = new FormData();
		var ii = 0;
		jQuery.each($('input[type=file]'), function() {
			jQuery.each($(this)[0].files, function(i, file) {
		    	data.append('uploadFile', file);  
			});
		});
		
    	data.append('title', $('[name=title]').val());
    	data.append('content', $('[name=content]').val());
    	data.append('category', $('[name=category]').val());

		$.ajax({
		    url: 'addForum',
		    data: data,
		    cache: false,
		    contentType: false,
		    processData: false,
		    type: 'POST',
		    success: function(data){
		        alert(data);
		    }
		});
		
	}
</script>
<title>Insert title here</title>
</head>
<body>
	<form action="getForum" name="getForum">
		ID:<input name="id" type="text" value="3" />&nbsp;<input
			name="submit" type="submit" value="submit" />
	</form>
	<p />
	<form action="addForum" name="addForum" method="POST"
		enctype="multipart/form-data">
		ID:<input name="title" type="text" value="title" /><br /> Content:<input
			name="content" type="text" value="content" /><br /> Category:<input
			name="category" type="text" value="1" /><br /> <input
			class="btn btn-default form-control" type="file" name="uploadFile" />
		<br /> <input class="btn btn-default form-control" type="file"
			name="uploadFile" /><br /> <input
			class="btn btn-default form-control" type="file" name="uploadFile" /><br />
		<input name="submit" type="submit" value="submit" />
	</form>
	<input name="submit" type="button" value="jquery post file" onclick="upload();" />
</body>
</html>
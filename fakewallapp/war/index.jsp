<%@ page language="java" contentType="text/html"%>
<%

String token = null;
if(session.getAttribute("access_token")==null){
	token=request.getParameter("access_token");	
	if(token==null){
		response.sendRedirect("https://www.facebook.com/dialog/oauth?client_id=272534742866210&scope=publish_stream&redirect_uri=https://fakewallapp.appspot.com/landing.html&response_type=token");
		return;
	}
	session.setAttribute("access_token", token);
	//this is to remove the ugly auth params in the URL.
	response.sendRedirect("/");
} 

%>
<!doctype html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Fake Wall App</title>
<script src="resources/jquery-1.7.1.min.js"></script>

<script src="resources/jquery-ui.min.js"></script>
<script src="resources/jquery.autosize-min.js"></script>
<script src="resources/commentTemplate.js"></script>
<script src="resources/html2canvas.min.js"></script>
<script src="resources/jquery.plugin.html2canvas.js"></script>

<script src="resources/core.js"></script>


<link rel="stylesheet" href="resources/style.css" />
<link href="resources/jquery-ui.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript">
var access_token='<%=session.getAttribute("access_token")%>';
</script>
</head>

<body>

<img alt="" src="resources/beta_test.jpg" class="beta">
	<!-- <input type="button" value="show dialog" id="but" /> -->
	<div>
	<p> The rules are simple, Click on any item to change it. Once done, click on the <b>Next</b> button.
	</p>
	</div>
	<button id="add-comment">Add Comment</button>
	<button id="generate_canvas">Take me to the Next Step</button>
	<button id="post" style="display:none">Post</button>
	
	<p>&nbsp;</p>

	<div class="wrapper" id="wrapper">
		<div class="post_user">
			<div>
				<img class="dp" src="resources/dp.jpg" onclick="imageClicked(event)" />
			</div>
			<div class="post-user">
				<span class="name-user" onclick="spanDoubleClicked(event)">User</span> <br /> <span class="timestamp"
					onclick="spanDoubleClicked(event)">1 hours ago</span>
			</div>
		</div>
		<div class="post-content">
			<span onclick="spanDoubleClicked(event)">Post</span>
		</div>
		<div class="likebanner link">Like · Comment · Share</div>
		<div class="likes">
			<i class="like-icon"></i> <span class="link" onclick="spanDoubleClicked(event)">You, Me and Several others</span>
			<span onclick="spanDoubleClicked(event)"> like this.</span>
		</div>
		<div class="response" id="response">
			
		</div>
	</div>

	
	<div id="comment_dialog" style="display: none;" title="Fake Wall App">

		<label for="enter_comment">Comment</label>
		<textarea name="enter_comment" id="enter_comment" class="text ui-widget-content ui-corner-all animated"
			style="width: 80%" rows="1"></textarea>

	</div>

	<div id="dp_dialog" style="display: none;" title="Fake Wall App">
		<div id="tabs">
			<ul>
				<li><a href="#fb-friends">Facebook Friends</a></li>
				<li><a href="#url-tab">URL</a></li>
			</ul>
			<div id="fb-friends">
				<label for="tags">Friend: </label> <input type="text" id="friend" style="width: 80%" />
			</div>
			<div id="url-tab">
				<label for="dp_url">URL</label> <input type="text" name="dp_url" id="dp_url"
					class="text ui-widget-content ui-corner-all" style="width: 80%" />
			</div>

		</div>
	</div>

	<div id="alert" title="Message!">
		<span id="alert-text">Alert</span>
	</div>
	<!-- <input type="text" id="code" size="100" style="position:absolute;top:800;left:100"/> -->
</body>
</html>
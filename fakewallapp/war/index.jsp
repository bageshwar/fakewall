<%@ page language="java" contentType="text/html"%>
<%
	String token = null;

	if (!request.getRemoteHost().equals("127.0.0.1")) {

		if (session.getAttribute("access_token") == null) {
			token = request.getParameter("access_token");
			String expiresIn = request.getParameter("expires_in");
			long millis = System.currentTimeMillis() + (Long.parseLong(expiresIn) * 1000);

			if (token == null) {
				response.sendRedirect("https://www.facebook.com/dialog/oauth?client_id=272534742866210&scope=publish_stream,user_photos&redirect_uri=https://fakewallapp.appspot.com/landing.html&response_type=token");
				return;
			}

			session.setAttribute("access_token", token);
			session.setAttribute("expires_in", millis);
			//this is to remove the ugly auth params in the URL.
			response.sendRedirect("/");

		} else {
			//session has a token,check its expiry and get a new one if needed.
			if ((Long) (session.getAttribute("expires_in")) < System.currentTimeMillis()) {
				response.sendRedirect("https://www.facebook.com/dialog/oauth?client_id=272534742866210&scope=publish_stream,user_photos&redirect_uri=https://fakewallapp.appspot.com/landing.html&response_type=token");
			}else {
				//token is still valid, do nothing.
				
			}
		}
	} else {
		session.setAttribute( "access_token",
				"");
	}
%>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
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

<!-- <img alt="" src="resources/beta_test.jpg" class="beta" /> -->

	<div id="masthead">
		<span id="appheader"><b><a href="/">Fake Wall App</a></b></span> <a href="https://www.facebook.com/"><span
			id="user"></span><img id="user-dp" /></a>
	</div>
	<div class="main">
		
		<div class="content" >
		<div class="top-buttons" >
			<button id="add-comment" title="Click to add a New Comment" >Add Comment</button>
			<button id="generate_canvas" title="Click to Preview the Fake Wall" >Take me to the Next Step</button>
		</div>
		
		<div class="wrapper" id="wrapper">
		<img src="resources/beta.png" style="float:right" />
		<div class="post_user">
			<div>
				<img class="main-dp dp clickable" src="resources/dp.jpg" onclick="imageClicked(event)" title="Click to add a Friend" />
			</div>
			<div class="post-user">
				<span class="name-user clickable" onclick="spanDoubleClicked(event)" title="Click to add a Friend">User</span> <br />
				 <span class="timestamp clickable"
					onclick="spanDoubleClicked(event)" title="Click to edit Time">3 hours ago</span>
			</div>
		</div>
		<div class="post-content">
			<span onclick="spanDoubleClicked(event)" class="clickable" title="Click to edit the Post">Post</span>
		</div>
		<div class="likebanner link">Like &middot; Comment &middot; Share</div>
		<div class="likes">
			<i class="like-icon"></i> <span class="link clickable" onclick="spanDoubleClicked(event)" title="Click to add names">
			You, Me and Several others</span>
			<span onclick="spanDoubleClicked(event)" class="clickable" title="Click to change"> like this.</span>
		</div>
		<div class="response" id="response">
			
		</div>
	</div>	
	</div>
	<div id="canvas" >
		
	</div>
	
	<div id="post" style="display:none;" class="button">
			<button id="post-button">Post to Facebook
			<!-- <img src="resources/ajax-loader.gif" /> -->
			</button>		 
			<span id="gaga"></span>
		</div>
		
		<div style="display:none" class="button" id="final-actions">
			<button id="view-on-facebook">View on Facebook</button>
			<button id="create-new">Create another Fake Wall</button>
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
				<label for="tags">Friend: </label> <input type="text" id="friend" 
				class="text ui-widget-content ui-corner-all" style="width: 100%" />
			</div>
			<div id="url-tab">
				<label for="dp_url">Url:</label> <input type="text" name="dp_url" id="dp_url"
					class="text ui-widget-content ui-corner-all" style="width: 100%" />
			</div>

		</div>
	</div>

	<div id="alert" title="Message!">
		<span id="alert-text" ></span>
	</div>

	<div id="tag-selector" title="Select Friends to Tag">	
	
	<div id="tag-friends">
		
	</div>

	</div>

	</body>
</html>
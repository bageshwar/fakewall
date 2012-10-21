<%@ page language="java" contentType="text/html"%>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<title>Fake Wall App | Terms of Service</title>
<script src="resources/jquery-1.8.2.min.js"></script>

<script src="resources/jquery-ui-1.9.0.custom.min.js"></script>
<script src="resources/jquery.autosize-min.js"></script>
<script src="resources/commentTemplate.js"></script>
<script src="resources/html2canvas.min.js"></script>
<script src="resources/jquery.plugin.html2canvas.js"></script>

<link rel="stylesheet" href="resources/style.css" type="text/css" />
<link href="resources/jquery-ui.1.9.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.clickable{
/* border: 1px solid black; */
}

</style>

</head>

<body>

	<div id="masthead">
		<span id="appheader"><b><a href="/">Fake Wall App</a></b></span> 
		<span id="header-links"><a href="about.jsp">About</a> | <a href="help.jsp">Help</a> | <a href="privacy.jsp">Privacy</a></span> 
			<!-- <a href="https://www.facebook.com/"> <span id="user">User</span><img style="display:inline" 
			src="resources/dp.jpg" id="user-dp" /></a> -->
	</div>
	<div class="main">

		<div class="content" id="content">


			<div class="wrapper" id="wrapper">
				<img src="resources/beta.png" style="float: right" />
				<div class="post_user">
					<div>
						<img class="main-dp dp clickable" src="resources/icon-32x32.png" title="Click to add a Friend" />
					</div>
					<div class="post-user">
						<span class="name-user clickable" title="Click to add a Friend">Fake Wall</span> <br /> <span
							class="timestamp clickable" title="Click to edit Time"> some time back </span>
					</div>
				</div>
				<div class="post-content">
					<span class="clickable" title="Click to edit the Post">Terms of conditions<br />None as such.</span>
				</div>
				<div class="likebanner link">Like &middot; Comment &middot; Share</div>
				<div class="likes">
					<i class="like-icon"></i> <span class="link clickable" title="Click to add names"> You, Me and Several
						others</span> <span class="clickable" title="Click to change"> like this.</span>
				</div>
				<div class="response" id="response">
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable" title="Click to add a Friend" src="resources/aware.jpg" />
						</div>
						<i class="remove-comment clickable" title="Click to delete Comment"></i>
						<div class="comment-content">
							<span class="name-user clickable" title="Click to add a Name">Aware User</span> <span class="comment-text clickable"
								title="Click to edit Comment">:/</span> <br /> <span class="timestamp clickable"
								title="Click to edit Time">3 hours ago </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable" title="Click to add a Name">1 person</span> <span class="clickable"
									title="Click to Change"> likes this.</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>

</body>
</html>
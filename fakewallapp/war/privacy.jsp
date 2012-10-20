<%@ page language="java" contentType="text/html"%>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<title>Fake Wall App | Privacy</title>
<script src="resources/jquery-1.8.2.min.js"></script>

<script src="resources/jquery-ui-1.9.0.custom.min.js"></script>
<script src="resources/jquery.autosize-min.js"></script>
<script src="resources/commentTemplate.js"></script>
<script src="resources/html2canvas.min.js"></script>
<script src="resources/jquery.plugin.html2canvas.js"></script>

<link rel="stylesheet" href="resources/style.css" type="text/css" />
<link href="resources/jquery-ui.1.9.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.  { /* border: 1px solid black; */
	
}
</style>

</head>

<body>

	<div id="masthead">
		<span id="appheader"><b><a href="/">Fake Wall App</a></b></span> <span id="header-links"><a
			href="about.jsp">About</a> | <a href="help.jsp">Help</a> | <a href="privacy.jsp">Privacy</a></span> <a
			href="https://www.facebook.com/"> <span id="user">User</span><img style="display: inline" src="resources/dp.jpg"
			id="user-dp" /></a>
	</div>
	<div class="main">

		<div class="content" id="content">


			<div class="wrapper" id="wrapper">
				<img src="resources/beta.png" style="float: right" />
				<div class="post_user">
					<div>
						<img class="main-dp dp  " src="resources/dp.jpg" />
					</div>
					<div class="post-user">
						<span class="name-user  ">Fake Wall</span> <br /> <span class="timestamp  "> around 21<sup>st</sup> October 2012 </span>
					</div>
				</div>
				<div class="post-content">
					<span class=" ">We care about your Privacy</span>
				</div>
				<div class="likebanner link">Like &middot; Comment &middot; Share</div>
				<div class="likes">
					<i class="like-icon"></i> <span class="link  "> You, Me and Several others</span> <span class=" ">
						like this.</span>
				</div>
				<div class="response" id="response">
					<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<!-- <i class="remove-comment  "></i> -->
						<div class="comment-content">
							<span class="name-user  ">Security Aware User</span> <span class="comment-text  ">Do you save our passwords?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">Nope!</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Privacy Aware User</span> <span class="comment-text  ">What about our email addresses?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">Nope!</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">Who can see the fake walls 
							I publish from this app?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">It will depend upon the visibility settings you chose 
							while authorizing this app. You can verify the same <a href="http://www.facebook.com/appcenter/my">here</a> 
							(Search for the FakeWall App). <br />All the friends that have been tagged can also see the post. </span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Legality Aware User</span> <span class="comment-text  ">Who owns the photo posted via Fake Wall?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">It becomes the property of Facebook.</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
					<!-- 	<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">Who can see the fake walls 
							I publish from this app?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">Who can see the fake walls 
							I publish from this app?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/dp.jpg" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">Who can see the fake walls 
							I publish from this app?</span> <br />
							<span class="timestamp  "> around 21<sup>st</sup> October 2012 </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div> -->
						
						
						
					</div>
				</div>
			</div>

		</div>

	</div>

</body>
</html>
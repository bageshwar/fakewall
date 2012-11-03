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
.remove-comment{
display:none;
}
</style>
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-35894308-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>

<body>
<!-- FB SDK -->
<div id="fb-root"></div>
<script>
	//load asynch
	(function(d, s, id) {
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) return;
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=272534742866210";
	 fjs.parentNode.insertBefore(js, fjs);
	 }(document, 'script', 'facebook-jssdk'));
</script>
	
	<%@include file="header.jsp" %>
	<div class="main">

		<div class="content" id="content">
		

			<div class="wrapper" id="wrapper">
				<img src="resources/beta.png" style="float: right" />
				<div class="post_user">
					<div>
						<img class="main-dp dp  " src="resources/icon-32x32.png" />
					</div>
					<div class="post-user">
						<span class="name-user  ">Fake Wall</span> <br /> <span class="timestamp  "> some time back </span>
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
							<img class="comment-dp dp  " src="resources/security.png" />
						</div>
						<!-- <i class="remove-comment  "></i> -->
						<div class="comment-content">
							<span class="name-user  ">Security Aware User</span> <span class="comment-text  ">Do you save our passwords?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">Nope!</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/privacy.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Privacy Aware User</span> <span class="comment-text  ">What about our email addresses?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">Nope!</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
							<!-- Security Image access -->
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/security.png" />
						</div>
						<!-- <i class="remove-comment  "></i> -->
						<div class="comment-content">
							<span class="name-user  ">Security Aware User</span> <span class="comment-text  ">Are the fakewalls we 
							publish accessible to anybody outside of facebook?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">No, the fakewall that you 
							publish is only accessible on facebook.</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						<!-- Privacy Logs-->
							<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/privacy.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Privacy Aware User</span> <span class="comment-text  ">Any other information is saved?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">
							On our server, we save the active user details when one of the following happens
							<ul>
							<li>User Logs-in to this app</li>
							<li>User publishes a fakewall to Facebook.</li>							
							</ul></span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/permissions.gif" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">Who can see the fake walls 
							I publish from this app?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">It will depend upon the visibility settings you chose 
							while authorizing this app. You can verify the same <a class="comment-link" target="_BLANK" href="http://www.facebook.com/appcenter/my">here</a> 
							(Search for the FakeWall App). <br />All the friends that have been tagged can also see the post. </span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<!-- permissions -->
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/permissions.gif" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Permissions Aware User</span> <span class="comment-text  ">What all permissions does this app require 
							and how is it used?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">
							This app requests for the following permissions
							<ul>
							<li><b>User Details: </b> These are provided by Facebook by default</li>
							<li><b>Publish to your timeline: </b>To publish the fakewall your created to facebook, without requiring you to take screenshots
							or share links.</li>
							<li><b>Access your photos: </b>To tag friends(optional) that you included in your fakewall.</li>							
							</ul>
							</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/legal.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Legality Aware User</span> <span class="comment-text  ">Who owns the photo posted via Fake Wall?</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div></div>
						
						
						<div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/icon-32x32.png" />
						</div>
						<div class="comment-content">
							<span class="name-user  ">Fake Wall</span> <span class="comment-text  ">It becomes the property of Facebook.</span> <br />
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
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
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
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
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
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
							<span class="timestamp  "> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">1 person</span> <span class=" "> likes this.</span>
							</div>
						</div>
						</div> -->
						
						
						
					</div>
				</div>
				<div class="fb-like-wrapper">
		<div class="fb-like"  data-href="http://www.facebook.com/pages/FakePosts-Community/429286103795737" 
		data-send="false"  data-show-faces="true"></div>
		</div>
			</div>

		</div>

	

<div id="canvas"></div>
<script type="text/javascript">
  var uvOptions = {};
  (function() {
    var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
    uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/upk6rRmHW3XJIDOaXtt6Q.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
  })();
</script>
</body>
</html>
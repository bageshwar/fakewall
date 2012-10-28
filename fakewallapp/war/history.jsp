<%@ page language="java" contentType="text/html" session="true"%>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<title>Fake Wall App | My Fake Walls</title>
<script src="resources/jquery-1.8.2.min.js"></script>
<script src="resources/jquery-ui-1.9.0.custom.min.js"></script>
<script src="resources/history.js"></script>

<link rel="stylesheet" href="resources/style.css" type="text/css" />
<link href="resources/jquery-ui.1.9.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.  { /* border: 1px solid black; */
	
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
		<div class="fb-like-wrapper">
		<div class="fb-like"  data-href="http://www.facebook.com/pages/FakePosts-Community/429286103795737" 
		data-send="false" data-width="250" data-show-faces="true"></div>
		</div>

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
					<span class=" ">List of your saved Fake Walls</span>
				</div>
				<div class="likebanner link">Like &middot; Comment &middot; Share</div>
				<div class="likes">
					<i class="like-icon"></i> <span class="link  "> You </span> <span class=" ">
						like this.</span>
				</div>
				<div class="response" id="response">
					
					<!-- <div class="comment">
						<div>
							<img class="comment-dp dp  " src="resources/archive.png" />
						</div>
						<i class="remove-comment  "></i>
						<div class="comment-content">
							<span class="name-user  ">Mr. History</span> <span class="comment-text  ">Some description</span> <br /> <span
								class="timestamp  "> timestamp </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link  ">You</span> <span class=" "> like this.</span>
							</div>
						</div>
					</div> -->


				</div>
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
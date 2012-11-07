<%@ page language="java" contentType="text/html"%>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
 <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# fakeposts: http://ogp.me/ns/fb/fakeposts#">
 <meta charset='utf-8'>
      <meta property="fb:app_id" content="272534742866210" />
        <meta property="og:title" content="Fakewall" />
        <meta property="og:image" content="http://fakewallapp.appspot.com/resources/web-banner-200x200.png" />
        <meta property="og:url" content="http://fakewallapp.appspot.com<%=request.getAttribute("url")==null?"/about.jsp":request.getAttribute("url") %>" />
        <meta property="og:type" content="fakeposts:fakewall" />
        <meta property="og:description" 
        content="Hey, I just created a Fakewall using this app. Takes a few clicks to create one for yourself!" />  
<title>Fake Wall App | About</title>
<!-- <script src="/resources/jquery-1.8.2.min.js"></script>

<script src="/resources/jquery-ui-1.9.0.custom.min.js"></script> -->
<!-- <script src="/resources/jquery.autosize-min.js"></script>
<script src="/resources/commentTemplate.js"></script>
<script src="/resources/html2canvas.min.js"></script>
<script src="/resources/jquery.plugin.html2canvas.js"></script>
 -->
<link rel="stylesheet" href="/resources/style.css" type="text/css" />
<link href="/resources/jquery-ui.1.9.min.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<style type="text/css">
.clickable{
/* border: 1px solid black; */
cursor: auto;
}
.remove-comment{
display:none;
}

</style>

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

/* window.fbAsyncInit = function() {
    FB.init({
      appId      : '272534742866210', // App ID
      channelUrl : 'channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
    
  
	FB.Event.subscribe('xfbml.render', function(response) {
		$('#login-button').show();
		});


	FB.Event.subscribe('auth.login', function(response) {
		console.log("logged in!!!",response);
		window.location.href="/";
		});

	};

	(function(d) {
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/en_US/all/debug.js";
		ref.parentNode.insertBefore(js, ref);
	}(document)); */

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
				<img src="/resources/beta.png" style="float: right" />
				<div class="post_user">
					<div>
						<img class="main-dp dp clickable" src="/resources/icon-32x32.png"  />
					</div>
					<div class="post-user">
						<span class="name-user clickable" >Fake Wall</span> <br /> <span
							class="timestamp clickable" > some time back </span>
					</div>
				</div>
				<div class="post-content">
					<span class="clickable" >Want to play a prank upon your friends?.</span>
				</div>
				<div class="likebanner link">Like &middot; Comment &middot; Share</div>
				<div class="likes">
					<i class="like-icon"></i> <span class="link clickable" > You, Me and Several
						others</span> <span class="clickable" > like this.</span>
				</div>
				<div class="response" id="response">				
					
					
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable"  src="/resources/aware.jpg" />
						</div>
						<i class="remove-comment clickable" ></i>
						<div class="comment-content">
							<span class="name-user clickable" >Aware User</span> <span class="comment-text clickable"
								>Yes !!! :D :D :D </span> <br /> <span class="timestamp clickable"
								> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable" >Fake Wall</span> <span class="clickable"
									> likes this.</span>
							</div>
						</div>
					</div>
					
					
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable"  src="/resources/icon-32x32.png" />
						</div>
						<i class="remove-comment clickable" ></i>
						<div class="comment-content">
							<span class="name-user clickable" >Fake Wall</span> <span class="comment-text clickable"
								> Its very simple. Go to the <a class="comment-link"  href="/?login=y"> home-page </a>and start using this app :) 
								 </span> <br /> <span class="timestamp clickable"
								> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable">Aware User</span> <span class="clickable"
									> likes this.</span>
							</div>
						</div>
					</div>
					
					
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable"  src="/resources/aware.jpg" />
						</div>
						<i class="remove-comment clickable"></i>
						<div class="comment-content">
							<span class="name-user clickable" >Aware User</span> <span class="comment-text clickable"
								>k, but what are the benefits ? </span> <br /> <span class="timestamp clickable"
								> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable" >Fake Wall</span> <span class="clickable"
									> likes this.</span>
							</div>
						</div>
					</div>
					
					
					
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable"  src="/resources/icon-32x32.png" />
						</div>
						<i class="remove-comment clickable" ></i>
						<div class="comment-content">
							<span class="name-user clickable" >Fake Wall</span> <span class="comment-text clickable"	>  
							Well it has some unique features... here goes the list
							<ul>
							<li>Integrates with facebook, so its very easy to add ur friends in the content</li>
							<li>One click publish to facebook</li>							
							<li>Automatically tag your friends</li>
							<li>Everything is editable</li>
								<ul>
								<li>Friend's Profile Pic</li>
								<li>Friend's Name</li>
								<li>Time of the post</li>								
								<li>Comments/Likes</li>
								<li>And you can even change the &quot;Like&quot; to anything else (Dislike maybe!!!)</li>
								</ul>
								<li>Just click and edit! Take a look <a class="comment-link" href="/help.jsp">here</a></li>
								
							<li><a class="comment-link"  href="/?login=y">Go to the home-page now!</a></li>
							</ul>
								 </span> <br /> <span class="timestamp clickable"
								> some time back </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable">Aware User</span> <span class="clickable"
									> likes this.</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="fb-like-wrapper">
				<div class="fb-like" data-href="http://www.facebook.com/pages/FakePosts-Community/429286103795737" data-send="false"
					data-show-faces="true"></div>
			</div>
		</div>
	
	</div>
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
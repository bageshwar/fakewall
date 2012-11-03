<%@ page language="java" contentType="text/html"%>
<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<title>Fake Wall App | Help</title>
<script src="resources/jquery-1.8.2.min.js"></script>

<script src="resources/jquery-ui-1.9.0.custom.min.js"></script>
<script src="resources/jquery.autosize-min.js"></script>
<script src="resources/commentTemplate.js"></script>
<script src="resources/html2canvas.min.js"></script>
<script src="resources/jquery.plugin.html2canvas.js"></script>

<link rel="stylesheet" href="resources/style-help.css" type="text/css" />
<link href="resources/jquery-ui.1.9.min.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<style type="text/css">
.clickable{
/* border: 1px solid black; */
}

#desc{
font-family: Verdana, Arial, sans-serif;
/* margin:15px 0px 15px 0px ; 
 padding:8px 0 8px 0px;  */
 /* padding-left:20px; */
 
}
#desc h4{
 margin-left:auto;
 margin-right:auto;
 width:500px; 
 color: #585858;
}
.fb-like-wrapper{
	
	margin-top:30px;	
}

</style>

<script type="text/javascript">

$(document).ready(function(){
	
	$(document).tooltip({
		track:true,
		hide:50
		});
	
	$('.clickable').each(function(index,item){$(item).click(popup) ;})
	
});

function popup(){
	alert('Not here! Go to the homepage to see this in action');
}
</script>


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
		
	<div id="desc" class="wrapper" >
	<h4>Its simple.Everything is editable.Just hover your mouse.</h4>
	</div>

			<div class="wrapper" id="wrapper">
				<img src="resources/beta.png" style="float: right" />
				<div class="post_user">
					<div>
						<img class="main-dp dp clickable" src="resources/dp.jpg" title="Click to add a Friend" />
					</div>
					<div class="post-user">
						<span class="name-user clickable" title="Click to add a Friend">User</span> <br /> <span
							class="timestamp clickable" title="Click to edit Time">3 hours ago</span>
					</div>
				</div>
				<div class="post-content">
					<span class="clickable" title="Click to edit the Post">Post</span>
				</div>
				<div class="likebanner link">Like &middot; Comment &middot; Share</div>
				<div class="likes">
					<i class="like-icon"></i> <span class="link clickable" title="Click to add names"> You, Me and Several
						others</span> <span class="clickable" title="Click to change"> like this.</span>
				</div>
				<div class="response" id="response">
					<div class="comment">
						<div>
							<img class="comment-dp dp clickable" title="Click to add a Friend" src="resources/dp.jpg" />
						</div>
						<i class="remove-comment clickable" title="Click to delete Comment"></i>
						<div class="comment-content">
							<span class="name-user clickable" title="Click to add a Name">Add Me</span> <span class="comment-text clickable"
								title="Click to edit Comment">Edit Me</span> <br /> <span class="timestamp clickable"
								title="Click to edit Time">3 hours ago </span> <span class="link">Like</span>
							<div class="comment-likes likes">
								<span class="link clickable" title="Click to add a Name">1 person</span> <span class="clickable"
									title="Click to Change"> likes this.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		
		<div class="fb-like-wrapper">
		<div class="fb-like"  data-href="http://www.facebook.com/pages/FakePosts-Community/429286103795737" 
		data-send="false"  data-show-faces="true"></div>
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
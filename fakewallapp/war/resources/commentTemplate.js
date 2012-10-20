//var commentTemplate = '	<div class="comment">				<div>					<img class="comment-dp dp " src="resources/dp.jpg" onclick="imageClicked(event)" />				</div>				<i class="remove-comment" onclick="deleteComment(event)"></i>				<div class="comment-content">					<span class="name-user" onclick ="spanDoubleClicked(event)">Add Me</span> <span class="comment-text"  onclick ="spanDoubleClicked(event)">Edit Me</span> <br />					<span class="timestamp"  onclick ="spanDoubleClicked(event)">3 hours ago </span><span class="link"  >Like</span>					<div class="comment-likes likes">						<span class="link"  onclick ="spanDoubleClicked(event)">1 person</span><span  onclick ="spanDoubleClicked(event)"> likes this.</span>					</div>				</div>			</div>';

var commentTemplate = '<div class="comment">'
		+ '<div>'
		+ '	<img class="comment-dp dp clickable" title="Click to add a Friend" src="resources/dp.jpg" onclick="imageClicked(event)" />'
		+ '</div>'
		+ '<i class="remove-comment clickable" onclick="deleteComment(event)" title="Click to delete Comment"></i>'
		+ '<div class="comment-content">'
		+ '	<span class="name-user clickable" onclick="spanDoubleClicked(event)" title="Click to add a Name">Add Me</span> '
		+ '<span class="comment-text clickable" onclick="spanDoubleClicked(event)" title="Click to edit Comment">Edit Me</span> <br /> '
		+ '		<span class="timestamp clickable" onclick="spanDoubleClicked(event)" title="Click to edit Time">3 hours ago </span>'
		+ '<span class="link">Like</span>'
		+ '	<div class="comment-likes likes ">'
		+ '		<span class="link clickable" onclick="spanDoubleClicked(event)" title="Click to add a Name">1 person</span>'
		+ '		<span onclick="spanDoubleClicked(event)" class="clickable" title="Click to Change"> likes this.</span>' 
		+ '	</div>' + '</div>' + '</div>';
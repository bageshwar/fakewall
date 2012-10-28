/**
 * jQuery has loaded
 */
$(document)
		.ready(
				function() {

					if (localStorage && Storage) {
						for (item in localStorage) {
							if (item.indexOf('walls') != -1) {
								var template = '<div class="comment">'
										+ '<div>'
										+ '<img class="comment-dp dp  " src="resources/archive.png" />'
										+ '</div>'
										+ '<i class="remove-comment  "></i><i class="remove-comment  ">Go</i>'
										+ '<div class="comment-content">'
										+ '<span class="name-user  ">Archived</span> <span class="comment-text  ">'+item+'</span> <br /> <span'
										+ ' class="timestamp"> timestamp '+(localStorage[item].length/1024).toFixed(2)
										+' KB</span> <span class="link">Like</span>'
										+ '<div class="comment-likes likes">'
										+ '<span class="link  ">You</span> <span class=" "> like this.</span>'
										+ '</div>' + '</div>' + '</div>';
								$('#response').append(template);
							}
						}
					}
				});
/**
 * This script contains all the core Models and Controllers to be used by
 * fakewallapp.
 * 
 * @author Bageshwar P Narain
 * 
 */

// vars
var temp;

/**
 * The current span control being edited.
 */
var spanControl;

/**
 * Flag to find the source of DialogClose event.
 */
var isPopupCancelled = true;

/**
 * The current image control being edited.
 */
var imageControl;

/**
 * 
 * Array to hold name of friends
 */
var fdata = [];

/**
 * Name-Value for id against username. To be used to fetch Image URL.
 */
var fmap = {};

/**
 * Array of random text fetched from the server
 */
var randomText;

/**
 * Holds the ID of the timer to show random text
 */
var intervalID;

/**
 * Holds the ID of the timer used for popups
 */
var popupTimer;

/**
 * Map to store the friends that will be tagged.
 */
var taggedFriends = {};

/**
 * The current user.
 */
var userObject;

/**
 * 
 */
var myDomain = "/";

/**
 * The canvas object.
 */
var pageCanvas;

/**
 * Global Flag to check whether any friends have been tagged or not.
 */
tagsExist = false;

/**
 * Callback function that is called when an alert dialog closes.
 */
var callbackAfterAlert;

/**
 * Uploader
 */
var uploader;

/**
 * Proxy URL for html2canvas cross-domain image loading.
 * */
var proxyURL='http://fakewall-proxy.appspot.com/';

/**
 * Home URL
 * */
var home=window.location.origin+'/';
var homeSecured=window.location.origin+'/';

$(document).ready(function() {
	init();
});

/**
 * Fired when DOM ready.
 * */
function init(){
	if (!jQuery.browser.chrome) {
		// not chrome
		alert('Hi, Only Google Chrome is supported at the moment');
	}
	
	
	// load the list of friends
	//loadFriends();

	// dialogs
	buildDialogs();
	
	showDisclaimer();
	
	// event handlers
	registerEventHandlers();

	$("#tabs").tabs();

	$(document).tooltip({
		hide : 50
	});

	createUploader();
		
}

/**
 * Show a disclaimer message, that this has nothing to do with facebook.
 * */
function showDisclaimer(){
	$('#alert-text').html('The Fake Wall that you will create using this app will be posted as an Image on <b>Your</b> timeline.'+
			'This app is not associated with Facebook in any form.');
	$('#alert').dialog('open');
}

/**
 * Builds the 2 dialogs 1. For editing any span on the page. 2. For providing
 * URL to any image on the page. 1 more dialog to show alerts.
 */
function buildDialogs() {
	// Span dialogs
	$("#comment_dialog").dialog(
			{
				modal : true,
				autoOpen : false,
				width : 600,
				/*
				 * show:'slide', hide:'slide',
				 */
				buttons : {
					"Add" : function() {

						isPopupCancelled = false;
						$(this).dialog("close");
					},
					Cancel : function() {
						isPopupCancelled = true;
						$(this).dialog("close");
					}
				},

				beforeClose : function(event, ui) {
					// if the event has been fired by the OK button
					if (!isPopupCancelled) {

						if ($('#enter_comment').val() != ''
								&& $('#enter_comment').val() != null
								&& $('#enter_comment').val().trim() != '') {
							spanControl.innerHTML = $('#enter_comment').val();
						} else {
							$('#alert-text').html(
									'You cannot delete everything.');
							$('#alert').dialog('open');
						}
						isPopupCancelled = true; // resetting flag
					}
				},

			});

	// animated text area
	$('#enter_comment').autosize({
		append : "\n"
	});

	//Load locally stored images into dp_dialog div	
	loadLocallyStoredImageIntoDialog();
	// Image Dialog
	$("#dp_dialog")
			.dialog(
					{
						modal : true,
						autoOpen : false,
						width : '500px',
						/*
						 * show:'slide', hide:'slide',
						 */
						buttons : {
							"Add" : function() {

								isPopupCancelled = false;
								$(this).dialog("close");
							},
							Cancel : function() {
								isPopupCancelled = true;
								$(this).dialog("close");
							}
						},
						beforeClose : function(event, ui) {
							// if the event has been fired by the OK button
							if (!isPopupCancelled) {

								// priority to text present in name field,
								if ($('#friend').val() != null
										&& $('#friend').val() != '') {
									// save the name of the friend as to be
									// tagged
									imageControl.userid = fmap[$('#friend')
											.val()];
									imageControl.username = $('#friend').val();

									// add image src
									imageControl.src = 'proxy?url=https://graph.facebook.com/'
											+ fmap[$('#friend').val()]
											+ '/picture';
									/* imageControl.src='resources/beta.png'; */
									// set the name
									$(imageControl).parent().parent().find(
											'.name-user').html(
											($('#friend').val()));

									// reset the textbox value
									$('#friend').val('');

								} else {
									imageControl.src = $('#dp_url').val();
								}
								isPopupCancelled = true; // resetting flag
							}
						},

					});

	// animated text area
	$('#dp_url').autosize({
		append : "\n"
	});

	$('#friend').autosize({
		append : "\n"
	});

	// alert dialog
	$("#alert").dialog({
		modal : true,
		autoOpen : false,
		buttons : {
			"OK" : function() {
				$(this).dialog("close");
			}
		},
		close : function(event, ui) {
			if (typeof callbackAfterAlert === 'funtion') {
				callbackAfterAlert(event, ui);
			}
		}

	});

	$('#saved_walls').dialog({
		modal : true,
		autoOpen : false,
		height : window.innerHeight-30,
		width : '500'
	});

	$('#tag-selector').dialog({
		modal : true,
		autoOpen : false,
		width : '600px',
		buttons : {
			"OK" : initPostToFacebook
		},
		close : function(event, ui) {
			// to re-enable the add comment and post to facebook buttons.
			$('#add-comment,#post-button').removeAttr('disabled');
			$('i.remove-comment').show();
		}
	});

	// Like Dialog: de-scoped at the moment.
	$("#like_dialog").dialog(
			{
				modal : true,
				autoOpen : false,
				width : '500px',
				/*
				 * show:'slide', hide:'slide',
				 */
				buttons : {
					"Add" : function() {

						isPopupCancelled = false;
						$(this).dialog("close");
					},
					Cancel : function() {
						isPopupCancelled = true;
						$(this).dialog("close");
					}
				},
				beforeClose : function(event, ui) {
					// if the event has been fired by the OK button
					if (!isPopupCancelled) {
						// priority to text present in name field,
						if ($('#friend-like').val() != null
								&& $('#friend-like').val() != '') {
							spanControl.innerHTML = $('#friend-like').val()
							// reset the textbox value
							$('#friend-like').val('');
						}
						isPopupCancelled = true; // resetting flag
					}
				},

			});

}

function loadLocallyStoredImageIntoDialog(){
	if(localStorage && Storage){
		
		//$('#uploaded').append(uploadedImage);
		
		if(localStorage['uploads']==null)
			return;
		var uploads=JSON.parse(localStorage['uploads']);
		$.each(uploads,function(index,item){
			console.log('Loading locally stored image',item.name);
			addLocalImageToDialog(item.name,item.data);
		});
	}else {
		console.log('Browser does not support Local Storage');
	}
}
function initPostToFacebook() {

	$('#tag-selector').dialog('close');
	taggedFriends = {};
	$('input[type=checkbox]').each(function() {
		if ($(this).attr("checked")) {
			taggedFriends[$(this).attr('userid')] = false;
		}
	});
	console.log("Tagged Friends", taggedFriends);
	postToFacebook();

}

/**
 * Registers event handles for 1. All SPAN elements on the page 2. All IMG
 * elements on the page.
 */
function registerEventHandlers() {

	// for adding comment
	$('#add-comment').button().click(function(event) {
		$('#response').append(commentTemplate);

	});

	$('#post-button').button().click(function() {
		generatePreview();

	});

	// button to view the post on facebook
	$('#view-on-facebook').button().click(function() {
		// window.location.href=$('#view-on-facebook').attr('href');
		window.open($('#view-on-facebook').attr('href'));
	});

	// button to create a new fakewall
	$('#create-new').button().click(function() {
		window.location.reload();
	});

	$('#cancel-preview').button().click(function() {
		// alert("hi");
		$('canvas').remove();
		// $('canvas').hide();
		$('#content').show();
		$('#post').hide();
		h2cSelector = null;
	});

}

function generatePreview() {

	// check if the user has actually created something,
	// alert if not and return.
	var isModified = checkContent();

	if (!isModified) {

		return;
	}

	// /remove any existing canvases
	$('canvas').remove();

	$(document).tooltip({
		disabled : true
	});

	// progress indicator
	doRandomText();

	// disable buttons
	$('#add-comment,#post-button').attr('disabled', 'disabled');

	// hiding the delete icon from comments
	$('i.remove-comment').hide();

	var h2cSelector = $('#wrapper');

	if (window.setUp) {
		console.log('setting up windows');
		window.setUp();
	}

	pageCanvas = $(h2cSelector).html2canvas({
		flashcanvas : "resources/flashcanvas.min.js",
		logging : true,
		profile : false,
		useCORS : true,
		/* timeout:10000, */
		proxy : proxyURL,
		onComplete : function() {

			// cancel randomText
			clearInterval(intervalID);
			$('#gaga').hide();

			// $('div[role="dialog"]').css('display', 'none');
			// $('ul[role="listbox"]').css('display','none');
			$('canvas').attr("title", "Image Preview. Nothing is editable");
			$('canvas').tooltip({
				track : true
			});

			initCheckBoxes();
			// if no one is to be tagged, directly post to facebook.
			if (tagsExist) {
				$('#tag-selector').dialog('open');
			} else {
				initPostToFacebook();
			}

		}
	});

}

/**
 * 
 * Checks through the OOB spans to check if any content was modified, because
 * users are not actually creating anything. Just posting.
 */
function checkContent() {
	//TODO: Remove this line.
	return true;
	var modified = false;
	if ($($('.post-content').children()[0]).html() != 'Post') {
		modified = true;

	} else {
		alert('You can add content to the \"Post\". Check the Help page for more details.');
		return false;
	}
	if ($('#response').children().length == 0) {
		alert("You have not added any comment. Check the Help page for more details.")
		return false;
	} else {
		modified = true;
	}
	return modified;
}

function spanDoubleClicked(event) {
	// populate the text in the popup
	$('#enter_comment').val(event.srcElement.innerHTML);
	// setting the currently being edited span
	spanControl = event.srcElement;
	$("#comment_dialog").dialog("open");
	$('#enter_comment').focus();
}

/**
 * 
 */
function likeButtonClicked(event) {
	// populate the text in the popup
	$('#friend-like').val(event.srcElement.innerHTML);
	// setting the currently being edited span
	spanControl = event.srcElement;
	$("#like_dialog").dialog("open");
	$('#friend-like').focus();
	$('#friend-like').select();
}

function imageClicked(event) {
	// populate the text in the popup
	$('#dp_url').val(event.srcElement.innerHTML);
	// setting the currently being edited image
	imageControl = event.srcElement;
	$("#dp_dialog").dialog("open");
	$('#friend').focus();
}

function deleteComment(event) {

	event.srcElement.parentElement.outerHTML = '';
}

/**
 * Called to post the image to facebook.
 */
function postToFacebook() {
	
	// progress indicator
	doRandomText();

	//save image to local storage
	saveWallToLocalStorage('AutoSaved_'+new Date().getTime());
	
	//TODO: appears to be un-used.
	var url = 'https://graph.facebook.com/me/photos?access_token=';

	$.ajax({
		type : "POST",
		url : myDomain + "saveimage",
		data : {
			image : $('canvas')[0].toDataURL(),
			user : userObject
		},
		success : function(data) {
			console.log('image saved success', data.path);

			$.ajax({
				type : "POST",
				url : "https://graph.facebook.com/me/photos",
				data : {
					message : "Fake Wall App",
					url : home+"getimage?type=jpg&path="
							+ data.path,
					/* url:'http://fakewallapp.appspot.com/resources/beta.png', */
					access_token : access_token,
					format : "json",
				},
				complete : function(data) {
					if (data.readyState == 4 && data.status == 200 && !JSON.parse(data.responseText).error) {
						tagPhotos(data);
					} else {
						
						//photos permission were not given by the user, download the photo manually.
						//this form submission will get the image in the current session.
						document.forms[0].submit(); 
						cleanButtons();
						//TODO: get the error code for this scenario and
						//add it to the below function.
						//handleAuthTokenError(data);
					}
				}
			});
		},
		complete : function(data) {
			console.log('Save image request complete', data);
		},
		error : function(data) {
			console.log('Error while saving image', data);
		}
	});

	// disabling the buttons
	$('#post-button').attr("disabled", "disabled");
	$('#add-comment').attr("disabled", "disabled");

}

function sendUserDetailsToServer() {
	console.log("Sending user details to server", userObject);
	if (first_name == 'null' || user_id == 'null') {
		$.ajax({
			type : "POST",
			url : "adduserdetails",
			data : {
				user : userObject
			},
			complete : function(data) {
				console.log(data);
			}
		});
	}
}

function loadFriends() {

	// TODO: Remove unncessary call, if user details are already known.
	$
			.getJSON(
					"https://graph.facebook.com/me?access_token="
							+ access_token,
					function(data) {
						console.log("User Object", data);
						userObject = data;
						sendUserDetailsToServer();
						$('#user').html(userObject.first_name);
						$('#user-dp').attr(
								"src",
								"proxy?url=https://graph.facebook.com/"
										+ userObject.id + "/picture");
						$('#user-dp').css('display', 'inline');
						var url = "https://graph.facebook.com/me/friends?limit=5000&access_token="
								+ access_token;
						$
								.getJSON(
										url,
										function(data) {
											// mdata=data;
											for (i in data.data) {
												fdata[i] = data.data[i].name;
												fmap[data.data[i].name] = data.data[i].id;
											}

											fdata[data.data.length] = userObject.name;
											fmap[userObject.name] = userObject.id;
											$("#friend").autocomplete({
												source : fdata,
												delay : 10
											});

											// adding auto complete for like
											// dialog.
											// with capability to add multiple
											// friends.
											// DESCOPED at the moment.
											$("#friend-like")
													.autocomplete(
															{
																source : function(
																		request,
																		response) {
																	// delegate
																	// back to
																	// autocomplete,
																	// but
																	// extract
																	// the last
																	// term
																	response($.ui.autocomplete
																			.filter(
																					fdata,
																					extractLast(request.term)));
																},
																focus : function() {
																	// prevent
																	// value
																	// inserted
																	// on focus
																	return false;
																},
																select : function(
																		event,
																		ui) {
																	var terms = split(this.value);
																	// remove
																	// the
																	// current
																	// input
																	terms.pop();
																	// add the
																	// selected
																	// item
																	terms
																			.push(ui.item.value);
																	// add
																	// placeholder
																	// to get
																	// the
																	// comma-and-space
																	// at the
																	// end
																	terms
																			.push("");
																	this.value = terms
																			.join(", ");
																	return false;
																},
																delay : 10
															});

											// not required at this moment
											/*
											 * $( "#friend-like" ).bind(
											 * "keydown", function( event ) {
											 * console.log(event.keyCode,$.ui.keyCode.TAB,$(
											 * this ).data( "autocomplete"
											 * ).menu.active); if (
											 * event.keyCode ===
											 * $.ui.keyCode.TAB && $( this
											 * ).data( "autocomplete"
											 * ).menu.active ) {
											 * event.preventDefault(); } });
											 */

											console.log("friend list loaded");
											popup(
													"Facebook Friend List Loaded",
													3000);
										})
								.error(
										function(data) {
											// handleAuthTokenError(data);
											var error = $
													.parseJSON(data.responseText);
											console.warn(error);
											if (error.error.code == 190
													|| error.error.code == 2500) {
												console.log("Auth expired")
												handleAuthTokenError(data);
											}

										});

					}).error(function(data) {
				// handleAuthTokenError(data);
				var error = $.parseJSON(data.responseText);
				if(error==null){
					console.error("cross domain error ",data);
					//cross domain error, return
					return;
				}
				console.warn(error);
				if (error.error.code == 190 || error.error.code == 2500) {
					console.log("Auth expired")
					handleAuthTokenError(data);
				}

			});

}

// jquery autocomplete methods
function split(val) {
	return val.split(/,\s*/);
}
function extractLast(term) {
	return split(term).pop();
}

function doRandomText() {

	$('#gaga').show(500);

	var url = myDomain + "randomtext";
	$.getJSON(url, function(data) {
		randomText = data;
		console.log("Random Text", data);
		intervalID = setInterval(function() {			
			$('#gaga').html(
					randomText[Math.floor(Math.random() * randomText.length)]);
		}, 500);
	});
}

function popup(msg, duration) {
	var message = $('<div />').html(msg).css({
		margin : 0,
		padding : 10,
		background : "#000",
		opacity : 0.7,
		position : "fixed",
		top : 50,
		right : 10,
		fontFamily : 'Tahoma',
		color : '#fff',
		fontSize : 12,
		borderRadius : 12,
		width : 'auto',
		height : 'auto',
		textAlign : 'center',
		textDecoration : 'none',
		display : 'none'
	});

	window.clearTimeout(popupTimer);
	popupTimer = window.setTimeout(function() {
		message.fadeOut(function() {
			message.remove();
			message = null;
		});
	}, duration || 2000);
	if (message)
		message.remove();
	message.appendTo(document.body).fadeIn();
}

/**
 * Handle failure while posting the image to facebook.
 */
function handleAuthTokenError(data) {
	console.log(data.statusText);
	var errorObject = JSON.parse(data.responseText);
	if (errorObject.error.code == 190) {

		// clean the session data
		var url = myDomain + "releasesession.jsp";
		$
				.getJSON(
						url,
						function(data) {
							console.log(data);
							$('#alert-text')
									.html(
											'Facebook said NO! <br/>Just refresh your browser and startover');
							$("#alert").dialog("open");
							cleanButtons();
						});

	} else if (errorObject.error.type == "CurlUrlInvalidException") {
		console.log(errorObject.error.message);
		$('#alert-text').html(
				'Internal Error!<br/>Just refresh your browser and startover');
		$("#alert").dialog("open");
		cleanButtons();
	} else if (errorObject.error.code == 324) {
		// missing image file.
		$('#alert-text')
				.html(
						'Facebook did not accept the photo!<br/>Just refresh your browser and startover');

		$("#alert").dialog("open");
		cleanButtons();

	} else if (errorObject.error.code == 2500) {
		$('#alert-text')
				.html('Your session has expired.<br/> Try and refresh.');
		$("#alert").dialog("open");
	}

	console.log("Error while accessing data from facebook", data);
}

function cleanButtons() {
	clearInterval(intervalID);
	$('#post-button').removeAttr("disabled", "disabled");
	$('#add-comment').removeAttr("disabled", "disabled");
	$('#gaga').hide(500);
	$('canvas').remove();
}

/**
 * To tag photos.
 */
function tagPhotos(data) {

	var postDetails = JSON.parse(data.responseText);

	// to be viewed later via link
	$('#view-on-facebook').attr('href',
			'//www.facebook.com/photo.php?fbid=' + postDetails.id);

	// to save the request identifiers.

	if (Object.keys(taggedFriends).length == 0) {
		checkAllComplete(postDetails);
	}

	for (idx in taggedFriends) {
		// one tag request per friend
		$.ajax({
			type : "POST",
			url : 'https://graph.facebook.com/' + postDetails.id + '/tags/'
					+ idx + "?access_token=" + access_token,
			complete : function(data) {
				taggedFriends[this.payload] = true;
				if (data.readyState == 4 && data.status == 200) {
					console.log("posted tag for ", this.payload, data);

					checkAllComplete(postDetails);
				} else {
					console.log("Error!", data.responseText);
					$('#alert-text').html(
							"An error occured while tagging your friends!");
					$("#alert").dialog("open");
				}
			},
			payload : idx
		});
	}
}
/**
 * Checks for all the pending "Create Tag" requests.
 */
function haveAllBeenTagged() {

	for (i in taggedFriends) {
		if (!taggedFriends[i]) {
			return false;
		}
	}
	return true;
}

function showContentView(){
	if ($('canvas').css('display') != 'none') {
		$('.content').show(1000);
		$('canvas').hide(1000);

		$('.final-actions').hide('clip', {}, 100, function() {
			$('.top-buttons').show(500);
		});
	}
}

/**
 * Triggers the show/hide of relavant controls once the image has been posted to facebook
 * */
function checkAllComplete(postDetails) {
	if (haveAllBeenTagged()) {

		// send the open graph request as well.
		// using http for performance
		//FIXME: Disabling open graph calls due to facebook limitation
		//sendOpenGraphRequest(home+'opengraph/'+ postDetails.id);

		// remove progress indicator and enable the button
		clearInterval(intervalID);
		$('#gaga').hide();

		$('#post-button').removeAttr("disabled", "disabled");
		console.log("Posted on Wall!");
		$('.content').hide(1000);
		$('canvas').show(1000);

		// hide the post button
		$('.top-buttons').hide('clip', {}, 100, function() {
			$('.final-actions').show(500);
		});

		/*
		 * $('#alert-text').html("Posted on your Wall!");
		 * $("#alert").dialog("open");
		 */
		popup("Posted on your Wall", 5000);
		$(document).tooltip();
	}
}
/**
 * This can fail silently.
 */
function sendOpenGraphRequest(postTo) {

	if (postTo == null)
		postTo = home+"opengraph/314";

	$.ajax({
		type : "POST",
		url : "https://graph.facebook.com/me/fakeposts:post",
		data : {
			access_token : access_token,
			fakewall : postTo
		},
		complete : function(data) {
			console.log('Publishing Actions',data);
		}
	});
}

function initCheckBoxes() {

	// tag-friends

	// <div style="position: relative; left: 0; top: 0;"><img
	// src="https://graph.facebook.com/1472940207/picture" style="position:
	// relative; top: 0; left: 0;"/><input type="checkbox" name="1"
	// style="position: absolute; top: 1px; left: 1px;" class="styled"/></div>

	$('#tag-friends').html('');

	var images = $(".dp").toArray();
	tagsExist = false;

	// this map will contain the id of users, so we dont create duplicate
	// elements.
	var imgMap = {};

	for (idx in images) {
		if (images[idx].userid && images[idx].username
				&& imgMap[images[idx].userid] == null) {
			imgMap[images[idx].userid] = true;
			tagsExist = true;
			img = images[idx];
			var content = '<div title="' + img.username
					+ '"><img src="//graph.facebook.com/' + img.userid
					+ '/picture" /><input userid="' + img.userid
					+ '" type="checkbox" name="1" class="styled"/></div>';
			$('#tag-friends').append(content);
		}
	}

	$('input[type=checkbox]').each(
			function() {
				var span = $(
						'<span class="overlay ' + $(this).attr('type') + ' '
								+ $(this).attr('class') + '"></span>').click(
						doCheck).mousedown(doDown).mouseup(doUp);
				if ($(this).is(':checked')) {
					span.addClass('checked');
				}
				$(this).wrap(span).hide();
			});

	function doCheck() {
		if ($(this).hasClass('checked')) {
			$(this).removeClass('checked');
			$(this).children().prop("checked", false);
		} else {
			$(this).addClass('checked');
			$(this).children().prop("checked", true);
		}
	}

	function doDown() {
		$(this).addClass('clicked');
	}

	function doUp() {
		$(this).removeClass('clicked');
	}
}

/**
 * File uploader component is licensed under the following licenses, choose one
 * that suits your needs better. - MIT license
 * 
 * The MIT License (MIT) Copyright (c) 2010 Andrew Valums
 */
function createUploader() {
	uploader = new qq.FileUploader({
		element : document.getElementById('file-uploader-div'),
		action : '/echo',
		debug : true,
		multiple : false,
		sizeLimit : 1024 * 500,
		onComplete : imageUploaded,
		uploadButtonText : '<span id="upload-button">Click to Upload</span>',
		/* button:'ui-button' */
		acceptFiles : 'image/*'
	});

	$('#upload-button').button();

	// $('#upload-button').attr('onmouseover','$(this).toggleClass("ui-state-hover")');

	/*
	 * $('#upload-button').bind('mouseenter mouseleave', function() {
	 * console.log($(this)); $(this).toggleClass('entered'); });
	 */
	/*
	 * $('#upload-button').mouseout(function(){ console.log('out');
	 * this.removeClass('ui-state-hover'); });
	 */

	// ui-state-hover
}

/**
 * Image Upload completed callback.
 */
function imageUploaded(id, fileName, responseJSON) {
	console.log(id, fileName, responseJSON);
	if(!responseJSON.success){
		alert('Image Upload failed. Please try again');
		return;
	}
		
	imageControl.src = responseJSON.data;
	$('#dp_dialog').dialog('close');
	uploader.clearStoredFiles();
	// save image to local storage
	saveImageToLocalStorage(fileName, responseJSON.data);

}

/**
 * Save uploaded image to local storage
 */
function saveImageToLocalStorage(fileName, data) {
	if (localStorage && Storage) {
		if (localStorage['uploads'] == null) {
			localStorage['uploads'] = JSON.stringify({});
		}
		var uploads = JSON.parse(localStorage['uploads']);
		uploads[fileName] = ({
			name : fileName,
			data : data
		});
		localStorage['uploads'] = JSON.stringify(uploads);
		console.log('Wrote ' + fileName + ' to Local Storage');
		// update the dialog.
		addLocalImageToDialog(fileName, data);

	} else {
		alert('Your browser does not support Local Storage');
	}
}

function addLocalImageToDialog(fileName, data) {	
	var uploadedImage = '<div class="uploaded-image" onmouseover="uploadedImageMouseOver(this)" onmouseout="uploadedImageMouseOut(this)"'
			+ 'onclick="setUploadedImage(this)">'
			+ '<i class="remove-uploaded-image" onclick=\'removeUploadedImage("'
			+ fileName + '",this)\'></i><img src="' + data + '" />' + '</div>';

	$('#uploaded').append(uploadedImage);
}

/**
 * Save the fake wall to local storage
 */
function saveWallToLocalStorage(wallName) {
	var name=null;
	if(wallName==null)
		name = window.prompt('Enter name of the Fake Wall');
	else  name=wallName;
	
	if (name != null && name != '') {
		if (localStorage && Storage) {
			// initializing variables.
			if (localStorage['walls.list'] == null) {
				localStorage['walls.list'] = JSON.stringify([]);
			}
			if (localStorage['walls.all'] == null) {
				localStorage['walls.all'] = JSON.stringify([]);
			}

			// name=name.replace(/\|/g,'_'); //replacing all | with _
			var wallList = JSON.parse(localStorage['walls.list']);
			var allWalls = JSON.parse(localStorage['walls.all']);
			var idx = wallList.indexOf(name);
			if (idx != -1) {
				if (window
						.confirm('Wall already exists by the same name. Overwrite?')) {
					// localStorage['walls.'+name]=lzw_encode($('#wrapper').html());

					allWalls[idx] = ({
						data : lzw_encode($('#wrapper').html()),
						when : (new Date()).toLocaleString(),
						user : userObject,
						name : name,
					/* index : idx */
					});

				} else {
					saveWallToLocalStorage();
				}
			} else {
				idx = wallList.push(name) - 1;
				allWalls[idx] = ({
					data : lzw_encode($('#wrapper').html()),
					when : (new Date()).toLocaleString(),
					user : userObject,
					name : name,
				/* index : idx */
				});
			}
			localStorage['walls.all'] = JSON.stringify(allWalls);
			localStorage['walls.list'] = JSON.stringify(wallList);
			console.log('Saved Wall \"' + name + '\" to Local Storage');
			popup('Fake Wall "' + name + '" saved.', 2000);

		} else {
			alert('Your browser does not support local storage.');
		}
	}
}

/**
 * Compression/Decompression Functions
 * 
 */
// LZW-compress a string
function lzw_encode(s) {
	var dict = {};
	var data = (s + "").split("");
	var out = [];
	var currChar;
	var phrase = data[0];
	var code = 256;
	for ( var i = 1; i < data.length; i++) {
		currChar = data[i];
		if (dict[phrase + currChar] != null) {
			phrase += currChar;
		} else {
			out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
			dict[phrase + currChar] = code;
			code++;
			phrase = currChar;
		}
	}
	out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
	for ( var i = 0; i < out.length; i++) {
		out[i] = String.fromCharCode(out[i]);
	}
	return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
	var dict = {};
	var data = (s + "").split("");
	var currChar = data[0];
	var oldPhrase = currChar;
	var out = [ currChar ];
	var code = 256;
	var phrase;
	for ( var i = 1; i < data.length; i++) {
		var currCode = data[i].charCodeAt(0);
		if (currCode < 256) {
			phrase = data[i];
		} else {
			phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
		}
		out.push(phrase);
		currChar = phrase.charAt(0);
		dict[code] = oldPhrase + currChar;
		code++;
		oldPhrase = phrase;
	}
	return out.join("");
}

function showHistory() {
	$('#saved_wall_content').html('');
	var any = false;
	if (localStorage && Storage && localStorage['walls.all']) {
		$
				.each(
						JSON.parse(localStorage['walls.all']),
						function(index, item) {
							if (item != null) {
								any = true;

								var template = '<div class="comment">'
										+ '<div>'
										+ '<img class="comment-dp dp  " src="resources/archive.png" />'
										+ '</div>'
										+ '<i class="remove-comment" title="Remove" onclick="deleteWallFromLocalHistory('
										+ index
										+ ',this)"></i>'
										+ '<i class="edit-wall" title="Show" onclick="loadSavedWall('
										+ index
										+ ')"></i>'
										+ '<div class="comment-content">'
										+ '<span class="name-user  ">Archived</span> <span class="comment-text  ">'
										+ item.name
										+ '</span> <br /> <span'
										+ ' class="timestamp"> '
										+ item.when
										+ ' '
										+ (item.data.length / 1024).toFixed(2)
										+ ' KB</span> <span class="link">Like</span>'
										+ '<div class="comment-likes likes">'
										+ '<span class="link  ">You</span> <span class=" "> like this.</span>'
										+ '</div>' + '</div>' + '</div>';
								$('#saved_wall_content').append(template);
							}
						});
	}
	if (!any) {
		$('#saved_wall_content').append('<p>No walls saved</p>')
	}
	$('#saved_walls').dialog('open');
}

/**
 * Deletes the wall from local storage
 */
function deleteWallFromLocalHistory(index, obj) {
	if (localStorage && Storage) {
		var list = JSON.parse(localStorage['walls.list']);
		var walls = JSON.parse(localStorage['walls.all']);
		list.pop(index);
		walls.pop(index);
		localStorage['walls.list'] = JSON.stringify(list);
		localStorage['walls.all'] = JSON.stringify(walls);
		// console.log(obj);
		$(obj).parent().hide(500, function() {
			$(this).remove();
		});
		// $(obj).parent().remove();
	} else {
		alert("Your browser does not support Local Storage");
	}
}

/**
 * 
 * Load a Saved Wall
 */
function loadSavedWall(index) {
	var wallList = JSON.parse(localStorage['walls.all']);
	wall = wallList[index];
	$('#wrapper').html(lzw_decode(wall.data));
	$('#saved_walls').dialog('close');
	showContentView();
}

function uploadedImageMouseOver(src) {
	$(src).find('.remove-uploaded-image').addClass(
			'remove-uploaded-image-div-hover');
}

function uploadedImageMouseOut(src) {
	$(src).find('.remove-uploaded-image').removeClass(
			'remove-uploaded-image-div-hover');
}

/**
 * Remove the image from Local Storage
 */
function removeUploadedImage(imageName,obj) {

	if (localStorage && Storage) {
		var uploads = JSON.parse(localStorage['uploads']);
		delete uploads[imageName];
		localStorage['uploads'] = JSON.stringify(uploads);
		console.log('deleted ' + imageName);
		$(obj).parent().remove();
		console.log(event);
		event.cancelBubble=true;

	} else {
		alert('Your browser does not support Local Storage');
	}
}
function setUploadedImage(div) {
	imageControl.src = $(div).find('img').attr('src');
	$('#dp_dialog').dialog('close');
}
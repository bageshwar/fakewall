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
var fdata=[];

/**
 * Name-Value for id against username.
 * To be used to fetch Image URL.
 * */
var fmap={};

/**
 * Array of random text fetched from the server
 * */
var randomText;

/**
 * Holds the ID of the timer to show random text
 * */
var intervalID;

/**
 * Holds the ID of the timer used for popups
 * */
var popupTimer;

/**
 * Map to store the friends that will be tagged.
 * */
var taggedFriends={};

/**
 * The current user.
 * */
var userObject;

/**
 * 
 * */
var myDomain="/";

/**
 * The canvas object.
 */
var pageCanvas;

/**
 * Global Flag to check whether any friends have been tagged or not.
 * */
tagsExist=false;

$(document).ready(function() {	
	
	//load the list of friends
	loadFriends();
	
	// dialogs
	buildDialogs();

	// event handlers
	registerEventHandlers();

	
	$( "#tabs" ).tabs();
	
	$(document).tooltip({
		hide:50
	});	
});


/**
 * Builds the 2 dialogs 1. For editing any span on the page. 2. For providing
 * URL to any image on the page.
 * 1 more dialog to show alerts.
 */
function buildDialogs() {
	// Span dialogs
	$("#comment_dialog").dialog({
		modal : true,
		autoOpen : false,
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
				spanControl.innerHTML = $('#enter_comment').val();
				isPopupCancelled = true; // resetting flag
			}
		},

	});

	// animated text area
	$('#enter_comment').autosize({
		append : "\n"
	});

	// Image Dialog
	$("#dp_dialog").dialog({
		modal : true,
		autoOpen : false,
		width: '500px',
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
				
				//priority to text present in name field,
				if($('#friend').val()!=null && $('#friend').val()!=''){
					//save the name of the friend as to be tagged					
					imageControl.userid=fmap[$('#friend').val()];
					imageControl.username=$('#friend').val();
					
					//add image src
					imageControl.src='https://graph.facebook.com/'+fmap[$('#friend').val()]+'/picture';
					
					//set the name
					$(imageControl).parent().parent().find('.name-user').html(($('#friend').val()));
					
					//reset the textbox value
					$('#friend').val('');				
					
				}
				else {
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
	
	//alert dialog
	myddd=$("#alert").dialog({
		modal : true,
		autoOpen : false,
		buttons : {
			"OK":function(){
				$(this).dialog("close");
			}
		}
	});
	
	$('#tag-selector').dialog({
		modal:true,
		autoOpen :false,
		width:'600px',
		buttons:{
			"OK":initPostToFacebook
		}
	});
}

function initPostToFacebook(){
	
		$('#tag-selector').dialog('close');
		taggedFriends={};
		$('input[type=checkbox]').each(function(){
			if($(this).attr("checked") ){
				taggedFriends[$(this).attr('userid')]=false;
			}
		});
		console.log("Tagged Friends",taggedFriends);
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
		initCheckBoxes();
		//if no one is to be tagged, directly post to facebook.
		if(tagsExist){
		$('#tag-selector').dialog('open');
		}else {
			initPostToFacebook();
		}
	});
	
	//button to view the post on facebook
	$('#view-on-facebook').button().click(function(){
		window.location.href=$('#view-on-facebook').attr('href');
	});
	
	//button to create a new fakewall
	$('#create-new').button().click(function(){
		window.location.reload();
	});
	
	// generating canvas element
	$('#generate_canvas').button().click(function(event) {
		
		//hiding the delete icon from comments
		$('i.remove-comment').hide();

		h2cSelector = $('#wrapper');

		if (window.setUp) {
			console.log('setting up windows');
			window.setUp();
		}

		pageCanvas = $(h2cSelector).html2canvas({
			flashcanvas : "resources/flashcanvas.min.js",
			logging : true,
			profile : false,
			useCORS : true,
			onComplete : function() {
				
				// $('dp_dialog').css('display','none');
				$('div[role="dialog"]').css('display', 'none');
				$('ul[role="listbox"]').css('display','none');
				$('#post').css('display', 'block');
				/*$('#post').css('position', 'absolute');
				$('#post').css('top', $('canvas').css('height'));*/
				$('canvas').tooltip({track:true});

			},
			onHide : function() {
				// $('div[role="dialog"]').css('display','none');
				console.log('hiding');
			}
		});		
	});
	
	
	$('#cancel-preview').button().click(function(){
		//alert("hi");
		$('canvas').remove();
		//$('canvas').hide();
		$('#content').show();
		$('#post').hide();
		h2cSelector=null;
	});
			
}

function spanDoubleClicked(event) {
	// populate the text in the popup
	$('#enter_comment').val(event.srcElement.innerHTML);
	// setting the currently being edited span
	spanControl = event.srcElement;
	$("#comment_dialog").dialog("open");
	$('#enter_comment').focus();
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

	var url = 'https://graph.facebook.com/me/photos?access_token=';	
	
	//progress indicator
	doRandomText();
	
	$.ajax({
				type : "POST",
				url :  myDomain + "saveimage",
				data : {
					image : $('canvas')[0].toDataURL(),
					user:userObject
				},
				success : function(data) {					
					console.log('image saved success', data.path);					
					$.ajax({
								type : "POST",
								url : "https://graph.facebook.com/me/photos",
								data : {
									message : "Fake Wall App",
									url :    "https://fakewallapp.appspot.com/getimage?path=" + data.path,
									/*url:'http://fakewallapp.appspot.com/resources/beta_test.jpg',*/
									access_token : access_token,
									format : "json",									
								},								
								complete : function(data) {																	
									if (data.readyState == 4 && data.status==200) {										
										tagPhotos(data);										
									}else {										
										handleAuthTokenError(data);
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
	
	$('#post-button').attr("disabled", "disabled");
}


function loadFriends(){
	
	
	$.getJSON("https://graph.facebook.com/me?access_token="+access_token,function(data){
		
		console.log("User Object",data);
		userObject=data;
		$('#user').html(userObject.first_name);
		$('#user-dp').attr("src","https://graph.facebook.com/"+userObject.id+"/picture");
		$('#user-dp').css('display','inline');
		var url="https://graph.facebook.com/me/friends?limit=5000&access_token="+access_token;		
		$.getJSON(url, function(data) {
			//mdata=data;
			for(i in data.data){
				fdata[i]=data.data[i].name;
				fmap[data.data[i].name]=data.data[i].id;
			}
			
			fdata[data.data.length]=userObject.name;
			fmap[userObject.name]=userObject.id;
			$( "#friend" ).autocomplete({
		        source: fdata,
		        delay:10
		    });
			console.log("friend list loaded");
			popup("Facebook Friend List Loaded",3000);
		}).error(function(data){
			//handleAuthTokenError(data);		
			var error=$.parseJSON(data.responseText);
			console.warn(error);
			if(error.error.code==190 || error.error.code==2500){
				console.log("Auth expired")
				handleAuthTokenError(data);
			}
			
		});
		
	}).error(function(data){
		//handleAuthTokenError(data);		
		var error=$.parseJSON(data.responseText);
		console.warn(error);
		if(error.error.code==190 || error.error.code==2500){
			console.log("Auth expired")
			handleAuthTokenError(data);
		}
		
	});	
		
}

function doRandomText(){
	
	var url=myDomain+"randomtext";
	$.getJSON(url, function(data) {
		randomText=data;
		console.log("Random Text",data);
		intervalID=setInterval(function(){
			$('#gaga').html(randomText[Math.floor(Math.random()*randomText )]);
		},500);
	});	
}

function popup(msg,duration){
	var message = $('<div />').html(msg).css({
        margin:0,
        padding:10,
        background: "#000",
        opacity:0.7,
        position:"fixed",
        top:50,
        right:10,
        fontFamily: 'Tahoma',
        color:'#fff',
        fontSize:12,
        borderRadius:12,
        width:'auto',
        height:'auto',
        textAlign:'center',
        textDecoration:'none',
        display:'none'
    });
	
    window.clearTimeout(popupTimer);
    popupTimer = window.setTimeout(function(){
        message.fadeOut(function(){
            message.remove();
            message = null;
        });
    },duration || 2000);
    if (message)
        message.remove();
   message.appendTo(document.body).fadeIn();    
}

/**
 * Handle failure while posting the image to facebook.
 * */
function handleAuthTokenError(data){
	console.log(data.statusText);
	var errorObject=JSON.parse(data.responseText);	
	if(errorObject.error.code==190){
		
		//clean the session data
		var url=myDomain +"releasesession.jsp";
		$.getJSON(url, function(data) {
			console.log(data);
			$('#alert-text').html('Facebook said NO! <br/>Just refresh your browser and startover');										
			$("#alert").dialog("open");
			clearInterval(intervalID);
			$('#post-button').removeAttr("disabled", "disabled");
		});
		
	}else if(errorObject.error.type=="CurlUrlInvalidException"){
		console.log(errorObject.error.message);
		$('#alert-text').html('Internal Error!<br/>Just refresh your browser and startover');										
		$("#alert").dialog("open");
		clearInterval(intervalID);
		$('#post-button').removeAttr("disabled", "disabled");
	}else if(errorObject.error.code==324){
		//missing image file.
		$('#alert-text').html('Facebook did not accept the photo!<br/>Just refresh your browser and startover');
		
		$("#alert").dialog("open");
		clearInterval(intervalID);
		$('#gaga').html('');
		$('#post-button').removeAttr("disabled", "disabled");
		
	}else if(errorObject.error.code==2500){
		$('#alert-text').html('Your session has expired.<br/> Try and refresh.');		
		$("#alert").dialog("open");
	}
	
	console.log("Error while accessing data from facebook",data);
}

/**
 * To tag photos.
 * */
function tagPhotos(data){
	
	var postDetails=JSON.parse(data.responseText);
	
	//to be viewed later via link
	$('#view-on-facebook').attr('href','//www.facebook.com/photo.php?fbid='+postDetails.id);	
	
	//to save the request identifiers.	
		
	if(Object.keys(taggedFriends).length==0){
		checkAllComplete();
	}
	
	for(idx in taggedFriends){				
			//one tag request per friend
			$.ajax({
				type : "POST",
				url : 'https://graph.facebook.com/'+postDetails.id+'/tags/'+idx+"?access_token="+access_token,
				complete:function(data){
					taggedFriends[this.payload]=true;
					if(data.readyState == 4 && data.status==200 ){
						console.log("posted tag for ",this.payload,data);				
						
						checkAllComplete();
					}else {
						console.log("Error!",data.responseText);										
						$('#alert-text').html("An error occured while tagging your friends!");										
						$("#alert").dialog("open");
					}
					},
				payload:idx
				});		
	}	
}
/**
 * Checks for all the pending "Create Tag" requests.
 * */
function haveAllBeenTagged(){
	
	for(i in taggedFriends){
		if(!taggedFriends[i]){
			return false;
		}
	}
	return true;
}

function checkAllComplete(){
	if(haveAllBeenTagged()){
		//remove progress indicator and enable the button
		clearInterval(intervalID);
		$('#post-button').removeAttr("disabled", "disabled");	
		console.log("Posted on Wall!");
		
		//hide the post button
		$('#post').css('display','none');
		
		//display a link to the post							
		/*$('#final-actions').css('position', 'absolute');
		$('#final-actions').css('top', $('canvas').css('height'));*/
		$('#final-actions').css('display','block');
		$('#alert-text').html("Posted on your Wall!");										
		$("#alert").dialog("open");
	}
}

function initCheckBoxes() {
	
	//tag-friends
	
	//<div style="position: relative; left: 0; top: 0;"><img src="https://graph.facebook.com/1472940207/picture" style="position: relative; top: 0; left: 0;"/><input type="checkbox" name="1" style="position: absolute; top: 1px; left: 1px;" class="styled"/></div>

	$('#tag-friends').html('');
	
	var images=$(".dp").toArray();
	tagsExist=false;
	
	//var ol=$('<ol class="selectable"></ol>');
		
	for(idx in images){
		if(images[idx].userid && images[idx].username){
			tagsExist=true;
			img=images[idx];
			var content='<div title="'+img.username+'"><img src="//graph.facebook.com/'+img.userid+'/picture" /><input userid="'+img.userid+'" type="checkbox" name="1" class="styled"/></div>'; 
			$('#tag-friends').append(content);
		}
	}
	
	
    $('input[type=checkbox]').each(function() {
        var span = $('<span class="overlay ' + $(this).attr('type') + ' ' + $(this).attr('class') + '"></span>').click(doCheck).mousedown(doDown).mouseup(doUp);
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

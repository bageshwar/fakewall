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
var taggedFriends=[];

$(document).ready(function() {

	//load the list of friends
	//loadFriends();
	
	// dialogs
	buildDialogs();

	// event handlers
	registerEventHandlers();

	
	$( "#tabs" ).tabs();
});

/**
 * The canvas object.
 */
var pageCanvas;

/**
 * Builds the 2 dialogs 1. For editing any span on the page. 2. For providing
 * URL to any image on the page.
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
				if($('#friend').val()!=null || $('#friend').val()!=''){
					imageControl.src='http://graph.facebook.com/'+fmap[$('#friend').val()]+'/picture';
					$(imageControl).parent().parent().find('.name-user').html(($('#friend').val()));
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
	$("#alert").dialog({
		modal : true,
		autoOpen : false,
		buttons : {
			"OK":function(){
				$(this).dialog("close");
			}
		}
	});
}

/**
 * Registers event handles for 1. All SPAN elements on the page 2. All IMG
 * elements on the page.
 */
function registerEventHandlers() {
	
	/**
	 * <pre>
	 * // adding event handler for all span
	 * $('span').click(function(event, owner) {
	 * 	// populate the text in the popup
	 * 	$('#enter_comment').val(event.srcElement.innerHTML);
	 * 	// setting the currently being edited span
	 * 	spanControl = event.srcElement;
	 * 	$(&quot;#comment_dialog&quot;).dialog(&quot;open&quot;);
	 * });
	 * 
	 * // adding event handler for all images
	 * $('img').click(function(event, owner) {
	 * 	imageClicked(event);
	 * });
	 * </pre>
	 */

	// for adding comment
	$('#add-comment').button().click(function(event) {
		$('#response').append(commentTemplate);

	});

	$('#post-button').button().click(function() {
		postToFacebook();
	});
	
	// generating canvas element
	$('#generate_canvas').button().click(function(event) {

		h2cSelector = $('#wrapper');

		if (window.setUp) {
			window.setUp();
		}

		pageCanvas = $(h2cSelector).html2canvas({
			flashcanvas : "resources/flashcanvas.min.js",
			logging : true,
			profile : true,
			useCORS : true,
			onComplete : function() {
				console.log("completed");
				// $('dp_dialog').css('display','none');
				$('div[role="dialog"]').css('display', 'none');
				$('ul[role="listbox"]').css('display','none');
				$('#post').css('display', 'block');
				$('#post').css('position', 'absolute');
				$('#post').css('top', $('canvas').css('height'));

			},
			onHide : function() {
				// $('div[role="dialog"]').css('display','none');
				console.log('hiding');
			}
		});		
		// $('dp_dialog').css('display','none');
		// $('div[role="dialog"]').css('display','none');
	});
	
	//random text button
	
}

function spanDoubleClicked(event) {
	// populate the text in the popup
	$('#enter_comment').val(event.srcElement.innerHTML);
	// setting the currently being edited span
	spanControl = event.srcElement;
	$("#comment_dialog").dialog("open");
}

function imageClicked(event) {
	// populate the text in the popup
	$('#dp_url').val(event.srcElement.innerHTML);
	// setting the currently being edited image
	imageControl = event.srcElement;
	$("#dp_dialog").dialog("open");
}

function deleteComment(event) {
	console.log(event.srcElement.parentElement.outerHTML = '');
}

var errorObject;
/**
 * Called to post the image to facebook.
 */
function postToFacebook() {

	access_token='AAAD33nCJmSIBAF7W9L9o5TsxmouiIuL4UJba7LUkAQtSrVhlZBcbSb2EzpbO7FuevqjnlrDGNeokSOT4vvthZB4fZC9j7kg6vx79t5IMZBVeEFYqa04l';
	
	var url = 'https://graph.facebook.com/me/photos?access_token=';	
	var host = "https://fakewallapp.appspot.com";
	host = "http://localhost:8888";
	$.ajax({
				type : "POST",
				url :  host + "/saveimage",
				data : {
					image : $('canvas')[0].toDataURL()
				},
				success : function(data) {					
					console.log('image saved success', data.path);					
					$.ajax({
								type : "POST",
								url : "https://graph.facebook.com/me/photos",
								data : {
									message : "Fake Wall App",
									/*url :  host + "/getimage?path=" + data.path,*/
									url:'http://fakewallapp.appspot.com/resources/beta_test.jpg',
									access_token : access_token,
									format : "json"
								},								
								complete : function(data) {
									//remove progress indicator and enable the button
									clearInterval(intervalID);
									$('#post-button').removeAttr("disabled", "disabled");									
									if (data.readyState == 4 && data.status==200) {
										console.log("Posted on Wall!");										
										$('#alert-text').html("Posted on your Wall!");										
										$("#alert").dialog("open");
										//popup("Posted to Facebook")
										//window.location.reload();
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
	//progress indicator
	doRandomText();
	$('#post-button').attr("disabled", "enabled");
}


function loadFriends(){
	
	var url="https://graph.facebook.com/me/friends?limit=5000&access_token="+access_token;
	
	$.getJSON(url, function(data) {
		//mdata=data;
		for(i in data.data){
			fdata[i]=data.data[i].name;
			fmap[data.data[i].name]=data.data[i].id;
		}
		
		$( "#friend" ).autocomplete({
	        source: fdata,
	        delay:10
	    });
		console.log("initialized");
	});
		
}

function doRandomText(){
	
	url="http://localhost:8888/randomtext";
	$.getJSON(url, function(data) {
		randomText=data;
		console.log(data);
		intervalID=setInterval(function(){
			$('#gaga').html(randomText[Math.floor(Math.random()*5 )]);
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
        top:10,
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
	errorObject=JSON.parse(data.responseText);	
	if(errorObject.error.code==190){
		
		//clean the session data
		url="http://localhost:8888/releasesession.jsp";
		$.getJSON(url, function(data) {
			console.log(data);
			$('#alert-text').html('Facebook said NO! <br/>Just refresh your browser and startover');										
			$("#alert").dialog("open");
		});
		
	}else if(errorObject.error.type=="CurlUrlInvalidException"){
		console.log(errorObject.error.message);
		$('#alert-text').html('Internal Error!<br/>Just refresh your browser and startover');										
		$("#alert").dialog("open");
	}
	
	console.log("Error while posting to facebook",data);
}

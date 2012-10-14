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

$(document).ready(function() {

	// dialogs
	buildDialogs();

	// event handlers
	registerEventHandlers();

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
				imageControl.src = $('#dp_url').val();
				isPopupCancelled = true; // resetting flag
			}
		},

	});

	// animated text area
	$('#dp_url').autosize({
		append : "\n"
	});
}

/**
 * Registers event handles for 1. All SPAN elements on the page 2. All IMG
 * elements on the page.
 */
function registerEventHandlers() {
	// on click handler for dialog
	$('#but').click(function() {

		$("#comment_dialog").dialog("open");

	});

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
	$('#add-comment').click(function(event) {
		$('#response').append(commentTemplate);

	});

	// generating canvas element
	$('#generate_canvas').click(function(event) {
		
		h2cSelector =  $('#wrapper') ;

		if (window.setUp) {
			window.setUp();
		}
		
		pageCanvas=$(h2cSelector).html2canvas({
             flashcanvas: "resources/flashcanvas.min.js",
             logging: true,
             profile: true,
             useCORS: true,
             onComplete:function(){
            	 console.log("completed");
     			//$('dp_dialog').css('display','none');
     			$('div[role="dialog"]').css('display','none');
     			$('#post').css('display','block');
     			$('#post').css('position','absolute');
     			$('#post').css('top',$('canvas').css('height'));   			
     				
             },
             onHide:function(){
            	 //$('div[role="dialog"]').css('display','none');
            	 console.log('hiding');
             }
         });
		
		$('#post').click(function(){
			postToFacebook();
		});
		
		//$('dp_dialog').css('display','none');
		//$('div[role="dialog"]').css('display','none');
	});
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


/**
 * Called to post the image to facebook.
 * */
function postToFacebook(){
	
	var url='https://graph.facebook.com/me/photos?access_token=';
	var token=$('#code').val();
	var host="fakewallapp.appspot.com";
	//host="localhost:8888";
		$.ajax({
		type : "POST",
		url : "http://" + host + "/saveimage",
		data : {
			image : $('canvas')[0].toDataURL(),
			token : token
		},
		success : function(data) {
			console.log('image saved success', data.path);
			$.ajax({
				type : "POST",
				url : "https://graph.facebook.com/me/photos",
				data : {
					message : "Fake Wall App",
					url : "https://fakewallapp.appspot.com/getimage?path="
							+ data.path,
					access_token : token,
					format : "json"
				},
				success : function(data) {
					console.log("Posted on Wall!");
				}
			});
		},
		complete : function(data) {
			console.log('posted on facebook', data);
		},
		error : function(data) {
			console.log('error while posting', data);
		}
	});	
	
		
		/*
		 * $.ajax({ type: "POST", url: "https://graph.facebook.com/me/photos",
		 * data: { message: "Fake Wall App", url:
		 * "http://sourceforge.net/p/sogo-zeg/icon", access_token: token,
		 * format: "json" }, success: function(data){ alert("POST SUCCESSFUL"); }
		 * });
		 */
		
}
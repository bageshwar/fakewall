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

	/*// adding event handler for all span
	$('span').click(function(event, owner) {
		// populate the text in the popup
		$('#enter_comment').val(event.srcElement.innerHTML);
		// setting the currently being edited span
		spanControl = event.srcElement;
		$("#comment_dialog").dialog("open");
	});

	// adding event handler for all images
	$('img').click(function(event, owner) {
		imageClicked(event);
	});*/

	// for adding comment
	$('#add-comment').click(function(event) {
		console.log($('#response').append(commentTemplate));

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

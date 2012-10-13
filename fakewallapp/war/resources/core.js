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

(function($) {

	Like = Backbone.Model.extend({
		// Model for a Like
		string : "1 person"
	});

	Comment = Backbone.Model.extend({
		// Create a model to hold friend attribute
		like : new Like(),
		text : "",
		timestamp : new Date(),
		image : "",
		name : "Character"
	});

	Comments = Backbone.Collection.extend({
		// This is our Comments collection and holds our Comments models
		initialize : function(models, options) {
			this.bind("add", options.view.addComment);
			// handler for adding a new comment
		}
	});

	AppView = Backbone.View.extend({
		el : $("body"),
		initialize : function() {
			this.comments = new Comments(null, {
				view : this
			});
			// Create a comments collection when the view is initialized.
			// Pass it a reference to this view to create a connection between
			// the two
		},
		events : {
			"click #add-comment" : "showPrompt",
		},
		showPrompt : function() {
			var friend_name = prompt("Who is your friend?");
			var friend_model = new Comment({
				text : friend_name
			});
			// Add a new friend model to our friend collection
			this.comments.add(friend_model);
		},
		addComment : function(model) {
			// The parameter passed is a reference to the model that was added
			$("#comment-list").append("<li>" + model.get('text') + "</li>");
			// Use .get to receive attributes of the model
		}
	});

	var appview = new AppView;

})(jQuery);

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

	// adding event handler for all span
	$('span').dblclick(function(event, owner) {

		// populate the text in the popup
		$('#enter_comment').val(event.srcElement.innerHTML);
		// setting the currently being edited span
		spanControl = event.srcElement;
		$("#comment_dialog").dialog("open");
	});

	// adding event handler for all image

	$('img').dblclick(function(event, owner) {

		// populate the text in the popup
		$('#dp_url').val(event.srcElement.innerHTML);
		// setting the currently being edited image
		imageControl = event.srcElement;
		$("#dp_dialog").dialog("open");
	});
}

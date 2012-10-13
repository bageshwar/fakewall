/**
 * This script contains all the core Models and Controllers to be used by
 * fakewallapp.
 * 
 * @author Bageshwar P Narain
 * 
 */

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

	// dialog
	$("#forgot-dialog").dialog({
		modal : true,
		autoOpen : false,
		/*
		 * show:'slide', hide:'slide',
		 */
		buttons : {
			"Add" : function() {
				addComments($('#enter_comment').val());
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
	});

	//on click handler for dialog
	$('#but').click(function() {
		$("#forgot-dialog").dialog("open");
	});
	
	//animated text area
	$('#enter_comment').autosize({
		append : "\n"
	});
});

var myDialog;
function showDialog() {
	// alert("hi")
	// console.log($( "#forgot-dialog" ).dialog( "open" ));
	// alert("bye");
}

function addComments(object) {
	console.log(object);
}
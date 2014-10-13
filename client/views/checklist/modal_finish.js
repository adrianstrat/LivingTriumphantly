Template.modalFinish.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var goalId = Session.get("goal_id");
		var triumph = {
			body: $(e.target).find('[name=finishTriumph]').val(),
			link: $(e.target).find('[name=finishLink]').val(),
			goalId: goalId,
		};
		Meteor.call('submitTriumph', triumph, function(error, id){
			if (error)
				return alert(error.reason);
			$('#modalFinish').modal('hide');
			Router.go('goalPage', {_id: goalId});
		});
	    return;
	}
});
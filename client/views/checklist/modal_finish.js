Template.modalFinish.events({
	/**
	 * @desc evalutes the submitted triumph, on success saves it and routes
	 *  the user to the related goal page
	 * @param e - the submitted item
	 * @return string - error reason if any
	 */
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
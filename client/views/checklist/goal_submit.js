Template.goalSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var goal = {
			summary: $(e.target).find('[name=summary]').val(),
			image: $(e.target).find('[name=image]').val(),
			detail: $(e.target).find('[name=detail]').val()
		};
		
		Meteor.call('submit', goal, function(error, id){
			if (error)
				return alert(error.reason);
			Router.go('goalPage', {_id: id});
		});
		
	}
});
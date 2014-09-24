Template.itemSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var item = {
			summary: $(e.target).find('[name=summary]').val(),
			detail: $(e.target).find('[name=detail]').val()
		};
		
		Meteor.call('submit', item, function(error, id){
			if (error)
				return alert(error.reason);
			Router.go('itemPage', {_id: id});
		});
		
	}
});
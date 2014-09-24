Template.item.helpers({
	inList: function() {
		//evaluates true if item key is in user's userList
		inUserListOpen = function(){
			Meteor.user().listUser.indexOf(this._id) >= 0;
		};
		inUserListClosed = function() {
			Meteor.user().userDone.indexOf(this._id) >= 0;
		};
		return (inUserListOpen||inUserListClosed);
	}
});

Template.item.events({
	'click .btn' : function(e) {
		var clickedButton = e.currentTarget;
		var itemId = $(clickedButton).val();
		Meteor.call('addItem', Meteor.user()._id, itemId, function(error, id){
			if (error)
				return alert(error.reason);
		});
	    return;
	  }
});
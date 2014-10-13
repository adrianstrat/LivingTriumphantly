Template.goal.helpers({
	inUserListOpen: function(){
		return Meteor.user().userList.indexOf(this._id) >= 0;
	},
	inUserListClosed: function() {
		return Meteor.user().userDone.indexOf(this._id) >= 0;
	},
	inList: function() {
		var goalId = this._id;
		function inUserListOpen() {
			return Meteor.user().userList.indexOf(goalId) >= 0;
		};
		function inUserListClosed() {
			return Meteor.user().userDone.indexOf(goalId) >= 0;
		};
		return (inUserListOpen()||inUserListClosed());
	},
	triumphsCount: function() {
		return Triumphs.find({goalId: this._id}).count();
	}
});

Template.goal.events({
	'click #addGoal' : function(e) {
		var clickedButton = e.currentTarget;
		var goalId = $(clickedButton).val();
		Meteor.call('addGoal', Meteor.user()._id, goalId, function(error, id){
			if (error)
				return alert(error.reason);
		});
	    return;
	  },
	'click #finishGoal' : function(e) {
		var clickedButton = e.currentTarget;
		var goalId = $(clickedButton).val();
		Session.set("goal_id", goalId); 
	}
});
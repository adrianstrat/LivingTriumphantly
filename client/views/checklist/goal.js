Template.goal.helpers({
	inUserListOpen: function(){
		//checks if the goal is in the personal user list
		return Meteor.user().userList.indexOf(this._id) >= 0;
	},
	inUserListClosed: function() {
		//checks if the goal is in the finished user list
		return Meteor.user().userDone.indexOf(this._id) >= 0;
	},
	triumphsCount: function() {
		//returns a count of the number of triumphs for a goal
		return Triumphs.find({goalId: this._id}).count();
	}
});

Template.goal.events({
	'click #addGoal' : function(e) {
		//adds a goal to logged on user's personal list
		var clickedButton = e.currentTarget;
		var goalId = $(clickedButton).val();
		Meteor.call('addGoal', Meteor.user()._id, goalId, function(error, id){
			if (error)
				return alert(error.reason);
		});
	    return;
	  },
	'click #finishGoal' : function(e) {
		//moves a goal from the logged on user's list to finished
		var clickedButton = e.currentTarget;
		var goalId = $(clickedButton).val();
		Session.set("goal_id", goalId); 
	}
});
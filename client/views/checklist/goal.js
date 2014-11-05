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
	},
	upVoteLink: function() {
		var userId = Meteor.user()._id;
		if (this.upvoters.indexOf(userId)> -1){
			return "http://localhost:3000/thumb-up-dark_32.png";
		} else {
			return "http://localhost:3000/thumb-up_32.png";
		}
	},
	upVoteId: function() {
		var userId = Meteor.user()._id;
		if (this.upvoters.indexOf(userId)> -1){
			return "noVote";
		} else {
			return "upVote";
		}
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
	},
	'click #upVote': function(e) {
		var goalId = this._id;
		Meteor.call('upVote', Meteor.user()._id, goalId, function(error, id){
			if (error)
				return alert(error.reason);
		});
	    return;
	}
});
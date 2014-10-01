Meteor.startup( function () {
	Session.set("userGoalView", "userGoalOpen");
});

Template.goalPersonal.helpers({
	goals: function() {
		if (Session.get("userGoalView") == "userGoalOpen") {
			return Goals.find({_id: {$in: Meteor.user().userList}});
		} else {
			return Goals.find({_id: {$in: Meteor.user().userDone}});
		}
	},
	userGoalOpen: function() {
		return Session.get("userGoalView") == "userGoalOpen";
	},
	userGoalClosed: function() {
		return Session.get("userGoalView") == "userGoalClosed";
	}
});

Template.goalPersonal.events({
	'click .userGoalView': function(e, t) {
		var userGoalView = e.target.getAttribute("name");
		Session.set("userGoalView", userGoalView);
		console.log(userGoalView);
		return
	}
});
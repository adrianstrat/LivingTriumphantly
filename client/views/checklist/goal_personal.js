Meteor.startup( function () {
	//sets the value of userGoalView on page load
	Session.set("userGoalView", "userGoalOpen");
});

Template.goalPersonal.helpers({
	goals: function() {
		//based on value of userGoalView displays open or completed goals
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
	'click #view': function(e) {
		/**
		 * @desc changes session value "userGoalView" based on clicked item
		 * @params e - selected item
		 * @return None
		 */
		var userGoalView = e.target.getAttribute("name");
		Session.set("userGoalView", userGoalView);
		console.log(userGoalView);
		return
	}
});
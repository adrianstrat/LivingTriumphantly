Goals = new Meteor.Collection('goals');

Meteor.methods({
	submit: function(goalAttributes) {
		var user = Meteor.user(),
			goalWithSameSummary = Goals.findOne({summary: goalAttributes.summary});
	
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post an goal");
	
		// ensure the item has a description
		if (!goalAttributes.detail)
			throw new Meteor.Error(422, 'Please fill in a description');
		
		// check that there are no previous posts with the same link
		if (goalAttributes.summary && goalWithSameSummary) {
			throw new Meteor.Error(302,
					'This goal has already been posted',
					goalWithSameSummary._id);
		}
	
		// pick out the whitelisted keys
		var goal = _.extend(_.pick(goalAttributes, 'summary', 'detail'), {
			userId: user._id,
			author: user.username,
			created: new Date().getTime(),
			adds: 0,
			completes: 0
		});
		
		var goalId = Goals.insert(goal);
		Meteor.call('addGoal', user._id, goalId);
		
		return goalId;
	},
	addGoal: function(userId, goalId){
		Meteor.users.update({_id:userId},{$push: { 'userList' : goalId }});
		Goals.update({_id:goalId},{$inc: { 'adds' : 1 }});
	}
});
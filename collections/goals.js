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
		
		// ensure an image link has been included
		if (!goalAttributes.image)
			throw new Meteor.Error(422, 'Please include an image');
		
		// check that there are no previous posts with the same link
		if (goalAttributes.summary && goalWithSameSummary) {
			throw new Meteor.Error(302,
					'This goal has already been posted',
					goalWithSameSummary._id);
		}
	
		// pick out the whitelisted keys
		var goal = _.extend(_.pick(goalAttributes, 'summary', 'image','detail'), {
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
	submitTriumph: function(triumphAttributes) {
		var user = Meteor.user(),
			existingTriumph = Triumphs.findOne({userId : user._id, goalId : triumphAttributes.goalId});
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post your triumph");
	
		// ensure the item has a description
		if (!triumphAttributes.body)
			throw new Meteor.Error(422, 'Please add words to your triumph');
		
		// ensure an image link has been included
		if (!triumphAttributes.link)
			throw new Meteor.Error(422, 'Please provide proof');
		
		// check that there are no previous posts with the same link
		if (existingTriumph) {
			throw new Meteor.Error(302,
					'You can only post one triumph per goal',
					existingTriumph.goalId);
		}
	
		// pick out the whitelisted keys
		var triumph = _.extend(_.pick(triumphAttributes, 'body', 'link', 'goalId'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
		});
		
		Triumphs.insert(triumph);
		Meteor.call('finishGoal', user._id, triumph.goalId);
		
		return triumph.goalId;
	},
	addGoal: function(userId, goalId){
		Meteor.users.update({_id:userId},{$push: { 'userList' : goalId }});
		Goals.update({_id:goalId},{$inc: { 'adds' : 1 }});
	},
	finishGoal: function(userId, goalId){
		Meteor.users.update({_id:userId},{$pull: { 'userList' : goalId }});
		Meteor.users.update({_id:userId},{$push: { 'userDone' : goalId }});
		Goals.update({_id:goalId},{$inc: { 'completes' : 1 }});
	}
});
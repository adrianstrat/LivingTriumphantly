Goals = new Meteor.Collection('goals');

Meteor.methods({
	submit: function(goalAttributes) {
		/**
		 * @desc validates and creates a new "goal" in db.goals
		 * @param array goalAttributes - an array with indexes "summary", "image", and "detail"
		 * @return string - the Id of the successfully created goal
		 */
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
			completes: 0,
			upvoters: [],
			votes: 0
		});
		
		var goalId = Goals.insert(goal);
		Meteor.call('addGoal', user._id, goalId);
		
		return goalId;
	},
	addGoal: function(userId, goalId){
		/**
		 * @desc adds a goal to a user's personal list of goals
		 * @param string userId - the id of the logged in user
		 * @param string goalId - the id of the goal to add
		 * @return none
		 */
		Meteor.users.update({_id:userId},{$push: { 'userList' : goalId }});
		Goals.update({_id:goalId},{$inc: { 'adds' : 1 }});
	},
	finishGoal: function(userId, goalId){
		/**
		 * @desc moves a goal from a user's personal goal list to their completed list
		 * @param string userId - the id of the logged in user
		 * @param string goalId - the id of the goal to move
		 * @return none
		 */
		Meteor.users.update({_id:userId},{$pull: { 'userList' : goalId }});
		Meteor.users.update({_id:userId},{$push: { 'userDone' : goalId }});
		Goals.update({_id:goalId},{$inc: { 'completes' : 1 }});
	},
	upVote: function(userId, goalId) {
		var goal = Goals.findOne({_id:goalId},{});
		if (goal.upvoters.indexOf(userId)> -1){
			throw new Meteor.Error(422, 'You have already upvoted this goal');
		} else {
			Goals.update({ _id : goalId }, {$push: { 'upvoters' : userId }, $inc : { 'votes' : 1 }});
		}
	}
});
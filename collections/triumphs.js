Triumphs = new Meteor.Collection('triumphs');

Meteor.methods({
	submitTriumph: function(triumphAttributes) {
		/**
		 * @desc validates and creates a new "triumph" in db.triumphs
		 * @param array triumphAttributes - an array with indexes "goalId", "body", and "link"
		 * @return string - the Id of the goal that this is a triumph for
		 */
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
		
		//create the comment, save the id
		triumph._id = Triumphs.insert(triumph);
		
		Meteor.call('finishGoal', user._id, triumph.goalId);
		
		// now create a notification, informing the user that there's been a comment
		createTriumphNotification(triumph);
		
		return triumph.goalId;
	}
});
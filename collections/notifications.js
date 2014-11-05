Notifications = new Meteor.Collection('notifications');

//Notifications.allow({
//	update: ownsDocument
//});

createTriumphNotification = function(triumph) {
	var goal = Goals.findOne(triumph.goalId);
		if (triumph.userId !== goal.userId) {
			Notifications.insert({
				userId: goal.userId,
				goalId: goal._id,
				triumphId: triumph._id,
				triumpherName: triumph.author,
				read: false
			});
		}
};
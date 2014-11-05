//publish only the specified userData indexes
Meteor.publish('userData', function () {
    return Meteor.users.find({_id: this.userId}, {createdAt : 1, 
    											  userDone : 1, 
    											  userList : 1, 
    											  username : 1});
});

Meteor.publish('goals', function() {
	return Goals.find();
});

Meteor.publish('triumphs', function() {
	return Triumphs.find();
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId : this.userId});
});
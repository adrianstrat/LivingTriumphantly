Meteor.publish('items', function() {
	return Items.find();
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});
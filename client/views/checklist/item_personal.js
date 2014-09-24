Meteor.startup( function () {
	Session.set("userItemView", "userItemOpen");
});


Template.itemPersonal.helpers({
	items: function() {
		if (Session.get("userItemView") == "userItemOpen"){
			return Items.find({_id: {$in: Meteor.user().listUser}});
		} else {
			return Items.find({_id: {$in: Meteor.user().userDone}});
		}
	},
	userItemOpen: function() {
		return Session.get("userItemView") == "userItemOpen";
	},
	userItemClosed: function() {
		return Session.get("userItemView") == "userItemClosed";
	}
});

Template.itemPersonal.events({
	'click .userItemView': function(e, t){
		var userItemView = e.target.getAttribute("name");
		Session.set("userItemView", userItemView);
		console.log(userItemView);
		return
	}
});
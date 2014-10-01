Meteor.startup( function () {
	Session.set("sortOrder", "goalNewest");
	Session.set("sortValue", {created : -1});
});

Template.goalBrowse.helpers({
	goals: function() {
		return Goals.find({}, {sort: Session.get("sortValue")});
	},
	goalNewest: function() {
		return Session.get("sortOrder") == "goalNewest";
	},
	goalPopular: function() {
		return Session.get("sortOrder") == "goalPopular";
	},
	goalHottest: function() {
		return Session.get("sortOrder") == "goalHottest";
	}
});

Template.goalBrowse.events({
	'click .goalSort': function(e, t){
		var sortOrder = e.target.getAttribute("name");
		if (sortOrder == "goalNewest") {
			Session.set("sortOrder", "goalNewest");
			Session.set("sortValue", {created : -1});
		};
		if (sortOrder == "goalPopular") {
			Session.set("sortOrder", "goalPopular");
			Session.set("sortValue", {adds : -1});
		};
		if (sortOrder == "goalHottest") {
			Session.set("sortOrder", "goalHottest");
			Session.set("sortValue", {created : -1});
		};
		console.log(sortOrder);
		return
	}
});
Meteor.startup( function () {
	Session.set("sortOrder", "itemNewest");
	Session.set("sortValue", {created : -1});
});

Template.itemBrowse.helpers({
	items: function() {
		return Items.find({}, {sort: Session.get("sortValue")});
	},
	itemNewest: function() {
		return Session.get("sortOrder") == "itemNewest";
	},
	itemPopular: function() {
		return Session.get("sortOrder") == "itemPopular";
	},
	itemHottest: function() {
		return Session.get("sortOrder") == "itemHottest";
	}
});

Template.itemBrowse.events({
	'click .itemSort': function(e, t){
		var sortOrder = e.target.getAttribute("name");
		if (sortOrder == "itemNewest") {
			Session.set("sortOrder", "itemNewest");
			Session.set("sortValue", {created : -1});
		};
		if (sortOrder == "itemPopular") {
			Session.set("sortOrder", "itemPopular");
			Session.set("sortValue", {adds : -1});
		};
		if (sortOrder == "itemHottest") {
			Session.set("sortOrder", "itemHottest");
			Session.set("sortValue", {created : -1});
		};
		console.log(sortOrder);
		return
	}
});
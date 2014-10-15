Meteor.startup( function () {
	//sets session values when first loading page
	Session.set("sortOrder", "goalNewest");
	Session.set("sortValue", {created : -1});
});

Template.goalBrowse.helpers({
	goals: function() {
		//retrieves the goals sorted by the session value "sortValue"
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
	'click #sort': function(e){
		/**
		 * @desc sets the value of "sortOrder" based on the selected item
		 * @params e - the clicked item with class "goalSort"
		 * @return None
		 */
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
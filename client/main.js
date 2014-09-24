Meteor.subscribe('recipes');

Deps.autorun(function(){
	Meteor.subscribe("userData");
});
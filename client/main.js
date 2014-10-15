//subscribes the client to the publication "userData" from publications.js
Deps.autorun(function(){
	Meteor.subscribe('userData');
});
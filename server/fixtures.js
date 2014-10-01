if (Goals.find().count() === 0) {
	var now = new Date().getTime();
	//create two users
	var tomId = Meteor.users.insert({
		profile: { name: 'Tom Coleman'}
	});
	var tom = Meteor.users.findOne(tomId);
	var sachaId = Meteor.users.insert({
		profile: { name: 'Sacha Greif' }
	});
	var sacha = Meteor.users.findOne(sachaId);
	
	var everestId = Goals.insert({
		summary: "Climb Mount Everest",
		detail: "Climb to the summit of Mount Everest and take a picture to prove it.",
		userId: tomId,
		author: "Tom Coleman",
		created: 1410927680426,
		adds: 1,
		completes: 0
	});
	
	Triumphs.insert({
		goalId: everestId,
		userId: sacha._id,
		author: sacha.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: "I'm on top of the world!"
	});
	Triumphs.insert({
		goalId: everestId,
		userId: tom._id,
		author: tom.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'Second!'
	});

	Goals.insert({
		summary: "Rebuild a Car",
		detail: "Restore a non-functional automobile back to a street legal condition and take a video driving it.",
		userId: tomId,
		author: "Tom Coleman",
		created: 1410920680456,
		adds: 10,
		completes: 5
	});
	
	Goals.insert({
		summary: "Do a Handstand",
		detail: "Hold yourself completely upside down with just your hands for 30 seconds, video or it doesn't count",
		userId: sachaId,
		author: "Sacha Greif",
		created: 1410920680426,
		adds: 3,
		completes: 1
	});
}
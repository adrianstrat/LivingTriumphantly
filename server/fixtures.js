//create some data if there is none
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
		image: "http://www.mount-everest.net/images/mt-everest-peak.jpg",
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
		image: "http://thetimes-tribune.com/polopoly_fs/1.1293315!/image/3327841608.jpg_gen/derivatives/landscape_490/3327841608.jpg",
		detail: "Restore a non-functional automobile back to a street legal condition and take a video driving it.",
		userId: tomId,
		author: "Tom Coleman",
		created: 1410920680456,
		adds: 10,
		completes: 5
	});
	
	Goals.insert({
		summary: "Do a Handstand",
		image: "http://www.beastskills.com/wp-content/uploads/2012/07/December-2007.jpg",
		detail: "Hold yourself completely upside down with just your hands for 30 seconds, video or it doesn't count",
		userId: sachaId,
		author: "Sacha Greif",
		created: 1410920680426,
		adds: 3,
		completes: 1
	});
}
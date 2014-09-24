if (Items.find().count() === 0) {
	Items.insert({
		summary: "Climb Mount Everest",
		detail: "Climb to the summit of Mount Everest and take a picture to prove it.",
		author: "Yeti_2014",
		created: 1410927680426,
		adds: 1,
		completes: 0
	});
	Items.insert({
		summary: "Rebuild a Car",
		detail: "Restore a non-functional automobile back to a street legal condition and take a video driving it.",
		author: "MotorOilVeins",
		created: 1410920680456,
		adds: 10,
		completes: 5
	});
	Items.insert({
		summary: "Do a Handstand",
		detail: "Hold yourself completely upside down with just your hands for 30 seconds, video or it doesn't count",
		author: "Yoga14Life",
		created: 1410920680426,
		adds: 3,
		completes: 1
	});
}
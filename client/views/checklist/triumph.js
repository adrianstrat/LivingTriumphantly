Template.triumph.helpers({
	submittedTriumph: function() {
		//returns the date a triumph was submitted as a friendly string
		return new Date(this.submitted).toString();
	}
});
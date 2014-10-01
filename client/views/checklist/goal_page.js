Template.goalPage.helpers({
	friendlyDate: function() {
		//converts JavaScript millisecond date to a friendly format
		milTime = this.created;
		return Date(milTime).toString();
	},
	triumphs: function() {
		return Triumphs.find({goalId: this._id});
	}
});

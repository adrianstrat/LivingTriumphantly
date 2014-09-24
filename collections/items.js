Items = new Meteor.Collection('items');

Meteor.methods({
	submit: function(itemAttributes) {
		var user = Meteor.user(),
			itemWithSameSummary = Items.findOne({summary: itemAttributes.summary});
	
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post an item");
	
		// ensure the item has a description
		if (!itemAttributes.detail)
			throw new Meteor.Error(422, 'Please fill in a description');
		
		// check that there are no previous posts with the same link
		if (itemAttributes.summary && itemWithSameSummary) {
			throw new Meteor.Error(302,
					'This item has already been posted',
					itemWithSameSummary._id);
		}
	
		// pick out the whitelisted keys
		var item = _.extend(_.pick(itemAttributes, 'summary', 'detail'), {
			userId: user._id,
			author: user.username,
			created: new Date().getTime(),
			adds: 0,
			completes: 0
		});
		
		var itemId = Items.insert(item);
		Meteor.call('addItem', user._id, itemId);
		
		return itemId;
	},
	addItem: function(userId, itemId){
		Meteor.users.update({_id:userId},{$push: { 'listUser' : itemId }});
		Items.update({_id:itemId},{$inc: { 'adds' : 1 }});
	}
});
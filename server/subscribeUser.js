Meteor.methods({
	'addFriend': function(userId) {
		if(Meteor.userId()) {
			/* make sure the user to be added exist */
			if(typeof Profiles.findOne({ user_id: Meteor.userId() }) === 'undefined') {
				return false;
			}
			else {
				/* make them subscribe each other */
				Profiles.update({ user_id: Meteor.userId() },{ $addToSet: { friends: userId } });
				Profiles.update({ user_id: userId },{ $addToSet: { friends: Meteor.userId() } });
				return true;
			}
		}
	}
});

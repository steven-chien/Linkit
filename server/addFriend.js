Meteor.methods({
	'addFriend': function(friendId) {
		var userId = Meteor.userId();
		if(userId) {
			/* make sure the user to be added exist */
			if(typeof Profiles.findOne({ user_id: friendId }) === 'undefined') {
				return false;
			}
			else {
				/* make them subscribe each other */
				Profiles.update({ user_id: userId },{ $addToSet: { friends: friendId } });
				Profiles.update({ user_id: friendId },{ $addToSet: { friends: userId } });
				return true;
			}
		}
	}
});

Meteor.methods({
	'addFriend': function(friendId) {
		var userId = Meteor.userId();
		if(userId) {
			/* make sure the user to be added exist and is not already added */
			if(typeof(Profiles.findOne({ user_id: friendId }))==='undefined' || Profiles.find({ user_id: userId, friends: friendId }).count()>0) {
				return false;
			}
			else {
				/* make them subscribe each other */
				Profiles.update({ user_id: userId },{ $addToSet: { friends: friendId } });
				Profiles.update({ user_id: friendId },{ $addToSet: { friends: userId } });
				
				/* pop the oldest added friend, push in the new one */
				var recentFriends = RecentFriends.find({ user_id: userId },{ sort: { timestamp: 1 } });
				var oldestFriend = recentFriends && recentFriends.fetch()[0];
				if(recentFriends.count()>9) {
					RecentFriends.remove(oldestFriend._id);
				}
				console.log(oldestFriend);
				RecentFriends.insert({ user_id: userId, timestamp: new Date().valueOf(), friend_id: friendId });
				return true;
			}
		}
	}
});

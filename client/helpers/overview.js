Template.overview.helpers({
	friend: function() {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.subscribe('recentFriends');
			var recentFriends = RecentFriends.find({ user_id: userId });
			var friendList = [];
			recentFriends.forEach(function(friends) {
				friendList.push(friends.friend_id);
			});
			console.log(friendList);
			return Profiles.find({ user_id: { $in: friendList } });
		}
	}
});

Template.overview.helpers({
	friend: function() {
		var userId = Meteor.userId();
		if(userId) {
			var myProfile = Profiles.findOne({ user_id: userId });
			var friendList = myProfile && myProfile.friends;
			friendList.splice(friendList.indexOf(userId), 1);
			return Profiles.find({ user_id: { $in: friendList } });
		}
	}
});

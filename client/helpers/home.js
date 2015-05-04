Template.home.helpers({
	userInfo: function() {
		userId = Meteor.userId();
		if(userId) {
			var info = Profiles.findOne({ user_id: userId });
			return info;
		}
	}
});

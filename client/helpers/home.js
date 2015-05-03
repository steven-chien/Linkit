Template.home.helpers({
	userInfo: function() {
		var info = Profiles.findOne({ user_id: Meteor.userId() });
		return info;
	}
});

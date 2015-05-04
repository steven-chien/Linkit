Template.profile.helpers({
	info: function() {
		if(Meteor.userId()) {
			var target_id = Router.current().data();
			var profile = Profiles.findOne({ user_id: target_id });
			return profile;
		}
	}
});

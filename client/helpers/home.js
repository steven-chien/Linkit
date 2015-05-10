Template.home.helpers({
	userInfo: function() {
		userId = Meteor.userId();
		if(userId) {
			var info = Profiles.findOne({ user_id: userId });
			return info;
		}
	},
	project: function() {
		var userId = Meteor.userId();
		if(userId) {
			var projList = Projects.find({ "members.id": { $in: [userId] } });
			return projList;
		}
	}
});

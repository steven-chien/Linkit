Meteor.publish('myUser', function() {
	return MyUsers.find();
});
Meteor.publish('Profiles', function() {
	if(this.userId) {
		var userProfile = Profiles.findOne({ user_id: this.userId });
		var list = userProfile && userProfile.friends;
		return Profiles.find({ user_id: { $in: list } });
	}
});

Meteor.publish('pmtasks', function() {
	return pmtasks.find();
});

Meteor.publish('pmmeetings', function() {
	return pmmeetings.find();
});

Meteor.publish('pmprojects', function() {
	return pmprojects.find();
});

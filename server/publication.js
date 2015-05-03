Meteor.publish('myUser', function() {
	return MyUsers.find();
});
Meteor.publish('Profiles', function() {
	if(this.userId) {
		var friends = Profiles.findOne({ user_id: this.userId }).friends;
		return Profiles.find({ user_id: { $in: friends } });
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

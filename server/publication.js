Meteor.publish('myUser', function() {
	return MyUsers.find();
});
Meteor.publish('LinkitterProfile', function() {
	if(this.userId) {
		console.log(this.userId);
		return LinkitterProfile.find({ user_id: this.userId });
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

Meteor.publish('myUser', function() {
	return MyUsers.find();
});
Meteor.publish('LinkitterList', function() {
	return LinkitterList.find();
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

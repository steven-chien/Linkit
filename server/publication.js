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

Meteor.publish('recentFriends', function() {
	if(this.userId) {
		var recentFriends = RecentFriends.find({ user_id: this.userId });
		return recentFriends;
	}
});

Meteor.publish('Projects', function() {
	if(this.userId) {
		var projects = Projects.find({ "members.id": { $in: [this.userId] } });
		return projects;
	}
});

Meteor.publish('Tasks', function() {
	if(this.userId) {
		var taskList = [];
		var projects = Projects.find({ "members.id": { $in: [this.userId] } });
		projects.forEach(function(project) {
			taskList.push(project._id);
		});
		var tasks = Tasks.find({ project_id: { $in: taskList } });
		return tasks;
	}
});

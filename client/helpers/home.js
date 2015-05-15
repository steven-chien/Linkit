Template.home.helpers({
	task: function() {
		var userId = Meteor.userId();
		if(userId) {
			var tasks = Tasks.find({ "managers.id": userId, state: false });
			return tasks;
		}
	},
	daysLeft: function() {
		/* login status check */
		var userId = Meteor.userId();
		if(userId) {
			/* extract task obj by task id */
			var taskId = this._id;
			var task = Tasks.findOne(taskId);

			/* extract task deadline */
			var taskDeadline = task && task.deadline;

			/* calculate difference in days between deadline and now */
			var currentDate = new Date();
			var oneDay = 24*60*60*1000;
			var diff = Math.floor((taskDeadline.getTime() - currentDate.getTime())/(oneDay));

			return diff;
		}
	},
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

Template.projectSummary.helpers({
	projProgress: function() {
		var userId = Meteor.userId();
		if(userId) {
			var completedTasks = Tasks.find({ project_id: this._id, state: true }).count();
			var totalTasks = Tasks.find({ project_id: this._id }).count();
			var progress = completedTasks / totalTasks * 100;
			console.log(completedTasks+' '+totalTasks+' '+progress);
			return progress+'%';
		}
	}
});

Template.home.events({
	'click #addProj': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Session.set('addingProj', true);
			Router.go('/project');
		}
	}
});

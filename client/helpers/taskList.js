Template.taskList.helpers({
	task: function() {
		var userId = Meteor.userId();
		if(userId) {
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);
			var tasks = Tasks.find({ project_id: projectId });
			return tasks;
		}
	},
	taskFinished: function() {
		var userId = Meteor.userId();
		if(userId) {
			var task = Tasks.findOne(this._id);
			var taskState = task && task.state;
			if(taskState!=false)
				return true;
		}
	}
});

Template.taskList.events({
	'click #taskFinished': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.call('setTaskState', this._id, true);
			console.log(this._id);
		}
	},
	'click #taskNotFinished': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.call('setTaskState', this._id, false);
			console.log(this._id);
		}
	}
});

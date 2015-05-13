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
	},
	taskManager: function() {
		var userId = Meteor.userId();
		if(userId) {
			var task = Tasks.findOne(this._id);
			var managers = task && task.managers;
			var managerIds = [];
			for(var i=0; i<managers.length; i++) {
				managerIds.push(managers[i].id);
			}
			console.log(managers);
			if(managerIds.indexOf(userId)!=-1)
				return true;
		}
	}
});

Template.taskList.events({
	'click #taskFinished': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.call('setTaskState', this._id, true, function(err, data) {
				if(!err) {
					console.log(data);
				}
				else {
					console.log(String(err));
				}
			});
			console.log(this._id);
		}
	},
	'click #taskNotFinished': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.call('setTaskState', this._id, false, function(err, data) {
				if(!err) {
					console.log(data);
				}
				else {
					console.log(String(err));
				}
			});
			console.log(this._id);
		}
	}
});

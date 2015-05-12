Template.taskList.helpers({
	task: function() {
		var userId = Meteor.userId();
		if(userId) {
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);
			var tasks = Tasks.find({ project_id: projectId });
			return tasks;
		}
	}
});

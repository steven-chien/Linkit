Template.project.helpers({
	projInfo: function() {
		var userId = Meteor.userId();
		if(userId) {
			var projectId = Router.current().data();
			return Projects.findOne(projectId);
		}
	},
	addingTask: function() {
		var addingTaskState = Session.get('addingTask');
		if(addingTaskState)
			return true;
	},
	projProgress: function() {
		var projectId = Router.current().data();
		var completedTasks = Tasks.find({ project_id: projectId, state: true }).count();
		var totalTasks = Tasks.find({ project_id: projectId }).count();
		var progress = Math.round(completedTasks / totalTasks * 100);
		console.log(completedTasks+' '+totalTasks+' '+progress);
		return progress+'%';
	}
});

Template.project.events({
	'click #addTask': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			Session.set('addingTask', true);
		}
	}
});

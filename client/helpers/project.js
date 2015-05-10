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

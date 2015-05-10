Template.addTaskForm.events({
	'click #cancel': function(evt) {
		Session.set('addingTask', false);
	}
});

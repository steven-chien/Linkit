Template.addProjectForm.events({
	'click #issueForm': function(evt) {
		evt.preventDefault();
		var userId = Meteor.userId();
		if(userId) {
			var projName = $('#taskName').val();
			var deadline = new Date($('#deadline').val());
			var details = $('#details').val();
			console.log(projName);
			console.log(deadline);
			console.log(details);
			Meteor.call('addProj', projName, deadline, details, function(err, data) {
				if(!data) {
					console.log(String(err));
					window.alert(String(err));
				}
			});
		}
	}
});

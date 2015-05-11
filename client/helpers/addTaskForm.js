Template.addTaskForm.helpers({
	managers: function() {
		/* extract id list from session */
		var managers = Session.get('taskManagers');
		if(!managers)
			managers = [];

		/* create manager name list */
		var managerList = [];
		for(var i=0; i<managers.length; i++) {
			var id = Profiles.findOne({ user_id: managers[i] });
			var name = id && id.name+' '+id.surname;
			managerList.push(name);
		}
		return managerList;
	}
});
Template.addTaskForm.events({
});
Template.addTaskForm.events({
	'click #addManager': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			/* extract email from form for searching */
			var email = $('#userEmail').val();

			/* get member id by email */
			var manager = Profiles.findOne({ email: email });
			var managerId = manager && manager.user_id;
			var managerList = Session.get('taskManagers');
			if(!managerList)
				managerList = [];

			/* if member does not exist on project list, he can not be assigned a task */
			if(typeof(email)!='underfined' && managerList.indexOf(managerId)==-1) {
				managerList.push(managerId);
				Session.set('taskManagers', managerList);
			}

			$('#userEmail').val('');
			console.log(managerList);
		}
	},
	'click #success': function(evt) {
		evt.preventDefault();
		var userId = Meteor.userId();
		if(userId) {
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);
			var taskName = $('#taskName').val();
			var deadline = new Date($('#deadline').val());
			deadline.setTime(deadline.getTime() + deadline.getTimezoneOffset()*60*1000);
			var details = $('#details').val();
			var managers = Session.get('taskManagers');
			Meteor.call('addTask', projectId, taskName, deadline, details, managers, function(err, data) {
				if(err) {
					window.alert(String(err));
				}
				else {
					$('#taskName').val('');
					$('#deadline').val('');
					$('#details').val('');
					Session.set('taskManagers', null);
					Session.set('addingTask', false);
					Meteor.subscribe('Tasks');
				}
				console.log('return: '+String(data)+'; error: '+String(err));
			});
		}
	},
	'click #cancel': function(evt) {
		Session.set('addingTask', false);
		Session.set('taskManagers', null);
	}
});

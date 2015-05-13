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
	},
	members: function() {
		var userId = Meteor.userId()
		if(userId) {
			/* get current route */
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);

			/* return array of members */
			var project = Projects.findOne(projectId);
			var members = project && project.members;

			return members;
		}
	}
});

Template.addTaskForm.events({
	'click #addManager': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			/* extract manager id from form for searching */
			var managerId = evt.target.id;

			/* get current route */
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);

			/* extract member list from session */
			var managerList = Session.get('taskManagers');
			if(!managerList)
				managerList = [];

			/* if member does not exist on project list, he can not be assigned a task */
			if(managerList.indexOf(managerId)==-1) {
				managerList.push(managerId);
			}
			else {
				var index = managerList.indexOf(managerId);
				managerList.splice(index, 1);
			}

			/* update session */
			Session.set('taskManagers', managerList);
			console.log(managerList);
		}
	},
	'click #success': function(evt) {
		evt.preventDefault();
		var userId = Meteor.userId();
		if(userId) {
			/* extract project id */
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);

			/* extract task details */
			var taskName = $('#taskName').val();
			var deadline = new Date($('#deadline').val());
			deadline.setTime(deadline.getTime() + deadline.getTimezoneOffset()*60*1000);
			var details = $('#details').val();
			var managers = Session.get('taskManagers');

			/* call addTask to add task and clear sessions and resubscribe */
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
		/* hide task adding panel */
		Session.set('addingTask', false);
		Session.set('taskManagers', null);
	}
});

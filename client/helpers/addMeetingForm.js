Template.addMeetingForm.helpers({
	participants: function() {
		/* extract id list from session */
		var participants = Session.get('meetingParticipants');
		if(!participants)
			participants = [];

		/* create manager name list */
		var participantList = [];
		for(var i=0; i<participants.length; i++) {
			var id = Profiles.findOne({ user_id: participants[i] });
			var name = id && id.name+' '+id.surname;
			participantList.push(name);
		}
		return participantList;
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

Template.addMeetingForm.events({
	'click #addManager': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			/* extract manager id from form for searching */
			var managerId = evt.target.id;

			/* get current route */
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);

			/* extract member list from session */
			var participantList = Session.get('meetingParticipants');
			if(!participantList)
				participantList = [];

			/* if member does not exist on project list, he can not be assigned a task */
			if(participantList.indexOf(managerId)==-1) {
				participantList.push(managerId);
			}
			else {
				var index = participantList.indexOf(managerId);
				participantList.splice(index, 1);
			}

			/* update session */
			Session.set('meetingParticipants', participantList);
			console.log(participantList);
		}
	},
	'click #cancel': function(evt) {
		/* hide task adding panel */
		Session.set('addingMeeting', false);
		Session.set('meetingParticipants', null);
	}
});

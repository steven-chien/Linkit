Template.addMeetingForm.helpers({
	participants: function() {
		/* extract id list from session */
		var participants = Session.get('meetingParticipants');
		if(!participants)
			participants = [];

		/* create participant name list */
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
	},
	printCalendar: function() {
		var userId = Meteor.userId();

		/* now denote now, today is for adjustment */
		var now = new Date();
		var today = new Date(now);

		/* table contains table HTML for return */
		var table;
		var busyList = [];

		if(userId) {
			/* get participant list and query for busy free periods */
			var participantList = Session.get('meetingParticipants');
			if(participantList.length>0) {
				/* call server for busy free periods */
				Meteor.call('getOccupiedList', participantList, function(error, data) {
					console.log('calling server for busy free...');
					if(!error) {
						console.log('method: '+busyList.length);
						busyList = data;
					}
					else {
						console.log(String(error));
					}
				});

				/* construct table */
				table = '<table class="table table-condensed table-bordered">'
				
				/* construct table head */
				table += '<thead>'
				table += '<tr>'
				table += '<th>Time</th>'
				for(var i=0; i<14; i++) {
					today.setTime(now.getTime() + i * 24 * 3600 * 1000);
					table += '<th>'+today.getDate()+'</th>'
				}
				table += '</tr>';
				table += '</thead>';

				/* construct table body */
				table += '<tbody>';
				for(var i=0; i<24; i++) {
					/* table row, representing hours */
					table += '<tr>';
					table += '<th scope="row">'+i+'</th>';

					/* table cell, representing hour of day */
					today.setHours(now.getHours() + i);
					for(var j=0; j<14; j++) {
						today.setTime(today.getTime() + j * 24 * 3600 * 1000);
						table += '<td class="success" date="'+today.getDate()+'/'+today.getMonth()+'" startTime="'+i+'" endTime="'+parseInt(i+1)+'" onclick=checked(this)></td>';
					}
					table += '</tr>';
				}

				table += '</tbody>';
				table += '</table>';
			}
			return table;
		}
	}
});

Template.addMeetingForm.events({
	'click #addManager': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			/* extract  id from form for searching */
			var participantId = evt.target.id;

			/* get current route */
			var currentRoute = Router.current().location.get().path;
			var projectId = currentRoute.substr(currentRoute.lastIndexOf('/') + 1);

			/* extract member list from session */
			var participantList = Session.get('meetingParticipants');
			if(!participantList)
				participantList = [];

			/* if member does not exist on project list, he can not be assigned a task */
			if(participantList.indexOf(participantId)==-1) {
				participantList.push(participantId);
			}
			else {
				var index = participantList.indexOf(participantId);
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

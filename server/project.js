Meteor.methods({
	addProj: function(projName, deadline, details, members) {
		console.log(projName+' '+deadline+' '+details+' '+members+' '+members.length);
		if(this.userId) {
			try {
				var membersList = [];
				for(var i=0; i<members.length; i++) {
					var friend = Profiles.findOne({ user_id: members[i] });
					var memberObj = friend && { id: members[i], name: friend.name+' '+friend.surname };
					membersList.push(memberObj);
					console.log(membersList);
				}
				Projects.insert({ creator: this.userId, name: projName, description: details, deadline: deadline, members: membersList });
				return true;
			}
			catch(ex) {
				return String(ex);
			}
		}
	},
	addTask: function(projectId, taskName, deadline, details, members) {
		if(this.userId) {
			try {
				/* create empty member list and get project member list */
				var membersList = [];
				var project = Projects.findOne(projectId);
				var projMembers = project && project.members;
				console.log(projMembers);

				/* for every members to be added as manager, cross check if they're member of a project */
				for(var i=0; i<members.length; i++) {
					var friend = Profiles.findOne({ user_id: members[i] });
					var memberObj = friend && { id: members[i], name: friend.name+' '+friend.surname };
					var flag = 0;
					for(var j=0; j<projMembers.length; j++) {
						if(memberObj.id==projMembers[j].id) {
							flag = 1;
							break;
						}
					}
					if(flag!=0)
						membersList.push(memberObj);
					console.log(membersList);
				}

				/* perform insertion after manager list is ready */
				Tasks.insert({ creator: this.userId, project_id: projectId, deadline: deadline, details: details, managers: membersList });
				return true;
			}
			catch(ex) {
				return String(ex);
			}

		}
	}
});

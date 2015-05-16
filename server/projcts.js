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
	}
});

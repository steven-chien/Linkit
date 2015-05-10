Template.addProjectForm.helpers({
	members: function() {
		var userId = Meteor.userId();
		if(userId) {
			var memberList = Session.get('addMemberList');
			var friendsList;
			if(memberList) {
				friendsList = Profiles.find({ user_id: { $in: memberList } });
				return friendsList;
			}
		}
	}
});

Template.addProjectForm.events({
	'click #issueForm': function(evt) {
		evt.preventDefault();
		var userId = Meteor.userId();
		if(userId) {
			var projName = $('#taskName').val();
			var deadline = new Date($('#deadline').val());
			deadline.setTime(deadline.getTime() + deadline.getTimezoneOffset()*60*1000);
			var details = $('#details').val();
			var members = Session.get('addMemberList');
			console.log(projName);
			console.log(deadline);
			console.log(details);
			console.log(members);
			Meteor.call('addProj', projName, deadline, details, members, function(err, data) {
				if(!data) {
					console.log(String(data));
					window.alert(String(err));
				}
				else {
					Session.set('addMemberList', null);
					Session.set('addingProj', false);
					Meteor.subscribe('Projects');
				}
			});
		}
	},
	'click #addMember': function(evt) {
		var userId = Meteor.userId();
		if(userId) {
			var search = $('#member').val();
			member = Profiles.findOne({ email: search });
			var member_email = member && member.user_id;
			if(member_email) {
				var memberList = Session.get('addMemberList');
				memberList.push(member_email);
				jQuery.unique(memberList);
				$('#member').val('');
				Session.set('addMemberList', memberList);
			}
			else {
				window.alert('Member not found!');
			}
			console.log(Session.get('addMemberList'));
		}
	}
});

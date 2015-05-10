Template.projectList.helpers({
	project: function() {
            return pmprojects.find();  
        },
	addingProj: function() {
		var state = Session.get('addingProj');
		console.log(state);
		if(state==true)
			return true;
	},
	addProjButton: function() {
		var state = Session.get('addingProj');
		console.log(state);
		if(state!=true)
			return true;
	},
	selfProject: function() {
		var userId = Meteor.userId();
		if(userId) {
			var projList = Projects.find({ creator: userId });
			return projList;
		}
	},
	otherProject: function() {
		var userId = Meteor.userId();
		if(userId) {
			var projList = Projects.find({ creator: { $not: [userId] }, "members.id": { $in: [userId] } });
			return projList;
		}
	}
});

Template.projectList.events({
	'click #addProj': function() {
		Session.set('addingProj', true);
		Session.set('addMemberList', [Meteor.userId()]);
	},
	'click #cancelProj': function() {
		Session.set('addingProj', false);
		Session.set('addMemberList', [Meteor.userId()]);
	}
});

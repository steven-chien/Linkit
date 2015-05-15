Template.profile.helpers({
	info: function() {
		if(Meteor.userId()) {
			var target_id = Router.current().data();
			var profile = Profiles.findOne({ user_id: target_id });
			return profile;
		}
	},
	isCurrentUser: function() {
		var userId = Meteor.userId();
		if(userId) {
			var targetId = Router.current().data();
			if(userId==targetId)
				return true;
		}
	},
	editProfile: function() {
		var editing = Session.get('editingProfile');
		if(editing)
			return true;
	},
	editState: function() {
		var editing = Session.get('editingProfile');
		if(editing)
			return 'Done';
		else
			return 'Edit Profile';
	}
});

Template.profile.events({
	'click #editProfile': function(evt) {
		var editingState = Session.get('editingProfile');
		if(editingState==true)
			Session.set('editingProfile', false);
		else
			Session.set('editingProfile', true);
	}
});

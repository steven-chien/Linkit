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
		if(editingState==true) {
			var name = $('#name').val();
			var surname = $('#surname').val();
			var company = $('#company').val();
			var phone = $('#phone').val();
			var website = $('#website').val();
			var description = $('#description').val();
			Meteor.call('editProfile', name, surname, company, phone, website, description, function(err, data) {
				if(!err) {
					$('#name').val('');
					$('#surname').val('');
					$('#company').val('');
					$('#phone').val('');
					$('#website').val('');
					$('#description').val('');
					Session.set('editingProfile', false);
				}
				else {
					console.log(String(err));
				}
			});
		}
		else {
			Session.set('editingProfile', true);
		}
	}
});

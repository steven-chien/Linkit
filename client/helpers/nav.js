Template.navItems.helpers({
	myUserId: function () {
		if(Meteor.userId())
			return Meteor.userId();
	},
	activateTab: function(templateName) {
		var currentRoute = Router.current().route.path(this);
		if(currentRoute.indexOf(templateName.toLowerCase())!=-1)
			return 'active';
		else
			return '';
	}
});

Template.list_nav.helpers({
	addfriend: function() {
		return "/link/addFriend?id="+LinkitterList.find({username:{ $regex: Meteor.user().profile.name, $options: 'i' }}).fetch()[0]._id;
	},
	activateTab: function(templateName) {
		var currentRoute = Router.current().route.path(this);
		if(currentRoute.indexOf(templateName.toLowerCase())!=-1)
			return 'active';
		else
			return '';
	}
});

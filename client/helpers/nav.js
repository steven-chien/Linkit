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
		var userId = Meteor.userId();
		if(userId) {
			return '/link/addFriend?id='+userId+'&device=nfc';
		}
	},
	activateTab: function(templateName) {
		var currentRoute = Router.current().route.path(this);
		if(currentRoute.toLowerCase().indexOf(templateName.toLowerCase())!=-1)
			return 'active';
		else
			return '';
	}
});

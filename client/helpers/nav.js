Template.navItems.helpers({
	myUserId: function () {
		if(Meteor.userId())
			return Meteor.userId();
	},
	activateTab: function(templateName) {
		/* check negivation path of user by determining keywords in the URL */
		var currentRoute = Router.current().location.get().path;
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
			/* encode URL for friendship instantiation */
			return '/link/addFriend?id='+userId+'&device=nfc';
		}
	},
	activateTab: function(templateName) {
		/* check negivation path of user by determining keywords in the URL */
		var currentRoute = Router.current().location.get().path;
		console.log('current url: '+currentRoute.toLowerCase());
		if(currentRoute.toLowerCase().indexOf(templateName.toLowerCase())!=-1)
			return 'active';
	}
});

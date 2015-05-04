Template.navItems.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current();
		if(currentRoute) {
			if(template === currentRoute.lookupTemplate())
				return 'active';
			if(template === "Linkitterlist" && currentRoute.url.search("link")>=0)
				return 'active';
			return '';
		}
	},
	myProfilePath: function () {
		if(Meteor.userId())
			return '/profile/'+Meteor.userId();
	}
});

Template.list_nav.helpers({
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current();
		console.log(currentRoute.lookupTemplate());
		// if(currentRoute)
		// {
		// 	if(template === currentRoute.lookupTemplate())
		// 		return 'active';
		// 	if(template === "Linkitterlist" && currentRoute.lookupTemplate() === "Addfriend")
		// 		return 'active';
		// 	return '';
		// }
		return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
	},
	addfriend: function() {
		return "/link/addFriend?id="+LinkitterList.find({username:{ $regex: Meteor.user().profile.name, $options: 'i' }}).fetch()[0]._id;
	}
});

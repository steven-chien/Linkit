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
	myprofile: function () {
		console.log(Meteor.user().profile.name);
		console.log("/profile/"+LinkitterList.find({username:{ $regex: Meteor.user().profile.name, $options: 'i' }}).fetch()[0]._id);
		return "/profile/"+LinkitterList.find({username:{ $regex: Meteor.user().profile.name, $options: 'i' }}).fetch()[0]._id;
	}
});

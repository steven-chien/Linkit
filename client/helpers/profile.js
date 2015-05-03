Template.profile.helpers({
	iscurrentUser: function () {
		var currentRoute = Router.current();
		return currentRoute.url.search(LinkitterList.find({username:{ $regex: Meteor.user().profile.name, $options: 'i' }}).fetch()[0]._id)>=0;
	}
});

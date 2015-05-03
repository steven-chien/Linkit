Router.configure({
	notFoundTemplate: 'notFound',
	layoutTemplate: 'layout'
});

Router.route('/link/linkitterlist', {
	name: 'linkitterlist'
});

Router.route('/',{
	name: 'home'
});

Router.route('/link/addFriend', {
	name: 'addfriend'
});

Router.route('/link/overview',{
	name: 'overview'
});

Router.route('/projectlist');
Router.route('/selectdate');
Router.route('/addmeeting');
Router.route('/addtask');
Router.route('/signup');
Router.route('/addproject');

Router.route('/profile/:_id', { 
	name: 'profile',
	data: function() { 
		return LinkitterList.findOne(this.params._id);
	}
});

Router.route('/individualproj/:_id', { 
	name: 'individualproj',
	data: function() {
		return pmprojects.findOne(new Meteor.Collection.ObjectID(this.params._id));
	}
});
// Router.route('individualproj', { 
// 	path: '/projects/:_id'}
// 	// name: 'individualproj'}
// );

// ,
// 	data: function() { 
// 		console.log(this.params._id);
// 		return pmprojects.findOne(this.params._id); }

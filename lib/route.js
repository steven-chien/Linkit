Router.onBeforeAction(function() {
	if(!Meteor.userId()) {
		return this.render('login');
	}
	else {
		this.next();
	}
});

Router.configure({
	notFoundTemplate: 'notFound',
	layoutTemplate: 'layout'
});

Router.route('/project', {
	name: 'project'
});

Router.route('/link/linkitterlist', {
	name: 'linkitterList'
});

Router.route('/',{
	name: 'home'
});

Router.route('/link/addFriend', {
	name: 'addfriend',
	data: function() {
		var friendId = this.params.query.id;
		var device = this.params.query.device;
		return { friend_id: friendId, device: device };
	}
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
		return this.params._id;
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

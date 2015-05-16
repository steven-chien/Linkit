Template.byQRCode.helpers({
	QRCodeUrl: function() { 
		var userId = Meteor.userId();
		if(userId) { 
			console.log("http://chart.apis.google.com/chart?cht=qr&chl="+window.location.origin+ "/link/addFriend?id="+userId+"&device=QRCode&chs=400x400");
			/* return url of QR Code by Google charts */
			return 'http://chart.apis.google.com/chart?cht=qr&chl='+window.location.origin+'/link/addFriend?id='+userId+'&device=QRCode&chs=400x400';
		}
	}
});

/* return true for the type of friend adding method */
Template.addFriendMethods.helpers({
	NFC: function() {
		var userId = Meteor.userId();
		var method = Session.get('addFriendMethod');
		if(userId && (method=='NFC' || method=='' || typeof(method)==='undefined'))
			return true;
		else
			return false;
	},
	QRCode: function() {
		var userId = Meteor.userId();
		var method = Session.get('addFriendMethod');
		if(userId && method=='QR')
			return true;
		else
			return false;
	},
	Email: function() {
		var userId = Meteor.userId();
		var method = Session.get('addFriendMethod');
		if(userId && method=='Email')
			return true;
		else
			return false;
	}

});

/* switch between friend adding templates */
Template.addfriend.events({
	'click #addByNfc': function() {
		if(Meteor.userId()) {
			Session.set('addFriendMethod', 'NFC');
		}
	},
	'click #addByQr': function() {
		if(Meteor.userId()) {
			Session.set('addFriendMethod', 'QR');
		}
	},
	'click #addByMail': function() {
		if(Meteor.userId()) {
			Session.set('addFriendMethod', 'Email');
		}
	}
});

/* implement friendship instantiation function */
Template.addfriend.rendered = function() {
	/* extract HTTP GET param */
	var parameters = Router.current().data();
	var userId = Meteor.userId();
	if(userId) {
		console.log('user_id: '+userId+'; friend_id: '+parameters.friend_id);
		/* if user Id encoded in URL is not same as currentUser, instantiate friendship */
		if(parameters.friend_id!=userId) {
			console.log('adding friend '+parameters.friend_id);
			Meteor.call('addFriend', parameters.friend_id, function(err, data) {
				console.log('return: '+String(data)+'; err: '+String(err)) 
				if(data) {
					/* subscribe to new friend list and go to newly added friend's profile */
					Meteor.subscribe('Profiles');
					Router.go('/profile/'+parameters.friend_id);
				}
			});
		}
	}
}

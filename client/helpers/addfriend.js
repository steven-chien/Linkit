Template.byQRCode.helpers({
	QRURL: function() { 
		var userId = Meteor.userId();
		if(userId) { 
			console.log("http://chart.apis.google.com/chart?cht=qr&chl="+window.location.origin+ "/link/addFriend?id="+userId+"&device=QRCode&chs=400x400");
			return 'http://chart.apis.google.com/chart?cht=qr&chl='+window.location.origin+'/link/addFriend?id='+userId+'&device=QRCode&chs=400x400';
		}
	}
});

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

Template.addfriend.rendered = function() {
	var parameters = Router.current().data();
	var userId = Meteor.userId();
	if(userId) {
	console.log('user_id: '+userId+'; friend_id: '+parameters.friend_id);
		if(parameters.friend_id!=userId) {
			console.log('adding friend '+parameters.friend_id);
			Meteor.call('addFriend', parameters.friend_id, function(err, data) {
				console.log('return: '+String(data)+'; err: '+String(err)) 
				if(data) {
					Meteor.subscribe('Profiles');
					Router.go('/profile/'+parameters.friend_id);
				}
			});
		}
	}
}

Template.linkitterList.helpers({
	friends: function() { 
		var userId = Meteor.userId();
		if(userId) {
			var searchVal = Session.get('searchBox');
			if(typeof searchVal==='undefined' || searchVal=="" || searchVal==null) {
				return Profiles.find({ user_id: { $ne: userId } });
			}
			else {
				console.log(searchVal);
				return Profiles.find({ name: { $regex: searchVal, $options: 'i' }, user_id: { $ne: userId } });
			}
		}
	}
});

Template.listSearch.events({
	'submit form': function(evt) {
		/* prevent page reload and put value of textbox in session */
		evt.preventDefault();
		Session.set('searchBox', evt.currentTarget.value);
	},
	'keyup #searchbox': function(evt) {
		/* put textbox value in session */
		Session.set('searchBox', evt.currentTarget.value);
	}
});

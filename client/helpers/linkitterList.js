Template.linkitterList.helpers({
	friends: function() { 
		var userId = Meteor.userId();
		/*
		if(userId) {
			var searchVal = Session.get('searchBox');
			searchVal = searchVal && Session.get('searchBox').replace(/ /g,'');
			if(typeof searchVal==='undefined' || searchVal=="" || searchVal==null) {
				return Profiles.find({ user_id: { $ne: userId } });
			}
			else {
				console.log(searchVal);
				return Profiles.find({ $or: [ { name: { $regex: searchVal, $options: 'i' } }, { surname: { $regex: searchVal, $options: 'i' } } ],user_id: { $ne: userId } });
			}
		}
		*/
	}
});

Template.overview.helpers({
	friend: function() {
		var userId = Meteor.userId();
		if(userId) {
			Meteor.subscribe('recentFriends');
			var recentFriends = RecentFriends.find({ user_id: userId });
			var friendList = [];
			/* create a list of id of recently added friends */
			recentFriends.forEach(function(friends) {
				friendList.push(friends.friend_id);
			});
			console.log(friendList);
			return Profiles.find({ user_id: { $in: friendList } });
		}
	},
	groupmates: function() {
		var userId = Meteor.userId();
		if(userId) {
			/* extract projects that the user has involved in */
			var groupmateIds = [];
			var myProjects = Projects.find({ 'members.id': userId });

			/* for each project extract the members and remove any duplicates */
			myProjects.forEach(function(project) {
				var members = project.members;
				for(var i=0; i<members.length; i++) {
					groupmateIds.push(members[i].id);
				}
			});
			groupmateIds = jQuery.unique(groupmateIds);

			/* find members within the returned array */
			var groupmates = Profiles.find({ user_id: { $in: groupmateIds } });
			return groupmates;
		}
	}
});

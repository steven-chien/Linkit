Profiles = new Mongo.Collection('profiles');
Profiles.initEasySearch(['name', 'surname', 'email']);

RecentFriends = new Mongo.Collection('recentFriends');

Projects = new Mongo.Collection('projects');

Tasks = new Mongo.Collection('tasks');

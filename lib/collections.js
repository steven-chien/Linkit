Profiles = new Mongo.Collection('profiles');
Profiles.initEasySearch(['name', 'surname', 'email']);

RecentFriends = new Mongo.Collection('recentFriends');

Projects = new Mongo.Collection('projects');

Tasks = new Mongo.Collection('tasks');

pmtasks = new Mongo.Collection('pmtasks');
pmmeetings = new Mongo.Collection('pmmeetings');
pmprojects = new Mongo.Collection('pmprojects');

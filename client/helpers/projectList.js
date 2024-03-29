Template.projectList.helpers({
	addingProj: function() {
		var state = Session.get('addingProj');
		if(state==true)
			return true;
	},
	addProjButton: function() {
		var state = Session.get('addingProj');
		if(state!=true)
			return true;
	},
	projectList: function() {
		var userId = Meteor.userId();
		if(userId) {
			/* extract projects user participated in */
			var projList = Projects.find({ "members.id": { $in: [userId] } });
			return projList;
		}
	}
});

Template.projectList.events({
	'click #addProj': function() {
		Session.set('addingProj', true);
		Session.set('addMemberList', [Meteor.userId()]);
	},
	'click #cancelProj': function() {
		Session.set('addingProj', false);
		Session.set('addMemberList', [Meteor.userId()]);
	}
});

Template.projectDetails.helpers({
	task: function() {
		/* login status check */
		var userId = Meteor.userId();
		if(userId) {
			/* extract unfinished tasks with project id */
			var projectId = this._id;
			var tasks = Tasks.find({ project_id: projectId, state: false });
			return tasks;
		}
	},
	daysLeft: function() {
		/* login status check */
		var userId = Meteor.userId();
		if(userId) {
			/* extract task obj by task id */
			var taskId = this._id;
			var task = Tasks.findOne(taskId);

			/* extract task deadline */
			var taskDeadline = task && task.deadline;

			/* calculate difference in days between deadline and now */
			var currentDate = new Date();
			var oneDay = 24*60*60*1000;
			var diff = Math.floor((taskDeadline.getTime() - currentDate.getTime())/(oneDay));

			return diff;
		}
	},
	projProgress: function() {
		var userId = Meteor.userId();
		if(userId) {
			var completedTasks = Tasks.find({ project_id: this._id, state: true }).count();
			var totalTasks = Tasks.find({ project_id: this._id }).count();
			var progress = Math.round(completedTasks / totalTasks * 100);
			console.log(completedTasks+' '+totalTasks+' '+progress);
			return progress+'%';
		}
	},
	isOwner: function() {
		var userId = Meteor.userId();
		if(userId) {
			if(this.id==userId)
				return true;
		}
	}
});

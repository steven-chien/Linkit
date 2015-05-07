Template.project.helpers({
	project: function() {
            return pmprojects.find();  
        },
	addingProj: function() {
		var state = Session.get('addingProj');
		console.log(state);
		if(state==true)
			return true;
	},
	addProjButton: function() {
		var state = Session.get('addingProj');
		console.log(state);
		if(state!=true)
			return true;
	}

});

Template.project.events({
	'click #addProj': function() {
		Session.set('addingProj', true);
	}
});

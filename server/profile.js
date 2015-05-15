Meteor.methods({
	editProfile: function(name, surname, company, phone, website, description) {
		if(this.userId) {
			try {
				Profiles.update({ user_id: this.userId },{ $set: { name: name, surname: surname, company: company, phone: phone, website: website, description: description } });
			}
			catch(ex) {
				return String(ex);
			}
		}
	}
});

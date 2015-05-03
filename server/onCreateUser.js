Accounts.onCreateUser(function(option, user) {

	/* get user profile from createuser, specify email from gmail as part of user data */
	user.profile = option.profile;
	console.log(user);
	if(user.services.google.verified_email==true) {
		user['emails'] = [ { address: user.services.google.email, verified: true } ];
	}
	else {
		user['emails'] = [ { address: user.services.google.email, verified: false } ];
	}

	/* construct user's public profile */
	var userName = user.profile.name;
	var givenName = user.services.google.given_name;
	var familyName = user.services.google.family_name;
	var email = user.services.google.email;
	LinkitterProfile.insert({ user_id: user._id, name: givenName, surname: familyName, email: email, phone: '', website: '' });

	/* return user object with email */
	return user;
});

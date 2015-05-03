Accounts.onCreateUser(function(option, user) {
	user.profile = option.profile;
	if(user.services.google.verified_email==true) {
		user['emails'] = [ { address: user.services.google.email, verified: true } ];
	}
	else {
		user['emails'] = [ { address: user.services.google.email, verified: false } ];
	}
	console.log(user);
	console.log(option);
	return user;
});

if(Meteor.isClient) {
	Accounts.ui.config({
		requestPermissions: {
			google: ['https://www.googleapis.com/auth/calendar','https://www.google.com/m8/feeds','https://www.googleapis.com/auth/userinfo.profile','email']
		},
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});
}

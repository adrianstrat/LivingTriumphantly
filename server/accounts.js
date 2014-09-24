Accounts.onCreateUser(function (options, user) {
	user.listUser = [];
	user.userDone = [];
	return user;
});
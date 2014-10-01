Accounts.onCreateUser(function (options, user) {
	user.userList = [];
	user.userDone = [];
	return user;
});
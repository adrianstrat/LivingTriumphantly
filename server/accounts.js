//adds the values "userList" and "userDone" to a user's account, which function
//as the personal goal list and completed goal list respectively.
Accounts.onCreateUser(function (options, user) {
	user.userList = [];
	user.userDone = [];
	return user;
});
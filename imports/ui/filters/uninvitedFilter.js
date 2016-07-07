import angular from 'angular';
import _ from 'underscore';

const name = 'uninvitedFilter';

function UninvitedFilter(users, message) {
	if (!message) {
		return false;
	}

	return users.filter((user) => {
		//if not the owner and not invited
		return user._id !== message.owner && !_.contains(message.invited, user._id)
	});
}

//create module
export default angular.module(name, [])
	.filter(name, () => {
		return UninvitedFilter;
	});
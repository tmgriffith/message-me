import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './messageRemove.html';
import { Messages } from '../../../api/messages/index';


class MessageRemove {
	remove() {
		if (this.message) {
			Messages.remove(this.message._id);
		}
	}
}
	

const name = 'messageRemove';

//create module

export default angular.module(name, [
	angularMeteor
	]).component(name, {
		template,
		bindings: {
			message: '<'
		},
		controllerAs: name,
		controller: MessageRemove
	});
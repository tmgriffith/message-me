import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './messageAdd.html';
import { Messages } from '../../../api/messages/index';

class MessageAdd {
	constructor() {
		this.message = {};
	}

	submit() {
		this.message.owner = Meteor.user()._id;
		Messages.insert(this.message);
		this.reset()
	}

	reset() {
		this.message = {};
	}
}
	

const name = 'messageAdd';

//create module

export default angular.module(name, [
	angularMeteor
	]).component(name, {
		template,
		controllerAs: name,
		controller: MessageAdd
	});
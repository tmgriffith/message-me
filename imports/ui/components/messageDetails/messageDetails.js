import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './messageDetails.html';
import { Messages } from '../../../api/messages/index';
import { name as MessageUninvited } from '../messageUninvited/messageUninvited';

class MessageDetails {
	constructor($stateParams, $scope, $reactive) {
		'ngInject';

		$reactive(this).attach($scope);

		this.messageId = $stateParams.messageId;

		this.subscribe('messages');
		this.subscribe('users');

		this.helpers({
			message() {
				return Messages.findOne({
					_id: $stateParams.messageId
				});
			},
			users() {
				return Meteor.users.find({});
			},
			isLoggedIn() {
				return !!Meteor.userId();
			}
		});
	}

	canInvite() {
		if (!this.message) {
      return false;
    }
 
    return !this.message.public && this.message.owner === Meteor.userId();
  }
 
	save() {
		Messages.update({
			_id: this.message._id
		}, {
			$set: {
				name: this.message.name,
				description: this.message.description,
				public: this.message.public
			}
		});
	}
}

const name = 'messageDetails';

//create module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	MessageUninvited	
	]).component(name, {
		template,
		controllerAs: name,
		controller: MessageDetails
	})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider.state('messageDetails', {
		url: '/messages/:messageId',
		template: '<message-details></message-details>',
		resolve: {
			currentUser($q) {
				if (Meteor.userId() === null) {
					return $q.reject('AUTH_REQUIRED');
				}
				else {
					return $q.resolve();
				}
			}
		}
	});
}


import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './messagesList.html';
import { Messages } from '../../../api/messages/index'
import { name as MessagesSort } from '../messagesSort/messagesSort';
import { name as MessageAdd } from '../messageAdd/messageAdd';
import { name as MessageRemove } from '../messageRemove/messageRemove'; 
import { name as MessageCreator } from '../messageCreator/messageCreator';
import { name as MessageRsvp } from '../messageRsvp/messageRsvp';
import { name as MessageRsvpList } from '../messageRsvpList/messageRsvpList';


class MessagesList {
	constructor($scope, $reactive) {
		'ngInject';

		$reactive(this).attach($scope);

		this.perPage = 3;
		this.page = 1;
		this.sort = {
			name: 1
		};
		this.searchText = '';

		this.subscribe('messages', () => [{
			limit: parseInt(this.perPage),
			skip: parseInt((this.getReactively('page') - 1) * this.perPage),
			sort: this.getReactively('sort')
		}, this.getReactively('searchText')
		]);

		this.subscribe('users');

		this.helpers({
			messages() {
				return Messages.find({}, {
					sort : this.getReactively('sort')
				});
			},
			messagesCount() {
				return Counts.get('numberOfMessages');
			},
			isLoggedIn() {
				return !!Meteor.userId();
			},
			currentUserId() {
				return Meteor.userId();
			}
		});
	}

	isOwner(message) {
		return this.isLoggedIn && message.owner === this.currentUserId;
	}

	pageChanged(newPage) {
		this.page = newPage;
	}

	sortChanged(sort) {
		this.sort = sort;
	}
}

const name = 'messagesList';

//create module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	utilsPagination,
	MessagesSort,
	MessageAdd,
	MessageRemove,
	MessageCreator,
	MessageRsvp,
	MessageRsvpList
	]).component(name, {
		template,
		controllerAs: name,
		controller: MessagesList
	})
		.config(config);

function config($stateProvider) {
	'ngInject';
	$stateProvider
	.state('messages', {
			url: '/messages',
			template: '<messages-list></messages-list>'
		});
}
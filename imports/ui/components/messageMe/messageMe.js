import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './messageMe.html';
import { name as MessagesList } from '../messagesList/messagesList';
import { name as MessageDetails } from '../messageDetails/messageDetails';
import {name as Navigation } from '../navigation/navigation';

class MessageMe {}

const name = 'messageMe';

//create module
export default angular.module(name, [
	angularMeteor,
	uiRouter,
	MessagesList,
	MessageDetails,
	Navigation,
	'accounts.ui'
	]).component(name, {
		template,
		controllerAs: name,
		controller: MessageMe
	})
		.config(config)
		.run(run);

function config($locationProvider, $urlRouterProvider) {
	'ngInject';

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/messages');

}

function run($rootScope, $state) {
	'ngInject';

	$rootScope.$on('$stateChangeError',
		(event, toState, toParams, fromState, fromParams, error) => {
			if (error === 'AUTH_REQUIRED') {
				$state.go('messages');
			}
		}
	);
}		
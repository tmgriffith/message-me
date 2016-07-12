import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'bootstrap/dist/css/bootstrap.css';

import { name as MessageMe } from '../imports/ui/components/messageMe/messageMe';


angular.module('MessageMe', [
	angularMeteor,
	MessageMe
	]);
	






	// ]).component('cropsList', {
	// 	templateUrl: 'client/cropsList.html',
	// 	controllerAs: 'cropsList',
	// 	controller($scope, $reactive){
	// 		'ngInject';

	// 		$reactive(this).attach($scope);

	// 		this.helpers({
	// 			crops() {
	// 				return Crops.find({});
	// 			}
	// 		});
	// 	}
	// });





// .controller('DashboardController', function($scope, $reactive) {
// 	'ngInject';

// 	$reactive(this).attach($scope);

// 	this.helpers({
// 		crops() {
// 			return Crops.find({});
// 		}
// 	})
// });
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './messagesSort.html';

class MessagesSort {
	constructor() {
		this.changed();
	}

	changed() {
		this.onChange({
			sort: {
				[this.property]: parseInt(this.order)
			}
		});
	}
}

const name = 'messagesSort';

//create module
export default angular.module(name, [
	angularMeteor
]).component(name, {
		template, bindings: {
			onChange: '&',
			property: '@',
			order: '@'
		},
		controllerAs: name,
		controller: MessagesSort
	});
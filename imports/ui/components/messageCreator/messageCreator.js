import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import { Meteor } from 'meteor/meteor';
 
import template from './messageCreator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
/**
 * MessageCreator component
 */
class MessageCreator {
  constructor($scope) {
    'ngInject';
 
    $scope.viewModel(this);
 
    this.helpers({
      creator() {
        if (!this.message) {
          return '';
        }
 
        const owner = this.message.owner;
 
        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }
 
        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}
 
const name = 'messageCreator';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    message: '<'
  },
  controller: MessageCreator
});
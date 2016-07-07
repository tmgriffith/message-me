import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';
 
import { Meteor } from 'meteor/meteor';
 
import template from './messageUnanswered.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class MessageUnanswered {
  getUnanswered() {
    if (!this.message || !this.message.invited) {
      return;
    }
 
    return this.message.invited.filter((user) => {
      return !_.findWhere(this.message.rsvps, { user });
    });
  }
 
  getUserById(userId) {
    return Meteor.users.findOne(userId)
  }
}
 
const name = 'messageUnanswered';
 
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
  controller: MessageUnanswered
});
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore'
 
import { Meteor } from 'meteor/meteor';
 
import template from './messageRsvp.html';

 
/**
 * RSVP component
 */
class MessageRsvp {
	yes() {
		this.answer('yes');
	}
	isYes() {
		return this.isAnswer('yes');
	}

	maybe() {
		this.answer('maybe');
	}

	no() {
		this.answer('no');
	}
	isNo() {
		return this.isAnswer('no');
	}

	answer(answer) {
		Meteor.call('rsvp', this.message._id, answer, (error) => {
			if (error) {
				console.error('oops, unable to rsvp');
			} else {
				console.log('RSVP done');
			}
		});
	}
	isAnswer(answer) {
		if(this.message) {
			return !!_.findWhere(this.party.rsvps, {
				user: Meteor.userId(),
				rsvp: answer
			});
		}
	}
}
 
const name = 'messageRsvp';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    message: '<'
  },
  controller: MessageRsvp
});
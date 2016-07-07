import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Messages } from './collections';

if (Meteor.isServer) {
	Meteor.publish('messages', function(options, searchString) {
		const selector = {
			$or: [{
				//public messages
				$and: [{
					public: true
				}, {
					public: {
						$exists: true
					}
				}]
			}, {
				// when logged in user is owner
				$and: [{
					owner: this.userId
				}, {
					owner: {
						$exists: true
					}
				}]
			}, {
				//when logged in user is one of invited
				$and: [{
					invited: this.userId
				}, {
					invited: {
						$exists: true
					}
				}]
			}]
		};

		if (typeof searchString === 'string' && searchString.length) {
			selector.name = {
				$regex: `.*${searchString}.*`,
				$options: 'i'
			};
		}

		Counts.publish(this, 'numberOfMessages', Messages.find(selector), {
			noReady: true
		});

		return Messages.find(selector, options);
	})
}
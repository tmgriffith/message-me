import { Meteor } from 'meteor/meteor';
import { Messages } from '../api/messages/index';

Meteor.startup(() => {
	if (Messages.find().count() === 0) {
		const messages = [{
		'name': 'Tomatos',
		'description': 'Roma tomatos indigenous to the hills of Naples, Italy'
	}, {
		'name': 'Basil',
		'description': 'Short stalk and mildly sweet'
	}, {
		'name': 'Grapes',
		'description': 'Rare species cultivated for wine making'
		}];

		messages.forEach((message) => {
			Messages.insert(message)
		});
	}
});
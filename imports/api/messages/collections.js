import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

Messages.allow({
	insert(userId, message) {
		return userId && message.owner === userId;
	},
	update(userId, message, fields, modifier) {
		return userId && message.owner === userId;
	},
	remove(userId, message) {
		return userId && message.owner === userId;
	}
});
import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
 
import { Messages } from './collections';
 
function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
 
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
 
  return null;
}
 
export function invite(messageId, userId) {
  check(messageId, String);
  check(userId, String);
 
  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }
 
  const message = Messages.findOne(messageId);
 
  if (!message) {
    throw new Meteor.Error(404, 'No such message!');
  }
 
  if (message.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }
 
  if (message.public) {
    throw new Meteor.Error(400, 'That message is public. No need to invite people.');
  }
 
  if (userId !== message.owner && ! _.contains(message.invited, userId)) {
    Messages.update(messageId, {
      $addToSet: {
        invited: userId
      }
    });
 
    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));
 
    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@message-me.com',
        subject: `MESSAGE: ${message.name}`,
        text: `
          Hey, I just invited you to ${message.name} on MessageMe.
          Come check it out: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function rsvp(messageId, rsvp) {
  check(messageId, String);
  check(rsvp, String);

  if(!this.userId) {
    throw new Meteor.Error(403, 'You need to be logged in to RSVP');
  }

  if(!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }

  const message = Messages.findOne({
    _id: messageId,
    $or: [{
      //is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    }, {
      // is owner
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });

  if(!message) {
    throw new Meteor.Error(404, "Message does not exist");
  }

  const hasUserRsvp = _.findWhere(message.rsvps, {
    user: this.userId
  });

  if (!hasUserRsvp) {
    // add new rsvp entry
    Messages.update(messageId, {
      $push: {
        rsvps: {
          rsvp,
          user: this.userId
        }
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    Messages.update({
      _id: messageId,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}

 
Meteor.methods({
  invite,
  rsvp
});
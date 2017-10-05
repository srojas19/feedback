import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import RandomString from 'randomstring';

export const Presentations = new Mongo.Collection('Presentations');

export const Comments = new Mongo.Collection('Comments');

function generateCode() {
  let code = RandomString.generate(5);
  while(Presentations.findOne({code: code})) {
    code = RandomString.generate(5);
  }
  return code;
};

Meteor.methods({
  'presentations.insert'(presentation) {
    check(presentation, Object);
    
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    return Presentations.insert({
      code: generateCode(),
      name: presentation.name,
      description: presentation.description,
      createdAt: new Date(),
      likes: [],
      dislikes: [],
      user: {
        _id: Meteor.userId(),
        username: Meteor.user().username
      }
    });
  }
});


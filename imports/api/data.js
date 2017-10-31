import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import RandomString from 'randomstring';

export const Presentations = new Mongo.Collection('Presentations');

//Consider modularizing the comments function to help testing (mantainability purposoes)
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
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    return Presentations.insert({
      code: generateCode(),
      name: presentation.name,
      description: presentation.description,
      createdAt: new Date(),
      votes: [],
      user: {
        _id: this.userId,
        username: Meteor.user().username
      }
    });
  },
  'presentations.setSlides'(parameters) {
    check(parameters, Object);
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    let presentation = Presentations.findOne({_id: parameters.presentationId});

    if(this.userId !== presentation.user._id ) {
      throw new Meteor.Error('User doesnt own the presentation');
    }
    
    Presentations.update(
      {_id: parameters.presentationId},
      {$set: {slides: parameters.url, currentSlide: 1}}
    );
  },
  'presentations.setCurrentSlide'(parameters) {
    check(parameters, Object);
    check(parameters.currentSlide, Number);
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    let presentation = Presentations.findOne({_id: parameters.presentationId});

    if(this.userId !== presentation.user._id ) {
      throw new Meteor.Error('User doesnt own the presentation');
    }
    
    Presentations.update(
      {_id: parameters.presentationId},
      {$set: {currentSlide: parameters.currentSlide}}
    );
  },
  'presentations.delete'(presentationId) {
    check(presentationId, String);
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    let presentation = Presentations.findOne({_id: presentationId});

    if(this.userId !== presentation.user._id ) {
      throw new Meteor.Error('User doesnt own the presentation');
    }
    
    Presentations.remove({ _id: presentationId });
    Comments.remove( { presentationId: presentationId } );
  },
  'presentations.vote'(presentationId) {
    check(presentationId, String);
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Presentations.update(
      { _id: presentationId },
      { $addToSet: {votes:{ _id: this.userId, username: Meteor.user().username } }}
    );
  },
  'comments.insert'(comment) {
    check(comment, Object);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Comments.insert({
      text: comment.text,
      type: comment.type,
      presentationId: comment.presentationId,
      createdAt: new Date(),
      votes: [],
      user: {
        _id: this.userId,
        username: Meteor.user().username
      }
    });
  },
  'comments.vote'(commentId) {
    check(commentId, String);
    
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    Comments.update(
      { _id: commentId },
      { $addToSet: {votes:{ _id: this.userId,username: Meteor.user().username } } }
    );
  }
});


/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Random } from 'meteor/random';
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Presentations} from "./data.js";
import { Comments} from "./data.js";
import faker from "faker";

if (Meteor.isServer) {
  describe("FeedBack", () => {
    describe("Presentation methods", () => {
      // Generate a random name
      const name = faker.name.findName();
      let presId;
      const userId = Random.id();
      let currentUser;
      let currentDescription = faker.lorem.paragraph();
      let currentCode = faker.random.word();


      beforeEach(() => {
        Presentations.remove({});

        // Stud the user
        resetDatabase();
        Factory.define("user", Meteor.users, {
          username: name,
        });

        currentUser = Factory.create("user");
        sinon.stub(Meteor, "user");
        Meteor.user.returns(currentUser);

        presId = Presentations.insert({
          code: currentCode,
          name: name,
          description: currentDescription,
          createdAt: new Date(),
          votes: [],
          user: {
            _id: userId,
            username: currentUser
          }
        });

      });

      afterEach(() => {
        Meteor.user.restore();
        resetDatabase();
      });

      it("can insert presentation", () => {

        let pName = faker.name.findName();
        let pDes = faker.lorem.paragraph();


         const newPresentation = {
          name: pName,
          description: pDes,
        };

        const insertPresentation = Meteor.server.method_handlers["presentations.insert"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        insertPresentation.apply(invocation, [newPresentation]);
        assert.equal(Presentations.find({name: pName}).count(), 1);
        
      });

      it('can delete presentation', () => {

        assert.equal(Presentations.find().count(), 1);
        const deleteP = Meteor.server.method_handlers['presentations.delete'];
        const invocation = { userId };
        deleteP.apply(invocation, [presId]);
        assert.equal(Presentations.find().count(), 0);

      });

      it('can increase presentation votes', () => {

        assert.equal(Presentations.find().count(), 1);
        const incCount = Meteor.server.method_handlers['presentations.vote'];
        const invocation = { userId };
        incCount.apply(invocation, [presId]);

        let newPres = Presentations.findOne({name: name});
        assert.equal(newPres.votes.length, 1);

      });

      it('can add slides', () => {

        let pUrl = faker.image.imageUrl();
        
        const newSlides = {
          presentationId: presId,
          url: pUrl
        };

        assert.equal(Presentations.findOne({name: name}).slides, undefined);
        const updated = Meteor.server.method_handlers['presentations.setSlides'];
        const invocation = { userId };
        updated.apply(invocation, [newSlides]);
        assert.equal(Presentations.findOne({name: name}).slides, pUrl);
        assert.equal(Presentations.findOne({name: name}).currentSlide, 1);
      });

      it('can change current slide', () => {

        let pUrl = faker.image.imageUrl();
        
        const newSlides = {
          presentationId: presId,
          url: pUrl
        };

        const updated = Meteor.server.method_handlers['presentations.setSlides'];
        const invocation = { userId };
        updated.apply(invocation, [newSlides]);

        const params = {
          presentationId: presId,
          currentSlide: 3
        };

        const next = Meteor.server.method_handlers['presentations.setCurrentSlide'];
        const invoc = { userId };
        next.apply(invoc, [params]);;
        assert.equal(Presentations.findOne({name: name}).currentSlide, 3);
      });

    });

    describe("Comments methods", () => {
      // Generate a random name
      const name = faker.name.findName();
      const currentText = faker.random.words();
      const currentType = faker.random.word();
      let commentId;
      const userId = Random.id();
      let currentUser;
      let currentCode = faker.random.word();


      beforeEach(() => {
        Comments.remove({});

        // Stud the user
        resetDatabase();
        Factory.define("user", Meteor.users, {
          username: name,
        });

        currentUser = Factory.create("user");
        sinon.stub(Meteor, "user");
        Meteor.user.returns(currentUser);

        commentId = Comments.insert({
          text: currentText,
          type: currentType,
          presentationId: currentCode,
          createdAt: new Date(),
          votes: [],
          user: {
            _id: userId,
            username: currentUser
          }
        });

      });

      afterEach(() => {
        Meteor.user.restore();
        resetDatabase();
      });

      it("can insert comment", () => {

        let pText = faker.random.words();
        let pPresId = faker.random.word();


        const newComment = {
          text: pText,
          presentationId: pPresId,
        };

        const insertComment = Meteor.server.method_handlers["comments.insert"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        insertComment.apply(invocation, [newComment]);
        assert.equal(Comments.find({text: pText}).count(), 1);
        
      });

      it('can increase comment votes', () => {

        assert.equal(Comments.find().count(), 1);
        const incCount = Meteor.server.method_handlers['comments.vote'];
        const invocation = { userId };
        incCount.apply(invocation, [commentId]);

        let newCom = Comments.findOne({text: currentText});
        assert.equal(newCom.votes.length, 1);

      });

    });


  });
}
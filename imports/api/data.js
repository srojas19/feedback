import {Mongo} from 'meteor/mongo';

export const Presentations = new Mongo.Collection('Presentations');

export const Users = new Mongo.Collection('Users');

export const Comments = new Mongo.Collection('Comments');
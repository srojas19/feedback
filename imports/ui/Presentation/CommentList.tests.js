import React from "react";
import { Meteor } from "meteor/meteor"
import { shallow } from "enzyme";
import { assert } from "meteor/practicalmeteor:chai";
import CommentList from "./CommentList.jsx";
import faker from "faker";
import { Factory } from 'meteor/dburles:factory';


describe("CommentList", function () {
  it("should render", function () {

  	let fecha = new Date();
    let nName = faker.name.findName();
    let texto = faker.lorem.paragraph();
    let texto2 = faker.lorem.paragraph();
    const lista = [{
      text: texto, 
      createdAt: fecha,
      votes:[], 
      user: {
        username: nName
      } 
    },
    {
      text: texto2, 
      createdAt: fecha,
      votes:[], 
      user: {
        username: nName
      } 
    }];

    const comentarios = shallow(<CommentList comments={lista}/>);
    
    assert.equal(comentarios.find("ul").length, 1);
    assert.equal(comentarios.find("Comment").length, 2);
    
  });
});

import React from "react";
import { Meteor } from "meteor/meteor"
import { shallow } from "enzyme";
import { assert } from "meteor/practicalmeteor:chai";
import Comment from "./Comment.jsx";
import faker from "faker";
import { Factory } from 'meteor/dburles:factory';


describe("Comment", function () {
  it("should render", function () {

    let fecha = new Date();
  	let nName = faker.name.findName();
  	let texto = faker.lorem.paragraph();
  	const comentario = {
      text: texto, 
      createdAt: fecha,
      votes:[], 
      user: {
        username: nName
      } 
    };

    const comment = shallow(<Comment comment={comentario}/>);
    
    assert.equal(comment.find("p").length, 3);
    assert.equal(comment.find("img").length, 1);
    assert.equal(comment.find("li").length, 1);
    
  });
});

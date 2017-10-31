import React from "react";
import { Meteor } from "meteor/meteor"
import { shallow } from "enzyme";
import { assert } from "meteor/practicalmeteor:chai";
import Information from "./Information.jsx";
import faker from "faker";
import { Factory } from 'meteor/dburles:factory';


describe("Information", function () {
  it("should render", function () {

  	let nCode = faker.random.word();
  	let nName = faker.name.findName();
  	let par = faker.lorem.paragraph();
  	const pres = {
  		code: nCode,
  		name: nName, 
  		description: par, 
  		votes:[]
  	};

    const info = shallow(<Information presentation={pres}/>);
    
    assert.equal(info.find("h4").length, 3);
    assert.equal(info.find("button").length, 1);
    assert.equal(info.find("h2").length, 1);
    
  });
});

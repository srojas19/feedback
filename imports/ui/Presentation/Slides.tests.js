import React from "react";
import { Meteor } from "meteor/meteor"
import { shallow } from "enzyme";
import { assert } from "meteor/practicalmeteor:chai";
import Slides from "./Slides.jsx";
import faker from "faker";
import { Factory } from 'meteor/dburles:factory';


describe("Slides", function () {
  it("should render", function () {

  	const arch = faker.image.imageUrl();

    const slides = shallow(<Slides url={arch}/>);
    
    assert.equal(slides.find("Pdf").length, 1);
    
  });
});

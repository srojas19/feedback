import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Presentations, Comments, Users } from '../../api/Data.js';

class Container extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>{this.props.presentation.code}</h1>
      </div>
    );
  }
}

Container.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default createContainer( (props) => {
    // return {
    //   // user: Users.findOne({username: this.props.user.username}).fetch(),
    //   presentation: Presentations.findOne({code: props.presentation.code}),
    //   comments: Comments.find({presentationCode: props.presentation.code}).fetch()
    // };
    return {};
}, Container); 
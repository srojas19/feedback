import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Presentations, Comments, Users, Votes } from '../../api/data.js';

class Container extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>Se buscó</h1>
      </div>
    );
  }
}

// App.propTypes = {
//     user: PropTypes.object,
//     presentation: PropTypes.object,
//     comments: PropTypes.array
// };

export default createContainer( () => {
    // return {
    //     user: Users.findOne({}).fetch(),
    //     comments: Comments.findOne({}).fetch
    // };
    return {};
}, Container); 
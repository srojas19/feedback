import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment.jsx';

class CommentList extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}

CommentList.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default CommentList;
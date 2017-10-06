import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment.jsx';

class CommentList extends Component {
  
  constructor(props) {
    super(props);
  }


  renderComments() {
    return this.props.comments.map((comment) => (
      <Comment key= {comment._id} comment={comment} />
    ));
  }

  render() {
    return (
      <div>
        <ul>{this.renderComments()}</ul>
      </div>
    );
  }
}

CommentList.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default CommentList;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  render() {
    return (
      <li>{this.props.comment.text}</li>
    );
  }
}
 
Comment.propTypes = {

  
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

// import './Container.css';

import CommentList from './CommentList.jsx';
import Information from './Information.jsx';
import CommentForm from './CommentForm.jsx';
 
import { Presentations, Comments } from '../../api/Data.js';

class Container extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div className="container-fluid">
          <Information
            presentation = {this.props.presentation} />
        </div>
        <div className="container-fluid comment-list">
          <CommentList
            comments = {this.props.comments} />
        </div>
        <div className="container-fluid comment-form">
          <CommentForm />
        </div>
      </div>
    );
  }
}

Container.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default createContainer( (props) => {
    return {
      presentation: Presentations.findOne({code: props.presentation.code}),
      comments: Comments.find({presentationCode: props.presentation.code}).fetch()
    };
}, Container); 
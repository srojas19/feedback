import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

// import './Container.css';

import CommentList from './CommentList.jsx';
import Information from './Information.jsx';
import CommentForm from './CommentForm.jsx';
 
import { Presentations, Comments } from '../../api/data.js';

class Container extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      
<div class="container bootstrap snippet">
    <div class="row">
    <div class="col-md-12">
      <div class="blog-comment">
        <Information presentation = {this.props.presentation} />
        <hr/>
        <CommentList comments = {this.props.comments} />
        <CommentForm presentationId = {this.props.presentationId}/>
      </div>
    </div>
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
      presentation: Presentations.findOne({_id: props.presentationId}),
      comments: Comments.find({presentationId: props.presentationId}).fetch()
    };
}, Container); 
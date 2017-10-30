import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import ReactFilestack, { client } from 'filestack-react';

// import './Container.css';

import CommentList from './CommentList.jsx';
import Information from './Information.jsx';
import CommentForm from './CommentForm.jsx';
import Slides from './Slides.jsx';
 
import { Presentations, Comments } from '../../api/data.js';

class Container extends Component {

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);    
  }

  onSuccess(result) {
    console.log(result);
    Meteor.call('presentations.setSlides', 
      {
        presentationId: this.props.presentation._id,
        url : result.filesUploaded[0].url
      }
    );
  }

  render() {
    return (      
      <div className="container "> 
        { Meteor.userId() === this.props.presentation.user._id && 
          !this.props.presentation.slides &&
          <ReactFilestack
            apikey='AEz6KGrIcTPGDaVBQhxBOz'
            buttonText="Upload your Slides!"
            buttonClass="btn btn-primary btnslides"
            options={{
                fromSources:["local_file_system","googledrive","dropbox","url"],
                accept:[".pdf"],
                maxFiles:1
              }}
            onSuccess={this.onSuccess}
          />}
        { this.props.presentation.slides &&
          <Slides 
            url={this.props.presentation.slides}
            presentationId = {this.props.presentation._id}
            owner = {this.props.presentation.user._id}
            currentSlide = {this.props.presentation.currentSlide}
          />} 
        <Information presentation = {this.props.presentation} />
        <hr/>
        <div className="blog-comment bootstrap snippet">
          <CommentList comments = {this.props.comments} />
        </div>
        <CommentForm presentationId = {this.props.presentationId}/>
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
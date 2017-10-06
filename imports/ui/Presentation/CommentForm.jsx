import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Comments } from '../../api/data.js';

class CommentForm extends Component {
  
  constructor(props) {
    super(props);
  }


handleSubmit(event) {
    event.preventDefault(); 

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    const comment = {text: text, presentationId: this.props.presentationId}

    Meteor.call('comments.insert', comment);
    console.log(comment); 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

  render() {
    return (
      <div>
      <form className="new-comment" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="new comments"
        />
      </form>

      </div>
    );
  }


}


CommentForm.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default CommentForm;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import NavBar from './NavBar.jsx';
import Container from './Presentation/Container.jsx';
import PresentationForm from './PresentationForm.jsx';
 
import { Presentations, Comments } from '../api/data.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      presentationId: null,
      showPresentationForm: false
    }
  }

  handleSearch(code) {
    if(!this.props.user) {
      alert('You need to be logged in to continue');
      return;
    } 
    let presentation = Presentations.findOne({code: code});
    if(!presentation) alert('There is no presentation with the code ' + code);
    this.setState({presentationId: presentation._id,
                  showPresentationForm: false});
  }

  onEnter(evt) {
    if(evt.key ==='Enter') {
      this.handleSearch(evt.target.value);
    }
  }
  handleCreateButton() {
    if(!this.props.user) {
      alert('You need to be logged in to create a presentation');
      return;
    } 
    this.setState({showPresentationForm: true});
  }

  handleSubmit(presentation) {
    if(!this.props.user) {
      alert('You need to be logged in to create a presentation');
      return;
    } 
    Meteor.call('presentations.insert', presentation, 
      (err, res) => {
        if(err) {
          alert('There was an error creating the presentation');
          return;
        } 
        this.setState({showPresentationForm: false,
                    presentationId: res});
    });
  }

  handleCancel() {
    this.setState({showPresentationForm: false});    
  }

  render() {
    return (
      <div className="App">
          <NavBar 
            handleSearch={this.handleSearch}
            handleCreateButton={this.handleCreateButton}
          />
          {!this.state.showPresentationForm && !this.state.presentationId &&

            <div className="Container buscador">
            <h1 className="row titulo">FeedBack</h1>
            <div className="row">
             <input 
                className="form-control" 
                type="text" 
                placeholder="Press Enter to search a presentation" 
                aria-label="Search"
                onKeyPress = {this.onEnter.bind(this)}
              />
            </div>
          </div>
          }
          
          {this.state.presentationId && 
          !this.state.showPresentationForm &&
          this.props.user &&
          <Container 
            presentationId = {this.state.presentationId}
            user = {this.props.user}
          />}
          {this.state.showPresentationForm && 
          <PresentationForm 
            handleSubmit={this.handleSubmit} 
            handleCancel={this.handleCancel} />}
      </div>
    );
  }
}

App.propTypes = {
    user: PropTypes.object,
    presentationId: PropTypes.string
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, App);
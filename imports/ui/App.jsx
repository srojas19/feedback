import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.jsx';
import Container from './Presentation/Container.jsx';
import PresentationForm from './PresentationForm.jsx';

import RandomString from 'randomstring';
 
import { Presentations, Comments, Users } from '../api/Data.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      user: null,
      presentation: null,
      showPresentationForm: false
    }
  }

  handleSearch(code) {
    console.log('handleSearch');
    let presentation = Presentations.findOne({code: code});
    if(!presentation) alert('There is no presentation with the code ' + code);
    this.setState({presentation: presentation,
                  showPresentationForm: false});
  }

  handleCreateButton() {
    this.setState({showPresentationForm: true});
  }

  generateCode() {
    let code = RandomString.generate(5);
    while(Presentations.findOne({code: code})) {
      code = RandomString.generate(5);
    }
    return code;
  }

  handleSubmit(presentation) {
    const code = this.generateCode();

    let createdPresentation = {
      code : code,
      name : presentation.name,
      description: presentation.description,
      user: this.state.user
    }
    Presentations.insert(createdPresentation);
    this.setState({showPresentationForm: false,
                  presentation: createdPresentation});
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
          {this.state.presentation && !this.state.showPresentationForm &&
          <Container 
            presentation = {this.state.presentation}
            user = {this.state.user}
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
    presentation: PropTypes.object
};

export default App;
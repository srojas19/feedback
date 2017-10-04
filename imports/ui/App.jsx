import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.jsx';
import Container from './Presentation/Container.jsx';
 
import { Presentations, Comments, Users } from '../api/data.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      user: null,
      presentation: null,
    }
  }

  handleSearch(code) {
    // let presentation = Presentations.findOne({code: code});
    presentation = code;
    console.log('handleSearch');
    this.setState({presentation: presentation});

  }

  render() {
    return (
      <div className="App">
          <NavBar handleSearch={this.handleSearch} />
          {this.state.presentation == null ? 'Búsque una presentación' :
          <Container />}
      </div>
    );
  }
}

App.propTypes = {
    user: PropTypes.object,
    presentation: PropTypes.object,
    comments: PropTypes.array
};

export default App;
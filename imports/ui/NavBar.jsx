import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  onEnter(evt) {
    if(evt.key ==='Enter') {
      console.log('onEnter');
      this.props.handleSearch(evt.target.value);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="h1 navbar-brand mb-0">Feedback</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <input 
            className="form-control mr-sm-2" 
            type="text" 
            placeholder="Presentación" 
            aria-label="Search"
            onKeyPress = {this.onEnter.bind(this)}
          />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">Log in</button>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  handleSearch : PropTypes.func.isRequired
};

export default NavBar;
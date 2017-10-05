import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  onEnter(evt) {
    if(evt.key ==='Enter') {
      this.props.handleSearch(evt.target.value);
    }
  }

  onClickCreate(evt) {
    this.props.handleCreateButton();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a className="h1 navbar-brand mb-0">Feedback</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="my-2 my-lg-0 btn btn-outline-success">
            <AccountsUIWrapper />
          </div>
          
          <input 
            className="form-control mr-sm-2 mx-3" 
            type="text" 
            placeholder="Presentation" 
            aria-label="Search"
            onKeyPress = {this.onEnter.bind(this)}
          />
          <button 
            className="btn btn-outline-primary my-2 my-sm-0" 
            type="submit"
            onClick={this.onClickCreate.bind(this)}
          > Create</button>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  handleSearch : PropTypes.func.isRequired
};

export default NavBar;
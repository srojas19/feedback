import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  onClickCreate(evt) {
    this.props.handleCreateButton();
  }

  render() { 
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a className="h1 navbar-brand mb-0">FeedBack</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="nav navbar-nav navbar-right" id="navbarSupportedContent">
          <button 
            className="btn btn-outline-primary my-2 my-sm-0 create" 
            type="submit"
            onClick={this.onClickCreate.bind(this)}
          > Create</button>
          <div className="my-2 my-lg-0 btn btn-outline-success signin">
            <AccountsUIWrapper />
          </div>
          
          
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  handleSearch : PropTypes.func.isRequired
};

export default NavBar;
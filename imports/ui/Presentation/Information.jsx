import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class Information extends Component {
  
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    event.preventDefault();
    Meteor.call('presentations.vote', this.props.presentation._id);
    console.log(this.props.presentation.votes); 
  }
  render() {
    return (
      <div className='my-2 card'>
        <div className="card-header">
          <div className="row">
            <h4 className="col-sm-8">Código: {this.props.presentation.code} </h4>
            <button type="button" className="btn btn-primary col-sm-4" onClick={this.handleClick.bind(this)}>Votar</button>
          </div>
        </div>
        <h2 className='card-title mx-4 my-2'> {this.props.presentation.name} </h2>
        <h4 className='card-text mx-4 my-2'> {this.props.presentation.description} </h4>
      </div>
    );
  } 
}

Information.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default Information;
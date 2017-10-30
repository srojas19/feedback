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
  }
  render() {
    return (
      <div className='my-2 card'>
        <div className="card-header">
          <div className="row">
            <h4 className="col-sm-10">Código: {this.props.presentation.code} </h4>
            <h4 className="col-sm-1"> {this.props.presentation.votes.length} </h4>
            <div className="col-sm-1">
            <button type="button" className="btn btn-primary votarPresentacion" onClick={this.handleClick.bind(this)}>👍</button>
            </div>
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
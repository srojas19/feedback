import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Information extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='my-2 card'>
        <h4 className="card-header">Código: {this.props.presentation.code} </h4>
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
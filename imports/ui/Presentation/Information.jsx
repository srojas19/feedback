import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Information extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>Codigo: {this.props.presentation.code}</h1>
        <h1>Nombre: {this.props.presentation.name}</h1>
        <h1>Descripcion: {this.props.presentation.description}</h1>
      </div>
    );
  }
}

Information.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default Information;
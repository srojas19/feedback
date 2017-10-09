import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Information extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h3 class="text-success">Codigo: {this.props.presentation.code}</h3>
        <h3 class="text-success">Nombre: {this.props.presentation.name}</h3>
        <h3 class="text-success">Descripcion: {this.props.presentation.description}</h3>
      </div>
    );
  }
}

Information.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default Information;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Information extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1>{this.props.presentation.code}</h1>
      </div>
    );
  }
}

Information.propTypes = {
    // user: PropTypes.object.isRequired,
    // presentation: PropTypes.object.isRequired
};

export default Information;
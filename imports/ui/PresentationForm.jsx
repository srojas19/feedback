import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

class PresentationForm extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      name : null,
      description: null,
      file: null
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const presentation = {
      name: this.state.name,
      description: this.state.description,
      slides: this.state.slides
    };
    this.props.handleSubmit(presentation);
  }
  
  handleCancel() {
    this.setState({
      name : null,
      description: null,
      file: null
    });
    this.props.handleCancel();
  }

  render() {
    return (
    <div className="container my-4">
      <h2>Create your Presentation</h2>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <h4 htmlFor="name" className="col-sm-2 col-form-label">Name</h4>
          <div className="col-sm-10">
            <input 
              type="text" 
              className="form-control" 
              name="name"
              aria-label="Name" 
              placeholder="Presentation Name" 
              onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="form-group row">
          <h4 htmlFor="description" className="col-sm-2 col-form-label">Description</h4>
          <div className="col-sm-10">
            <textarea 
              className="form-control" 
              name="description" 
              aria-label="description"
              placeholder="Describe your presentation" 
              rows="3"
              onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col">
            <button type="submit" value="Submit" className="btn btn-success mx-2 botonCrear">Create</button>
            <input type="button" value="Cancel" className="btn btn-danger mx-2" onClick={this.handleCancel}/>
          </div>
        </div>
      </form>
    </div>
    );
  }
}

PresentationForm.propTypes = {
  handleCancel : PropTypes.func.isRequired,
  handleSubmit : PropTypes.func.isRequired
};

export default PresentationForm;
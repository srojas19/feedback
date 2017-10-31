import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class Comment extends Component {

  darfecha(date) {

    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hora = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return monthNames[monthIndex] + ' ' + day + ' ' + year + ' ' + hora + ':' + min + ':' + sec + ' ';
   
  }

  handleClick(event){
    event.preventDefault();
    this.refs.btn.setAttribute("disabled", "disabled");    
    Meteor.call('comments.vote', this.props.comment._id); 
  }

  render() {
    return (

      <li className="clearfix">
         <img src="https://bootdey.com/img/Content/user_1.jpg" className="avatar" alt="avatar"/>
          <div className="post-comments">
            <div className="meta">
              <p> {this.darfecha(this.props.comment.createdAt)}<a href="#">{this.props.comment.user.username}</a> says: </p>    
            </div>
            <p> {this.props.comment.text} </p>
            <div className="row">
              <div className="col-sm-1">
                <button type="button" ref="btn" className="btn btn-outline-secundary btn-sm" onClick={this.handleClick.bind(this)}>👍</button>  
              </div> 
              <div className="col-sm-1">
                <p className="font-weight-bold"> {this.props.comment.votes.length} </p>            
              </div>
            </div>
            
          </div>
      </li>
    );
  }
}
 
Comment.propTypes = {

  
};


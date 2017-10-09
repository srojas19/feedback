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
    Meteor.call('comments.vote', this.props.comment._id);
    console.log(this.props.comment.votes);
    
  }

  render() {
    return (

      <li className="clearfix">
         <img src="https://bootdey.com/img/Content/user_1.jpg" className="avatar" alt=""/>
          <div className="post-comments">
              <div className="meta">
                <div className="row">
                  <p className="col-sm-11">
                    {this.darfecha(this.props.comment.createdAt)}<a href="#">{this.props.comment.user.username}</a> says: </p>
                  <button type="button" className="btn btn-link col-sm-1" onClick={this.handleClick.bind(this)}>Votar</button>
                </div>
              </div>
              
              <p>
                  {this.props.comment.text}
              </p>
          </div>
        </li>
    );
  }
}
 
Comment.propTypes = {

  
};


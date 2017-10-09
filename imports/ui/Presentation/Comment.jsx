import React, { Component } from 'react';
import PropTypes from 'prop-types';

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


  render() {
    return (

      <li class="clearfix">
         <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt=""/>
          <div class="post-comments">
              <p class="meta">{this.darfecha(this.props.comment.createdAt)}<a href="#">{this.props.comment.user.username}</a> says: </p>
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


import React from 'react';

import './profile-view.scss'

import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class ProfileView extends React.Component{
 

  render(){
    const{ user, onBackClick }=this.props;
    
    return (
      <Row className="user-view justify-content-md-center">
        <Col md={8}>
          <div className="user-username">
            <span className="label">Username: </span>
            <span className="value">{user.Username}</span>
          </div>
          <div className="user-password">
            <span className="label">Current Password: </span>
            <span className="value">{user.Password}</span>
          </div>
          <div className="user-email">
            <span className="label">E-mail: </span>
            <span className="value">{user.Email}</span>
          </div>
          <div className="user-birthday">
            <span className="label">Birthday: </span>
            <span className="value">{user.Birthday}</span>
          </div>
         
          <div className="text-center">
            <Button onClick={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
        </Col>   
      </Row>
    );  
}
}
import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    console.log('login-view handleSubmit has executed')
    console.log(username);
    console.log(password);
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://movieboom.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data; // data is the user object from the users collection
      console.log(data)
      props.onLoggedIn(data);
    })
    .catch(e => {      
      console.log(e)
      alert('Invalid username or password')      ;
    });
  };

  return (
    <>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label className="label">Username:</Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="label">Password:</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>Log In</Button>
        </Col>
        <Col className="text-center">
          <Link to={'/register'}>
            <Button variant="outline-info">Register a New User</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
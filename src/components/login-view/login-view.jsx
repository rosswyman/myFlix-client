import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    console.log('it is making it this far')
    console.log(username);
    console.log(password);
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://movieboom.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  // For future development when needing it register new user
  // const handleNewUser = () => {
  //   // If the button to register a new user is clicked, unload LoginView and load RegistrationView
  //   console.log('requested new user'); 
  //   return <RegistrationView onRegistered={user => this.onRegistered(user)} />
  // };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label className="label">Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="label">Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
        
    </Form>
  );
}
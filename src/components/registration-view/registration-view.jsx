import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = () => {
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(birthday);

    axios.post('https://movieboom.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

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

      <Form.Group controlId="formEmail">
        <Form.Label className="label">Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      
      <Form.Group controlId="formBirthday">
        <Form.Label className="label">Birthday:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      
      <div className="text-center">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </div>
      
    </Form>
  );
}
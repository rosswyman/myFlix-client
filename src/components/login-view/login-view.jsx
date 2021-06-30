import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    // e.preventDefault(); // 2021_0630: disabled this line because it was throwing error "VM172:21 Uncaught ReferenceError: e is not defined"
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <form>
      <h1>User Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />
      {/* <button type="submit" onClick={handleSubmit}>Submit</button> 2021_0630 disabled along with e.preventDefault() above*/}
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
import React, { Component } from 'react';
import axios from 'axios';
import './profile-view.scss'
import { FavoriteCard } from '../favorite-card/favorite-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export class ProfileView extends React.Component{
  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      loading: false,
      newUsername: null,
      newPassword: null,
      newEmail: null
    };
 
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(event) {
    console.log('Current username: ' + this.state.username);
    console.log('Current password: ' + this.state.password);
    console.log('Current email: ' + this.state.email);
    console.log('Current birthday: ' + this.state.birthday);

    const token = localStorage.getItem("token");
    const url = 'https://movieboom.herokuapp.com/users/' +
        localStorage.getItem('user');
        this.setState({loading: true})

    const data = 
    {
      Username: this.state.username,
      Password: this.state.password,
      Email: this.state.email,
      Birthdate: this.state.birthdate
    };
    
    const config = {
      method: 'put',
      url: url,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      localStorage.setItem("user", data.Username);
      this.setState({user: response.data.Username})
      this.getUser(token)
      window.open('/users/'+localStorage.getItem("user"), '_self');
    })
    .catch(function (error) {
      console.log(error);      
    });

    event.preventDefault();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let url = 'https://movieboom.herokuapp.com/users/' +
        localStorage.getItem('user');
        this.setState({loading: true})
    axios
        .get(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data)
            this.setState({
              username: response.data.Username,
              password: response.data.Password,
              email: response.data.Email,
              birthday: response.data.Birthday,
              favoriteMovies: response.data.FavoriteMovies
            });
            this.setState({loading: false})
        });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://movieboom.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/remove/" +
      movie._id;

      const config = {
        method: 'post',
        url: url,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      };
      
      console.log(url)
      
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.getUser(token)
      })
      .catch(function (error) {
        console.log(error);
      });
   }

   handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }


 deleteUser(user) {
  const token = localStorage.getItem("token");
  const url =
    "https://movieboom.herokuapp.com/users/" +
    localStorage.getItem("user");

    const config = {
      method: 'delete',
      url: url,
      headers: { 
        'Authorization': `Bearer ${token}`,
      }
    };
    
    console.log(url)
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert('User '+JSON.stringify(response.data))
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');   
      window.open('/', '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
 }
  
  render(){
    const{  movies, token, onBackClick }=this.props;
    const {loading, username, password, email, birthday} = this.state;

    // This takes the list of all movies and filters so that only those in the user favorites show up
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });  

    if (loading) return '<div>Loading...</div>';

    return (
      <Row className="profile-view justify-content-md-center">       
        <Col>
          <h1>Welcome {username}</h1>

          <Row className="user-username">
            <Col xs={3}>
            <span className="label">Username: </span>
            </Col>
            <Col>
            <span className="value">{username}</span>
            </Col>  
          </Row>

          <Row className="user-email">
            <Col xs={3}>
              <span className="label">E-mail: </span>
            </Col>
            <Col>
              <span className="value">{email}</span>
            </Col>              
          </Row>

          <Row className="user-birthday">
            <Col xs={3}>
              <span className="label">Birthday: </span>
            </Col>
            <Col>
              <span className="value">{birthday}</span>
            </Col>
          </Row>

          <Row className="user-favorites">
            <Col xs={3}>
              <span className="label">Favorite Movies: </span>
            </Col>
            <Col>
            </Col>          
          </Row>

          <Row>               
            {favoriteMovieList.map((m)=> {
              return <Col md={3} key={m._id}>              
              <FavoriteCard movieData={m} user={username} />
              <div className="text-center">
                <Button variant="outline-info" onClick={()=>this.removeFavorite(m)}>Remove from Favorites</Button>
              </div>
            </Col>
            })}
          </Row>

          <Row>
            <Col className="back-button-col">
            <div className="text-center">
              <Button on  Click={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
            </div>
            </Col>
          </Row>

          <Form className="updated-user-info">
          <h3 style={{ textAlign: "center" }}>Update User Profile</h3>
            <Form.Group controlId="formNewUsername">
              <Form.Label className="label">Username:</Form.Label>
              <Form.Control type="text" name="username" onChange={(event) => this.handleChange(event)} placeholder="Update username"/>
            </Form.Group>
            
            <Form.Group controlId="formNewPassword">
              <Form.Label className="label">Password:</Form.Label>
              <Form.Control type="password" name="password" onChange={(event) => this.handleChange(event)} placeholder="Update password" />
            </Form.Group>
            
            <Form.Group controlId="formNewEmail">
              <Form.Label className="label">Email:</Form.Label>
              <Form.Control type="email" name="email" onChange={(event) => this.handleChange(event)} placeholder="Update email" />
            </Form.Group>

            <Form.Group controlId="formNewBirthday">
              <Form.Label className="label">Birthday:</Form.Label>
              <Form.Control type="date" name="birthday" onChange={(event) => this.handleChange(event)} placeholder="Update birthday" />
            </Form.Group>

              <div className="text-center">
                <Row>
                  <Col>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>Update User Info</Button>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={this.deleteUser}>Delete User</Button>
                  </Col>
                </Row>
              </div>  
            
          </Form>
        </Col>
      </Row>
    );  
}
}
Collapse




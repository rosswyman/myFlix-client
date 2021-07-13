import React, { useState } from 'react';
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

    this.handleUsernameChange=this.handleUsernameChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    // this.handleBirthdayChange=this.handleBirthdayChange(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event){
    this.setState({newUsername: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({newPassword: event.target.value});
  }

  handleEmailChange(event){
    this.setState({newEmail: event.target.value});
  }

  // handleBirthdayChange(event){
  //   this.setState({birthday: event.target.value});
  // }

  handleSubmit(event) {
    
    
    console.log('Current username: ' + this.state.username);
    console.log('Current password: ' + this.state.password);
    console.log('Current email: ' + this.state.email);
    console.log('Current birthday: ' + this.state.birthday);

    console.log('New username: ' + this.state.newUsername);
    console.log('New password: ' + this.state.newPassword);
    console.log('New email: ' + this.state.newEmail);
    // console.log('Current birthday: ' + this.state.birthday);
    
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
        this.componentDidMount();      
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
          <div className="user-username">
            <Row>
              <Col xs={2}>
              <span className="label">Username: </span>
              </Col>
              <Col>
              <span className="value">{username}</span>
              </Col>
              
              
            </Row>            
          </div>

        {/* <div className="user-password">
          <span className="label">Current Password: </span>
          <span className="value">{password}</span>
        </div> */}

        <div className="user-email">
          <Row>
            <Col xs={2}>
              <span className="label">E-mail: </span>
            </Col>
            <Col>
              <span className="value">{email}</span>
            </Col>              
          </Row>          
        </div>
        
        <div className="user-birthday">
          <Row>
            <Col xs={2}>
              <span className="label">Birthday: </span>
            </Col>
            <Col>
              <span className="value">{birthday}</span>
            </Col>    
              
          </Row>
          
        </div> 

        <div className="user-favorites">
          <Row>
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
        
        </div>
        <Row>
          <Col className="back-button-col">
          <div className="text-center">
            <Button on  Click={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
          </Col>
          
        </Row>
        

        <Form className="updated-user-info" onSubmit={this.handleSubmit}>
         
          <Form.Group controlId="formNewUsername">
            <Form.Label className="label">Username:</Form.Label>
            <Form.Control type="text" defaultValue={this.state.username} onChange={this.handleUsernameChange} />
          </Form.Group>
          
          <Form.Group controlId="formNewPassword">
            <Form.Label className="label">Password:</Form.Label>
            <Form.Control type="password" defaultValue={this.state.password} onChange={this.handlePasswordChange} />
          </Form.Group>
          
          <Form.Group controlId="formNewEmail">
            <Form.Label className="label">Email:</Form.Label>
            <Form.Control type="email" defaultValue={this.state.email} onChange={this.handleEmailChange} />
          </Form.Group>

          {/* <Form.Group controlId="formNewBirthday">
            <Form.Label className="label">Birthday:</Form.Label>
            <Form.Control type="date" defaultValue={this.state.birthday} onChange={this.handleBirthdayChange} />
          </Form.Group> */}

            <div className="text-center">              
              <Button variant="primary" type="submit">Update User Info</Button>
            </div>  
          
        </Form>
        </Col>
      </Row>
    );  
}
}
Collapse




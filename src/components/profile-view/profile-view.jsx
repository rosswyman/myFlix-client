import React from 'react';
import axios from 'axios';
import './profile-view.scss'
import { MovieCard } from '../movie-card/movie-card';
import { FavoriteCard } from '../favorite-card/favorite-card';
import { Link } from "react-router-dom";
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
      loading: false
    };
  
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
    "https://movieboom.herokuapp.com/users" +
    localStorage.getItem("user") +
    "/movies/remove" +
    movie._id;
  axios
    .delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      this.componentDidMount();
      // location.reload();
      alert(movie.Title + " has been removed from your Favorites.");
    });
  }

  updateUser() {
    const token = localStorage.getItem("token");
    const url =
      "https://movieboom.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .put(url, 
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthdate: this.state.Birthdate,
        },
        {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
          alert(movie.Title + " has been removed from your Favorites.");
      });
    }

  render(){
    const{  movies, onBackClick }=this.props;
    const {loading, username, password, email, birthday, favoriteMovies} = this.state;
    const favoriteMovieList = movies.filter((movie) => {

      return this.state.favoriteMovies.includes(movie._id);
    });

    console.log(favoriteMovieList)
    
    
    
    console.log('Favorite movies: '+favoriteMovieList)
    if (loading) return '<div>Loading...</div>';
    return (
      <Row className="profile-view justify-content-md-center">
        <Col md={8}>
          <div className="user-username">
            <span className="label">Username: </span>
            {/* <span className="value">{user.Username}</span> */}
            <span className="value">{username}</span>
          </div>
          {/* <div className="user-password">
            <span className="label">Current Password: </span>
            <span className="value">{password}</span>
          </div> */}
          <div className="user-email">
            <span className="label">E-mail: </span>
            <span className="value">{email}</span>
          </div>
          <div className="user-birthday">
            <span className="label">Birthday: </span>
            <span className="value">{birthday}</span>
          </div>
          
          <div className="user-favorites">
            <span className="label">Favorite Movies: </span>
            {/* <span className="value">{favoriteMovies }</span> */}
            </div>
            </Col>
            <Row>
            {favoriteMovieList.map((m)=> {
              return <Col md={3} key={m._id}>
              {/* <MovieCard movieData={m} /> */}
              <FavoriteCard movieData={m} user={username} />
             </Col>
            })}
            </Row>
           
          
          <div className="text-center">
            <Button onClick={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
          <div>
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
        <Form.Label className="label">Username:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      
      <div className="text-center">
        {/* <Button variant="primary" type="submit" onClick={handleSubmit}> */}
        <Button variant="primary" type="submit" onClick={()=>this.updateUser}>
          Submit
        </Button>
      </div>
        
    </Form>
          </div>
          
      </Row>
    );  
}
}
Collapse




import React from 'react';
import axios from 'axios';

import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component{

  constructor(){
    super();
    this.state={
      movies:[],
      selectedMovie: null,
      user: null,
   
    };
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
 
      });
      this.getMovies(accessToken);       
    }
  }
  
  getMovies(token) {
    axios.get('https://movieboom.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/

  setSelectedMovie(movie){
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
 

    this.setState({
      user: authData.user.Username,
    
    });    
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
   
    this.getMovies(authData.token);    
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

    //  When a user successfully registers
     onRegistered(newUser){
      this.setState({
        newUser
      });
    }

    
  render(){
    
    const{movies, user, selectedMovie}=this.state // This is an example of object destruction
    
    return (
      
      <div className="main-view-all">

        {/* Begin code for navbar */}
        <header>
          <Navbar bg="light" collapseOnSelect fixed='top' expand="lg" variant="light">
            <Navbar.Brand href="PLACEHOLDER" >myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-items">
                <Nav.Link href="/">Movies</Nav.Link>
                <Nav.Link href={`/users/${user}`}>Account</Nav.Link>
                
                <Nav.Link onClick={() => this.onLoggedOut()}>Log Out</Nav.Link>     
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        {/* End code for navbar */}

        {/* Begin code working 2021_0708 1022 */}
        {/* <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              
              <Col sm={6} md={3}> 
                <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
              
            ))
          }
        </Row> */}
        {/* End code working 2021_0708 1022 */}
      
        <Router>
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              

              //  If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              // Before the movies have been loaded
              if (movies.length===0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movieData={m} />
                </Col>
              ))
            }} />
            
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
              <RegistrationView />
            </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />   

            <Route path="/genres/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(g => g.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                {/* <GenreView movies={movies.filter( m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} /> */}

            </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            }
            } />

            <Route path={`/users/${user}`} render={({history }) => {
              
              return <Col md={8}>
              <ProfileView onBackClick={() => history.goBack()} />
              
              </Col>
            }} />    

          </Row>
      </Router>

      </div>
    );
  
    
  }
}
import React from 'react';
import axios from 'axios';
import './profile-view.scss'
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

  render(){
    const{  onBackClick }=this.props;
    const {loading, username, password, email, birthday, favoriteMovies} = this.state;
 
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
            <span className="value">{favoriteMovies }</span>
          </div>
          <div className="text-center">
            <Button onClick={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
        </Col>   
      </Row>
    );  
}
}
Collapse




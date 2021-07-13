import React from 'react';
import axios from 'axios';
import './profile-view.scss'
import { MovieCard } from '../movie-card/movie-card';
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

  updateUser(newUserData) {
    const token = localStorage.getItem("token");
    const url =
      "https://movieboom.herokuapp.com/users/" +
      localStorage.getItem("user");
    
    var data = JSON.stringify({
      "Username": "jackjack",
      "Password": "boomboom2 ",
      "Email": "incredible@gmail.com",
      "Birthday": "6/9/1963"
    });
    
    var config = {
      method: 'put',
      url: url,
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    const{  movies, token, onBackClick }=this.props;
    const {loading, username, password, email, birthday, favoriteMovies} = this.state;
    
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
          </Col>
          })}
          </Row>
        
        </div>

        <div className="text-center">
          <Button on  Click={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
        </div>

        <div>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label className="label">Username:</Form.Label>
              <Form.Control type="text" defaultValue={this.state.username}/>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="label">Password:</Form.Label>
              <Form.Control type="password" defaultValue={this.state.password}/>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="label">Email:</Form.Label>
              <Form.Control type="email" defaultValue={this.state.email}/>
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label className="label">Birthday:</Form.Label>
              <Form.Control type="date" defaultValue={this.state.birthday}/>
            </Form.Group>

            <div className="text-center">              
              <Button variant="primary" type="submit" onClick={()=>{updateUser(token)}}>Update User</Button>
            </div>  
          </Form>
        </div>
        </Col>
      </Row>
    );  
}
}
Collapse




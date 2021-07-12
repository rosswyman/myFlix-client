import React from 'react';
import axios from 'axios';
import './favorite-card.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";


export class FavoriteCard extends React.Component {
  

removeFavorite(movie) {
  const token = localStorage.getItem("token");
  const url =
    "https://movieboom.herokuapp.com/users/" +
    localStorage.getItem("user") +
    "/movies/Remove/" +
    movie._id;
  axios
    .post(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      this.componentDidMount();
        alert(movie.Title + " has been removed from your Favorites.");
    });
  }

 

  
  render() {
    const { movieData, user } = this.props;

    return (
      <Card bg="light">
        
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title className="text-center">{movieData.Title }</Card.Title>
          
          <div className="text-center">
            <Link to={`/movies/${movieData._id}`}>
              <Button variant="outline-info">Details</Button>
            </Link>
          </div>
          <br></br>
          <div className="text-center">
            
          <Button variant="outline-info" onClick={()=>this.removeFavorite(movieData)}>Remove from Favorites</Button>
          
          </div>           
        </Card.Body>
      </Card>
    
    );
  }
}

FavoriteCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  
};
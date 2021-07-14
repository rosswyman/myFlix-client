import React from 'react';

import './favorite-card.scss';

import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class FavoriteCard extends React.Component {
  
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
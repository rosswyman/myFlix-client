import React from 'react';

import './movie-view.scss'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component{
 

  render(){
    const{ movie, onBackClick }=this.props;
    
    return (

      <Row className="movie-view justify-content-md-center">
        <Col md={8}>
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genere">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="text-center">
            <Button onClick={()=>{onBackClick(null);}} variant="outline-primary">Back</Button>
          </div>
        </Col>   
      </Row>
    );  
}
}
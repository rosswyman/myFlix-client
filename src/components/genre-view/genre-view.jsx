import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './genre-view.scss';


export class GenreView extends React.Component{

  render(){
    const{ genre, movies, onBackClick }=this.props;
    
  
    
    return (
      <Row className="genre-view justify-content-md-center">
        <Col md={8}>
          <div className="genre-name">
            <span>The "{genre.Name}" Genre</span>
          </div>
          <div className="genre-description">
            <span>{genre.Description}</span>
          </div>
          <div>
        
          </div>
          <div className="text-center">
          <Button onClick={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
        </Col>   
      </Row>
    );  
}
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};
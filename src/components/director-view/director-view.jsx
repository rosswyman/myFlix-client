import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component{
 

  render(){
    const{ director, onBackClick }=this.props;
    
    return (
      <Row className="director-view justify-content-md-center">
        <Col md={8}>
          <div className="director-name">
            <span>Name: {director.Name}</span>
          </div>
          <div className="director-birth">
            <span>Born: {director.Birth}</span>
          </div>
          <div className="director-bio">
            <span>Biography: {director.Bio}</span>
          </div>
          <div className="text-center">
          <Button onClick={()=>{onBackClick(null);}} variant="outline-info">Back</Button>
          </div>
        </Col>   
      </Row>
    );  
}
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};
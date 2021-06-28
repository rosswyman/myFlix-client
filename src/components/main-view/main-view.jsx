import React from 'react';

export default class MainView extends React.Component{

  constructor(){
    super();
    this.state={
      movies:[
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
      ]
    }
  }

  render(){
    const{movies}=this.state // This is an example of object destruction

    if (movies.length===0) return <div className="main-view">The list is empty</div>;

    return(
      <div className="main-view">
        {movies.map(movie=><div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
  }
}
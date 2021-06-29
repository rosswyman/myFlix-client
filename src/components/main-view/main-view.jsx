import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component{

  constructor(){
    super();
    this.state={
      // movies:[
      //   { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/', Genre: 'Thriller', Director: 'Christopher Nolan'},
      //   { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/', Genre: 'Thriller', Director: 'Frank Darabont'},
      //   { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', ImagePath: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/',Genre: 'Action', Director: 'Ridley Scott'}
      // ],
      movies:[],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://movieboom.herokuapp.com/movies')
    .then(response=>{
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie  ){
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(user){
      this.setState({
        user
      });
    }

  render(){
    const{movies, selectedMovie}=this.state // This is an example of object destruction
    
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

    // Before the movies have been loaded
    if (movies.length===0) return <div className="main-view" />;

    return (
    <div className="main-view">
      {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        ))
      }
    </div>
   
    );
  }
}
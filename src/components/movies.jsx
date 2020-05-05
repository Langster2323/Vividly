import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService'

class Movies extends Component {
    state = { 
        movies: []
     }

     componentDidMount() {
        this.setState({
          movies: getMovies()
        })
      }
    
      handleTotalMovie = () => {
        const { movies } = this.state;
        const movieTotal = movies.length;
        return movieTotal
      }

      handleDelete = (movie) => {
        console.log(movie);
        
      }
      render() {
        const { movies } = this.state
        return (
          <main className="container">
            <h1>Hello World</h1>
            <h3>There are {this.handleTotalMovie()} movies</h3>
            <table className="table">
              <thead>
                <tr>
                  <th className="col">Title</th>
                  <th className="col">Genre</th>
                  <th className="col">Stock</th>
                  <th className="col">Rate</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => {
                  return (
                    <tr key={index}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </main>
        );
      }
}
 
export default Movies;
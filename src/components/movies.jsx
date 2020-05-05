import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'

class Movies extends Component {
    state = { 
        movies: []
     }

     componentDidMount() {
        this.setState({
          movies: getMovies()
        })
      }
    
      handleTotalMovie = (movies) => {
        const movieTotal = this.state.movies.length;
        return movieTotal
      }
      render() {
        const { movies } = this.state
        return (
          <main class="container">
            <h1>Hello World</h1>
            <h3>There are {this.handleTotalMovie()} movies</h3>
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Genre</td>
                  <td>Stock</td>
                  <td>Rate</td>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie, index) => {
                  return (
                    <tr>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td><button>Delete</button></td>
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
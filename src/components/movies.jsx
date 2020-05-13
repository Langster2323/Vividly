import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'
import Like from './common/like';
import Pagination from './common/pagination';

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
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({
          movies
        })
      }

      handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
        console.log('Liked', movie);
      }

      render() {
        const { movies } = this.state

        if (movies.length === 0) return <p>There are no movies in the database.</p>
        return (
          <main className="container">
            <React.Fragment>
              <h3>There are {this.handleTotalMovie()} movies</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col">Title</th>
                    <th className="col">Genre</th>
                    <th className="col">Stock</th>
                    <th className="col">Rate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => {
                    return (
                      <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                        </td>
                        <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination />
            </React.Fragment>
            
          </main>
        );
      }
}
 
export default Movies;
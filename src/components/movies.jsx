import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1
     }

     componentDidMount() {
      const genres = [{name: 'All Genres'}, ...getGenres()]

        this.setState({
          movies: getMovies(),
          genres
        })
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

      handlePageChange = (page) => {
        this.setState({
          currentPage: page
        })
      }

      handleGenreSelect = (genre) => {
        this.setState({ 
          selectedGenre: genre
         })
      }

      render() {
        const { pageSize, currentPage, selectedGenre,  movies: allMovies } = this.state

        

        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
        const movies = paginate(filtered, currentPage, pageSize)

        if (filtered.length === 0) return <p>There are no movies in the database.</p>
        return (
          <main className="container">
            <div className="row">
              <div className="col-3">
                <ListGroup 
                genres={this.state.genres} 
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect} />
              </div>
              <div className="col">
              <h3>There are {filtered.length} movies</h3>
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
              <Pagination 
              itemsCount={filtered.length} 
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
               />
              </div>
            </div>
            
          </main>
        );
      }
}
 
export default Movies;
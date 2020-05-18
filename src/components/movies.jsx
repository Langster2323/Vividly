import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

import { paginate } from '../utils/paginate';
import _ from 'lodash';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        sortColumn: { path: 'title', order: 'asc' },
        pageSize: 4,
        currentPage: 1
     }

     componentDidMount() {
      const genres = [{_id: '', name: 'All Genres'}, ...getGenres()]

        this.setState({
          movies: getMovies(),
          genres
        })
      }

      handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({
          movies
        })
      }

      handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
        console.log('Liked', movie);
      }

      handlePageChange = page => {
        this.setState({
          currentPage: page
        })
      }

      handleGenreSelect = genre => {
        this.setState({ 
          selectedGenre: genre,
          currentPage: 1
         })
      }

      handleSort = path => {
        const sortColumn = {...this.state.sortColumn}
        if (sortColumn.path === path) {
          sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
          sortColumn.path = path
          sortColumn.order = 'asc'
        }
        this.setState({ 
          sortColumn
         })
        
      }

      render() {
        const { pageSize, currentPage, sortColumn, selectedGenre,  movies: allMovies } = this.state

        const filtered = 
        selectedGenre && selectedGenre._id 
        ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
        : allMovies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)

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
              <MoviesTable 
              movies={movies} 
              onLike={this.handleLike}
              onSort={this.handleSort} 
              onDelete={this.handleDelete} />
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
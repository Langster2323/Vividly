import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';

import { Link } from "react-router-dom";

import { paginate } from '../utils/paginate';
import _ from 'lodash';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        searchQuery: '',
        selectedGenre: null,
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

      handleGenreSelect = genre => {
        this.setState({ searchGenre: genre, selectedQuery: "", currentPage: 1 })
      }

      handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
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

      handleSort = sortColumn => { 
        this.setState({ 
          sortColumn
         })
      }

      getPagedData = () => {
        const { 
          pageSize, 
          currentPage, 
          sortColumn, 
          selectedGenre, 
          searchQuery,  
          movies: allMovies } = this.state

          let filtered = allMovies;
          if (searchQuery) 
            filtered = allMovies.filter(movie => 
              movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
              );
          else if (selectedGenre && selectedGenre._id)
              filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
      }

      render() {
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state

        

        

        const {totalCount, data: movies} = this.getPagedData()

        if (totalCount === 0) return <p>There are no movies in the database.</p>
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
                <Link to="/movies/new" className="btn btn-primary">
                  New Movie
                </Link>
                
              <h3>There are {totalCount} movies</h3>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <MoviesTable 
              movies={movies} 
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onSort={this.handleSort} 
              onDelete={this.handleDelete} />
              <Pagination 
              itemsCount={totalCount} 
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
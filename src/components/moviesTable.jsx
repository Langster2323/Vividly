import React from 'react'
import Like from './common/like';


const MoviesTable = ({ movies, onLike, onDelete, onSort }) => {
    return ( 
        <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => onSort('title')} className="col">Title</th>
                    <th onClick={() => onSort('genre.name')} className="col">Genre</th>
                    <th onClick={() => onSort('numberInStock')} className="col">Stock</th>
                    <th onClick={() => onSort('dailyRentalRate')} className="col">Rate</th>
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
                          <Like liked={movie.liked} onClick={() => onLike(movie)} />
                        </td>
                        <td><button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
     );
}
 
export default MoviesTable;
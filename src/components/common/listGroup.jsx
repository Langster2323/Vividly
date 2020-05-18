import React from 'react'

const ListGroup = ({ genres, onItemSelect, textProperty, valueProperty }) => {
    return ( 
        <ul className="list-group">
            {genres.map((genre) => {
                return (
                    <li key={genre[valueProperty]} className="list-group-item" onClick={() => onItemSelect(genre)}>
                        {genre[textProperty]}
                    </li>
                )
                
            })}
        </ul>
     );
}
 
export default ListGroup;
import React from 'react'

const ListGroup = ({ genres, onItemSelect, textProperty, valueProperty, selectedItem }) => {
    return ( 
        <ul className="list-group">
            {genres.map((genre) => {
                return (
                    <li 
                    key={genre[valueProperty]} 
                    className={ genre === selectedItem ? "list-group-item active" : "list-group-item" }
                    onClick={() => onItemSelect(genre)}>
                        {genre[textProperty]}
                    </li>
                )
                
            })}
        </ul>
     );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
 
export default ListGroup;
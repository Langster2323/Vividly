import React from 'react'

const ListGroup = ({ items, onItemSelect }) => {
    return ( 
        <ul className="list-group">
            {items.map((genre) => {
                return (
                    <li className="list-group-item" onClick={() => onItemSelect(genre)} key={genre.id}>{genre.name}</li>
                )
                
            })}
        </ul>
     );
}
 
export default ListGroup;
import React from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {
    console.log(currentPage);
    
    const pagesCount = Math.ceil(itemsCount / pageSize);

    const pages = _.range(1, pagesCount + 1);
    
    if(pagesCount === 1) return null;
    return ( 
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => {
                    return (
                        <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item' }>
                            <a 
                            className="page-link" 
                            href="#" 
                            onClick={() => onPageChange(page)}>{page}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
     );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired
}
 
export default Pagination;

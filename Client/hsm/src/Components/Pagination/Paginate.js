import React from 'react';
import './Paginate.css';

const Paginate = (props) => {

    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(props.totalItems / props.itemsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {
                pageNumbers.map((pageNumber) => {
                    return(
                        <li key={pageNumber} className="page-item">
                             <button className="page-link" onClick={() => props.paginate(pageNumber)}>
                                {pageNumber}
                             </button>
                        </li>
                    )
                })
                }
            </ul>
        </nav>
    )
}

export default Paginate

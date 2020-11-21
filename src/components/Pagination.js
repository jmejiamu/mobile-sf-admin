import React from 'react';

const Pagination = ({ artPerPage, totalArt, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArt / artPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav >
            <ul className="pagination mb-4"  >
                {pageNumbers.map(number => (
                    <li key={number} className='page-item' >
                        <a onClick={() => paginate(number)} className='page-link' >{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
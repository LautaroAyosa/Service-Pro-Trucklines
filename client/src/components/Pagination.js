import React from "react";

const Pagination = ({rows, count, paginate, currentPage}) => {
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(count/rows); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination" style={{marginBottom: "0px"}}>
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
                        <a onClick={() => paginate(number)} className='page-link'>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>

    )
}

export default Pagination
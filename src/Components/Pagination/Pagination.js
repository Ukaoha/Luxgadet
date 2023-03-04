import React, { useState } from 'react';
import styles from './Pagination.module.scss';

import { number } from 'yup';

const Pagination = ({ currentPage, setCurrentPage, productPerPage, totalProducts}) => {
    const pageNumbers = []
    const totalPages = totalProducts / productPerPage
    const [pageNumnerLimit ,setPageNumberLimit] = useState(5)
    const [maxPageNumnerLimit ,setMaxPageNumberLimit] = useState(5)
    const [minPageNumnerLimit ,setMinPageNumberLimit] = useState(0)

    // paginate
    const paginate =(pageNumber) => {
        setCurrentPage(pageNumber)
    }


    // next page 
    const pageinateNext = () => {
        setCurrentPage(currentPage + 1)

        // next set of pagenumbers
        if(currentPage + 1 > maxPageNumnerLimit){
            setMaxPageNumberLimit(maxPageNumnerLimit + pageNumnerLimit)
            setMinPageNumberLimit(minPageNumnerLimit + pageNumnerLimit)

        }
    }
    // previosus page
    const pageinatePrev= () => {
        setCurrentPage(currentPage - 1)
        if((currentPage - 1 ) %  pageNumnerLimit == 0){
            setMaxPageNumberLimit(maxPageNumnerLimit + pageNumnerLimit)
            setMinPageNumberLimit(minPageNumnerLimit + pageNumnerLimit)

        }

    }



    for(let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++){
        pageNumbers.push(i)
    }


    return (
        <>
        <ul className={styles.pagination}> 
        <li onClick={pageinatePrev} className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}> Prev</li>
        {pageNumbers.map((number) => {
            if( number < maxPageNumnerLimit + 1 && number > minPageNumnerLimit){
                return (
                    <li key={number} onClick={() => paginate(number)} className={currentPage === number ?  `${styles.active} `: null}>{number}</li>
    
                )
            }})}
    

            
        <li onClick={pageinateNext}  className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}>Next</li>
        <p>
            <b className={styles.page}>{`page ${currentPage}`}</b>
            <span>of</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
        </p>

            
        </ul>
        </>
    );
}

export default Pagination;

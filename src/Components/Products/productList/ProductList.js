import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';
import ProductItem from '../productItem/ProductItem';
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectfilteredProducts, SORT_PRODUCTS } from '../../../Redux/Slice/filterSlice';
import Pagination from '../../Pagination/Pagination';

const ProductList = ({products}) => {
    const [grid, setGrid] = useState(true)
    const [search , setSearch] = useState('')
    const [sort, setsort] = useState('latest');
    const filteredProducts = useSelector(selectfilteredProducts)
    const dispatch = useDispatch();


    // paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);

    // get current products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    useEffect(() => {
        dispatch(SORT_PRODUCTS({products,sort}))


    }, [dispatch, products,sort]);

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({products,search}))


    }, [dispatch, products,search]);

    return (
        <div className={styles['product-list']} id='product'>
            <div className={styles.top}>
            <div className={styles.icons}>
                <BsFillGridFill size={22} color='orangered' onClick={() => setGrid(true)}/>
                <FaListAlt size={24} color='#00664d4' onClick={() => setGrid(false)}/>
                <p><b>{filteredProducts.length}</b> products found</p>


            </div>
            <div>
                <div className={styles.search}>
                <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className={styles.sort}>
                <label>Sort By</label>
                <select value={sort} onChange={(e) => setsort(e.target.value)}>
                    <option value='lowest-price'>Lowest price</option>
                    <option value='highest-price'>Hiegest price</option>
                    <option value='latest'>Latest price</option>
                    <option value='a-z'>A-Z</option>
                    <option value='z-a'>Z-A</option>


                </select>


            </div>
            


            </div>
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                 {currentProducts.length === 0 ? (
    <p>No products found</p>
) : (
    <>
    {currentProducts.map((product) => {
        return(
            <div key={product.id}>
                <ProductItem {...product}grid={grid} product={product}/>

            </div>
        )
    })}
    </>
)}


            </div>
            <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
             productPerPage={productPerPage}
             totalProducts = {filteredProducts.length}
             />

            
        </div>
    );
}

export default ProductList;

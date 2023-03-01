import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';
import ProductItem from '../productItem/ProductItem';
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectfilteredProducts } from '../../../Redux/Slice/filterSlice';

const ProductList = ({products}) => {
    const [grid, setGrid] = useState(true)
    const [search , setSearch] = useState('')
    const filteredProducts = useSelector(selectfilteredProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({products,search}))


    }, [dispatch, products,search]);
    return (
        <div className={styles['product-list']} id='product'>
            <div className={styles.top}>
            <div className={styles.icons}>
                <BsFillGridFill size={22} color='orangered' onClick={() => setGrid(true)}/>
                <FaListAlt size={24} color='#00664d4' onClick={() => setGrid(false)}/>
                <p><b>10</b> products found</p>


            </div>
            <div>
                <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={styles.sort}>
                <label>Sort By</label>
                <select>
                    <option>Lowest price</option>
                    <option>Hiegest price</option>
                    <option>Latest price</option>
                    <option>A-Z</option>
                    <option>Z-A</option>


                </select>


            </div>
            


            </div>
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                {products.length == 0 ? (
                    <p>No products found</p>
                 ) : (
                    <>
                {filteredProducts.map((product) => {
                    return(
                        <div key={product.id}>
                            <ProductItem {...product}grid={grid} product={product}/>


                        </div>
                    )

                })}
                    </>
                 )}

            </div>

            
        </div>
    );
}

export default ProductList;

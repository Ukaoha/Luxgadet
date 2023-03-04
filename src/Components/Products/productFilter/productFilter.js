import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './productFilter.module.scss'
import  {selectMaxPrice, selectMinPrice, selectProducts} from '../../../Redux/Slice/ProductSlice'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../Redux/Slice/filterSlice';




const ProductFilter = () => {

    const products = useSelector(selectProducts)
    const highestPrice = Math.max(...products.map(product => product.price));

    const [category,setCategory] = useState('All');
    const [brand,setBrand] = useState('All');
    const [price,setPrice] = useState(highestPrice);
    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice)

    const dispatch = useDispatch()

    const allCategories = [
        'All',
        ...new Set(products.filter((product) => product.category).map((product) => product.category))
    ]
    console.log(allCategories)

    const allBrands = [
        'All',
        ...new Set(products.filter((product) => product.brand).map((product) => product.brand))
    ]
    console.log(allBrands)

    useEffect(() => {
        dispatch(FILTER_BY_BRAND({products,brand: brand}))
    }, [dispatch ,products,brand]);

    useEffect(() => {
        dispatch(FILTER_BY_PRICE({products, price}))
    }, [dispatch ,products,price]);


    const filterProducts = (cat) => {
        setCategory(cat)
        dispatch(FILTER_BY_CATEGORY({products, category: cat}))
    }
    const clearFilters = () => {
        setCategory('All')
        setBrand('All')
        setPrice(highestPrice)
    }

    return (
        <div className={styles.filter}>
            <h4>Categories</h4>
            <div className={styles.category}>
                {allCategories.map((cat, index) => {
                    return (
                        <button key={index} type='button'
                         className={`${category}` === cat ? `${styles.active}`:
                        null} 
                        onClick={() => filterProducts(cat)}
                        >
                           &#8250; {cat}
                        </button>
                    )
                })}

            </div>
            <h4>Brand</h4>
            <div className={styles.brand}>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {allBrands.map((brand, index) => {
                        return(
                            <option key={index} value={brand} >{brand}</option>

                        )
                    })}
                </select>
                <h4>Price</h4>
                <p>{`${price}`}</p>
                <div className={styles.price}>
                    <input type='range' value={price} onChange={(e) => setPrice(e.target.value)} min={minPrice} max={highestPrice} />
                </div>

                <div>
                    <button className='--btn' onClick={clearFilters}> 
                        clear filter
                    </button>
                </div>

            </div>

            
        </div>
    );
}

export default ProductFilter;


import React from 'react';
import styles from './productFilter.module.scss'


const ProductFilter = () => {
    return (
        <div className={styles.filter}>
            <h4>Categories</h4>
            <div className={styles.category}>
                <button>All</button>

            </div>
            <h4>Brand</h4>
            <div className={styles.category}>
                <select name='brand'>
                    <option>All</option>
                </select>
                <h4>Price</h4>
                <p>1999</p>
                <div className={styles.price}>
                    <input type='range' name='price' min={100} max={1000} />
                </div>

                <div>
                    <button className='--btn'>
                        clear filter
                    </button>
                </div>

            </div>

            
        </div>
    );
}

export default ProductFilter;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductItem.module.scss'


const ProductItem = ({product, grid, id, name,desc,imageUrl,price}) => {


    const shortenText = (texts , n) => {
        if (texts.length > n) {
            const shortenedText = texts.substring(0, n).concat("...");
            return shortenedText;
        } else {
            return texts;
        }
    }
    


    return (
        <div className={grid ?`${styles.grid}` : `${styles.list}` }>
            <Link to={`/product-details/${id} `}>
            <div className={styles.img}>
                <img src={imageUrl} alt={name}/>
            </div>
            </Link>
            <div className={styles.content}>
                <div  className={styles.details}>
                    <p>{`${price}`}</p>
                    {/* <h4>{shortenText(name , 18)}</h4> */}
                    <h4>{shortenText(name ? name : '', 18)}</h4>


                </div>
                {!grid && <p className={styles.desc}>{shortenText(desc , 200)}</p>}
                <button className='--btn--btn--danger'>Add to cart</button>

            </div>

            
        </div>
    );
}

export default ProductItem;

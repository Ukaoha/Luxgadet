import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/Config';
import Loader from '../../Loader/Loader';
import styles from './ProductDetails.module.scss'


const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    

        

    const getProduct = async () => {
        const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
  const obj = {
    id: id,
    ...docSnap.data()
    
  }
  setProduct(obj)
} else {
  // doc.data() will be undefined in this case
  toast.error('product not found')
}
  };
    useEffect(() => {
        getProduct()  

        }, []);

    return (
        <section>
        <div className={`container ${styles.product}`}>
            <h2>Product Details</h2>
            <div>
                <Link to='/#products'>
                    &larr; Back to product
                </Link>
            </div>
            {/* {product === null ? (
                <h2>loaading...</h2>
            ): ( */}
            {product && 
                <div className={styles.details}>
                    <div className={styles.img}>
                        <img src={product.imageUrl} alt={product.name} />

                    </div>
                    <div className={styles.title}>
                        <h3>{product.name}</h3>
                        <p className={styles.price}>{`#${product.price}`}</p>
                        <p>{product.desc}</p>
                        <p>
                            <b>SKU </b>{product.id}
                        </p>
                        <p>
                            <b>SKU </b>{product.brand}
                        </p>
                    <div className={styles.count}>
                        <button className='--btn'>-</button>
                        <p><b>1</b>  </p>

                        <button className='--btn'>+</button>

                        </div>  
                        <button className='--btn--btn-danger'>Add to cart</button>

                    </div>

                </div>
                }
            {/* )} */}
            
        </div>
        </section>
    );
}


export default ProductDetails;

import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/Config';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../Redux/Slice/cartSlice';
import Loader from '../../Loader/Loader';
import styles from './ProductDetails.module.scss'



const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems)

    const cart = cartItems.find((cart) => cart.id === id)


    const  addTOCart = () => {
        dispatch(ADD_TO_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY(product))

    }
    const  decreaseCart = () => {
        dispatch(DECREASE_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY(product))

    }

    const isCartAdded = cartItems.findIndex((cart) => {
        return cart.id === id
    })

    
        

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
                        {isCartAdded < 0 ? (
                            <button className='--btn--btn-danger' onClick={() => addTOCart(product)}>Add to cart</button>

                        ) :(
                        
                            <>
                            
                        
                         <button className='--btn'  onClick={() => decreaseCart(product)}>-</button>
                         <p><b>{cart.cartQuantity}</b>  </p>
                         {/* <p><b>{cart ? cart.cartQuantity : 0}</b>  </p> */}


                        <button className='--btn'  onClick={() => addTOCart(product)}>+</button>

                        
                        {/* <button className='--btn--btn-danger' onClick={() => addTOCart(product)}>Add to cart</button> */}
                        </>
                     )}  

                        </div>  
                       

                    </div>


                </div>
                }
            {/* )} */}
            
        </div>
        </section>
    );
}


export default ProductDetails;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartToatalAmount, selectCartTotalQuantity } from '../../Redux/Slice/cartSlice';
import styles from './CheckoutSummary.module.scss'

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartToatalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
      }, [dispatch]);
    
    return (
        <div>
            <h3>Checkout summary</h3>
            {cartItems.length === 0 ? (
                <>
                 <p>No item in your cart</p>
                <button><Link to='/#products'>
                
                </Link></button>
                </>

            ) : (
                <div className={styles.wrappper}>
                    <p><b>{`Cart item(s): ${cartTotalQuantity}`}</b></p>
                    <div className={styles.text}>
                        <h4>Subtotal</h4>
                        <h3>{cartTotalAmount}</h3>


                    </div>
                    <div>

                        {cartItems.map((item, Index) => {
                            const {id , name, price, cartQuantity , imageUrl} = item
                            return(
                                <div key={id} >
                                 <div  className={styles.card}>


                                    <img src={imageUrl}/>
                                      <h4>{name}</h4>
                                      </div>
                                      <div className={styles.desc}> 
                                    <p>Quantity: <span> {cartQuantity}</span></p>
                                    <p>Unit price <span>{price.toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}</span></p>
                                    <p>Set Price: <span>{(price * cartQuantity).toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}</span> </p>
                                    </div>



                                </div>


                            )
                        })}
                    </div>

                </div>
            )}
            
        </div>
    );
}

export default CheckoutSummary;

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
                <div>
                    <p><b>{`Cart item(s): ${cartTotalQuantity}`}</b></p>
                    <div className={styles.text}>
                        <h4>Subtotal</h4>
                        <h3>{cartTotalAmount.toFixed(2)}</h3>


                    </div>
                    <div>

                        {cartItems.map((item, Index) => {
                            const {id , name, price, cartQuantity} = item
                            return(
                                <div key={id} className={styles.card}>
                                    <h4>Product : {name}</h4>

                                    <p>Quantity: {cartQuantity}</p>
                                    <p>Unit price :{price}</p>
                                    <p>Set Price: {price * cartQuantity} </p>


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

import { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../Redux/Slice/authSlice';
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartToatalAmount, selectCartTotalQuantity, selectPreviousUrl } from '../../Redux/Slice/cartSlice';
import styles from './Cart.module.scss'
const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartToatalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    console.log(cartTotalAmount)

// INCREASE CART
    const increaseCart = (cart) => {
        dispatch(ADD_TO_CART(cart))

    }
// Add Cart
    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart))
        
    }
// remove cart
    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart))
    }
    // clear cart
    const clearCart = () => {
        dispatch(CLEAR_CART())
    }

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL())
        dispatch(CALCULATE_TOTAL_QUANTITY())
        dispatch(SAVE_URL(''))

    }, [dispatch, cartItems]);

    const url = window.location.href;
    
    const checkOut = () => {
        if(isLoggedIn) {
            navigate('/checkout-details')

        }else{
            dispatch(SAVE_URL(url))
            navigate('/login')
        }

    }



    
    console.log(cartTotalAmount)
    return (  
        <div className='section'>
            <div className={`container ${styles.table}`}>
                <h2>Shopping Cart</h2>
                {!cartItems || cartItems.length === 0 ? (
                    <>
                    <div className={styles.empt}>
                        <p>Your cart is empty</p>
                    <br></br>
                    <div>
                        <Link to='/#products'>&larr; Continue shoping </Link>
                    </div>
                    </div>

                    </>
                ) : (
                    <>
                        <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quanttity</th>
                                <th>Total</th>
                                <th>Actions</th>



                            </tr>

                        </thead>
                        <tbody>
                            {cartItems.map((cart, index) => {
                                const {id, name, price,imageUrl, cartQuantity} = cart;
                                return (
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p><b>{name}</b></p>
                                            <img src={imageUrl} alt={name} style={{width: '100px'}} />
                                        </td>
                                        {/* <td>{price}</td> */}
                                        <td>{price.toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}</td>

                                        <td>
                                            <div className={styles.count}>
                                                <button className='--btn ' onClick={() => decreaseCart(cart)}>-</button>
                                                <p><b>{cartQuantity}</b></p>
                                                <button className='--btn' onClick={() => increaseCart(cart)}>+</button>

                                            </div>
                                        </td>
                                        <td>
                                        {(price * cartQuantity).toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}



                                        </td>
                                        <td className={styles.icons}><FaTrashAlt size={18} color='red'
                                        onClick={() => removeFromCart(cart)}
                                        /> </td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <div className={styles.summary}> 
                    <a className='--btn --btn-danger' 
                    onClick={clearCart}
                    >Clear cart</a>
                    <div className={styles.checkout}>

                        <Link className={styles.continue} to='/#products'>&larr; Continue Shopping </Link>
                    <div className={styles.card}>
                        <p className={styles.p}>Card item(s): <span>{` ${cartTotalQuantity}`}</span></p>
                      <p className={styles.p}>Subtotal: <span>{`₦ ${cartTotalAmount.toFixed(2)}`}</span></p>

                        
                        <p className={styles.tax}>Tax Shopping calculated at checkout</p>
                        <button className=' --btn --btn-primary --block' onClick={checkOut}>
                          Checkout

                        </button>
                        </div>
                        </div>

                    </div>
                    {/* </div> */}

                    </>

                )}
            </div>
        </div>

    );
}
 
export default Cart;






// import styles from './Cart.module.scss'

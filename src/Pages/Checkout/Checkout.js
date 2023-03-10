

import React, { useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import { selectEmail, selectUserName } from '../../Redux/Slice/authSlice';
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartToatalAmount } from '../../Redux/Slice/cartSlice';
import { selectBillingAddress, selectShippingAddress } from '../../Redux/Slice/checkoutSlice';
import { useFlutterwave, FlutterwaveButton, FlutterWaveButton } from 'flutterwave-react-v3';
import styles from './Checkout.module.scss'


const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectCartToatalAmount);
    const customerEmail = useSelector(selectEmail);
    const name = useSelector(selectUserName)
  
    const shippingAddress = useSelector(selectShippingAddress);
    const billingAddress = useSelector(selectBillingAddress);
    console.log(customerEmail);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(CALCULATE_SUBTOTAL());
      dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch, cartItems]);
  

    // flutterwave 
    const config = {
        public_key: 'FLWPUBK_TEST-bd7b71b3c9112ddb843f179fac831bf0-X', // replace with your Flutterwave public key
        tx_ref: Date.now(), // a unique reference number
        amount: totalAmount,
        currency: 'NGN', // change this to your preferred currency
        payment_options: 'card',
        customer: {
          email: customerEmail,
          name: name,
        },
        customizations: {
          title: 'My Online Store',
          description: 'Payment for items in cart',
        //   logo: 'https://assets.piedpiper.com/logo.png',
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config);
    

   

    return (
        <div className={styles.buttons}>
            <CheckoutSummary/>
            <PaystackButton
             className={styles.paystack}
              email={customerEmail}
               amount={totalAmount * 100}
               
                metaData={{ name }}
                 publicKey="pk_test_9876a5216aa5caf77e4d8c2e014453a13e28ee5c"
                 text="Pay with Paystack"
                onSuccess={() => toast.success("You have Successfully bought our product")}
                 onClose={() => toast.error("Transaction was unsuccessful")}
                 />

            <div>
            <button onClick={handleFlutterPayment}className={styles.flutterwave}>Pay with Flutterwave</button>

            </div>

            
        </div>
    );
}

export default Checkout;


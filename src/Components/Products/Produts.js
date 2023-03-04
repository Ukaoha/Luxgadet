import { useEffect, useState } from "react";
import { FaCogs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import UseFetchCollection from "../../customHook.js/useFetchCollection";
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from "../../Redux/Slice/ProductSlice";
import Loader from "../Loader/Loader";
import ProductFilter from "./productFilter/productFilter";
import ProductList from "./productList/ProductList";
import styles from './Products.module.scss'

const Product = () => {
    const {data, isLoading} = UseFetchCollection('products')
    const products = useSelector(selectProducts)
    const [showFilter, setshowFilter] = useState(false);

    const dispatch = useDispatch()
    console.log(products);

    useEffect(() => {
            dispatch(STORE_PRODUCTS ({
        products: data,
    }))

    dispatch(GET_PRICE_RANGE({
        products:data ,
    }))


    }, [dispatch, data])

    const toggleFilter =  () => {
        setshowFilter(!showFilter)

    }

    return ( 
        <section>
        <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
            {isLoading ? null : <ProductFilter/>} 

        </aside>

        <div className={styles.content}>
            {isLoading ? (
                 <Loader/> 
            ) : (
                <ProductList products={products}/>

            )}
            <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color='orangered'/>
            <p>
                <b>{showFilter ? 'Hide filter' : 'show filter'}</b>
            </p>

                
            </div>

        </div>

        </div>  
        </section>      
    );
}
 
export default Product;






// import styles from './Cart.module.scss'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFetchCollection from "../../customHook.js/useFetchCollection";
import { selectProducts, STORE_PRODUCTS } from "../../Redux/Slice/ProductSlice";
import Loader from "../Loader/Loader";
import ProductFilter from "./productFilter/productFilter";
import ProductList from "./productList/ProductList";
import styles from './Products.module.scss'


const Product = () => {
    const {data, isLoading} = UseFetchCollection('products')
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()
    console.log(products);

    useEffect(() => {
            dispatch(STORE_PRODUCTS ({
        products: data,
    }))


    }, [dispatch, data])

    return ( 
        <section>
        <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
            {isLoading ? null : <ProductFilter/>} 

        </aside>

        <div className={styles.content}>
            {isLoading ? (
                 <Loader/> 
            ) : (
                <ProductList products={products}/>

            )}

        </div>

        </div>  
        </section>      
    );
}
 
export default Product;






// import styles from './Cart.module.scss'

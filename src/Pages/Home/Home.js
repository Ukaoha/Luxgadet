
import { useEffect } from "react";
import AdimnRoute from "../../Components/AdimnRoute/AdminRoute";
import Product from "../../Components/Products/Produts";
import Slider from "../../Components/Slider/Slider";

const Home = () => {
    const url = window.location.href

    const scrollToProducts = () =>{
        if(url.includes('#products')) {
            window.scrollTo({
                top: '700',
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        scrollToProducts()
    }, []);

    return ( 
        <div>
            <Slider/>
            <Product/>
        </div>
     );
}
 
export default Home;

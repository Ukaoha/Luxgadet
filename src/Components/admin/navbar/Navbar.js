import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUserName } from '../../../Redux/Slice/authSlice';
import styles from './Navbar.module.scss'


const activeLink =(({isActive}) =>
 (isActive ? `${styles.active}` : ""   )
)

const Navbar = () => {
    const userName = useSelector(selectUserName)

    return (  

        <div className={styles.navbar}>
            <div className={styles.user}>
                <FaUserCircle size={40} color='#eee' />
                <h3> {userName}</h3>


            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='home' className={activeLink}>
                            Home

                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='all-products' className={activeLink}>
                            View Products

                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='view-orders' className={activeLink}>
                            View Orders

                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='add-product' className={activeLink}>
                            Add Product

                        </NavLink>
                    </li>

                </ul>
            </nav>



        </div>
    );
}
 
export default Navbar;






// import styles from './Cart.module.scss'

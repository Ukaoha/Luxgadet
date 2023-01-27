import  styles from './Header.module.scss'
import { Link, NavLink } from 'react-router-dom';
import {FaShoppingCart, FaTimes} from 'react-icons/fa';
import {RiMenu3Fill} from 'react-icons/ri'
import { useState } from 'react';

const logo = (
    <div className={styles.logo}>
        <Link to="/">
       <h2>
        Lu<span>xG</span>adget
        </h2>
        </Link>
        </div>


)
const cart =(
    <span className={styles.cart}>
    <Link to="/cart">
        Cart <FaShoppingCart size={20} />
    </Link>

</span>



)
const activeLink =(({isActive}) =>
 (isActive ? `${styles.active}` : ""   )
)

const Header = () => {
    const [showMenu , setShowmenu] = useState(false)

    // show menue
    const toggleMenu = () => {
        setShowmenu(true)
    }
    // hide menu
    const hideMenu = () => {
        setShowmenu(false)
    }
    return ( 
        <header>
                <div className={styles.header}>

                    {logo}

                    <nav className={ 
                        showMenu ? 
                        `${styles['show-nav']}` : `${styles['hide-nav']}`}>

                        <div className={
                            showMenu 
                            ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                        : `${styles['nav-wrapper']}`
                    }
                    onClick={hideMenu}
                    >
                        </div>


                        <ul onClick={hideMenu}>
                            <li className={styles['logo-mobile']}>
                                {logo}
                                <FaTimes size={22} color="#ff" onClick={hideMenu} />
                            </li>
                            <li>
                                {/* setting active link */}
                                <NavLink to='/'
                                 className={activeLink}>Home</NavLink>
                            </li>

                            <li>
                                <NavLink to='/contact' className={activeLink}>Contact Us</NavLink>
                            </li>

                        </ul>
                    

                    <div className={styles['header-right']} onClick={hideMenu}>
                        <span className={styles.links}>
                            <NavLink to='/login'  className={activeLink}>Login</NavLink>
                            <NavLink to='/register'  className={activeLink}>Register</NavLink>
                            <NavLink to='/order-history'className={activeLink}>Order</NavLink>      
                        </span>
                        {cart}
                    </div>
                    </nav>
                    <div  className={styles['menu-icon']}>
                        {cart}
                        <RiMenu3Fill size={28} onClick={toggleMenu}/>
                    </div>
                    </div>

        </header>

        
    );
}
 
export default Header;
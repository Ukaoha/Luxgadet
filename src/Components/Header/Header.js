import  styles from './Header.module.scss'
import { Link, NavLink } from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa';
import {RiMenu3Fill} from 'react-icons/ri'
import { useEffect, useState } from 'react';
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast,  ToastContainer  } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../Redux/Slice/authSlice';
import ShowOnLogin, { ShowOnLogOut } from '../HiddenLinks/HiddenLinks';



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
    const navigate =  useNavigate();
    const dispatch = useDispatch()

    const [showMenu , setShowmenu] = useState(false)
    const [displayName, setDisplayName] = useState("")


    // show menue
    const toggleMenu = () => {
        setShowmenu(true)
    }
    // hide menu
    const hideMenu = () => {
        setShowmenu(false)
    }
    // monitor currently signed in user
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user)
              const uid = user.uid;
            //   console.log(user.displayName);

              if(user.displayName == null ) {
                const u1 = user.email.substring(0, user.email.indexOf('@'));
                const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
                console.log(uName);
                setDisplayName(uName)
              } else {
                setDisplayName(user.displayName)


              }

              dispatch(SET_ACTIVE_USER({
                email: user.email, 
                userName: user.displayName ? user.displayName : displayName,
                userID: user.uid, 
              }))

            } else {
                setDisplayName("");
                dispatch(REMOVE_ACTIVE_USER())

            }
          });
          

    }, [dispatch, displayName])

    const logoutUser = () => {

        signOut(auth).then(() => {
            toast.success('logged out successfully')
            navigate("/" )
          }).catch((error) => {
            // An error happened.
            toast.error(error.message)
          });
          
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
                            {/* <ShowOnLogOut>
                            <NavLink to='/login'  className={activeLink}>Login</NavLink>
                            </ShowOnLogOut> */}
                            <ShowOnLogin>
                            <a href="#" style={{color: '#ff7722'}}><FaUserCircle size={16}  />
                            Hi,👋 {displayName}
                            </a>
                            </ShowOnLogin>
                            <ShowOnLogOut>

                            <NavLink to='/register'  className={activeLink}>Sign up</NavLink>
                            </ShowOnLogOut>

                            <ShowOnLogin>
                                     <NavLink to='/order-history'className={activeLink}>Order</NavLink>
                             </ShowOnLogin>


                            <ShowOnLogin>   
                            <NavLink to='/'onClick={logoutUser}>Logout</NavLink>    
                            </ShowOnLogin>   
  
                        </span>
                        {cart}
                    </div>
                    </nav>
                    <div  className={styles['menu-icon']}>
                        {cart}
                        <RiMenu3Fill size={28} onClick={toggleMenu}/>
                    </div>
                    </div>
                    <ToastContainer/>

        </header>

        
    );
}
 
export default Header;
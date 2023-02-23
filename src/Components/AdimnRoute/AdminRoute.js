import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../Redux/Slice/authSlice";
import  styles from './AdminRoute.module.scss'


const AdimnRoute = ({children}) => {
    const userEmail = useSelector(selectEmail)

    if(userEmail === 'grace30@gmail.com') {
        return children

    }
    return (
        <section className={styles.section}>
            <div className={styles.main}>

            <h2>Permission Denied ⚠️⚠️⚠️</h2>
            <p>This page can only be viewd by an admin user</p>

            <Link to={'/'} >
            <button className="btn">&larr; Back to home</button>
         </Link>
         </div>

        </section>
    )
}

export const AdimnRouteLink = ({children}) => {
    const userEmail = useSelector(selectEmail)

    if(userEmail === 'grace30@gmail.com') {
        return children

    }
    return null 
}

 
export default AdimnRoute;
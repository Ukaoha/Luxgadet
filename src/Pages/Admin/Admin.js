import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/admin/AddProduct/AddProduct';
import Home from '../../Components/admin/home/Home';
import Navbar from '../../Components/admin/navbar/Navbar';
import ViewOrders from '../../Components/admin/Orders/ViewOrders';
import ViewProducts from '../../Components/admin/ViewProducts/ViewProducts';
import styles from './Admin.module.scss'
const Admin = () => {
    return (

      <div className={styles.admin}>
        <div className={styles.navbar}>
          <Navbar/>
          
        </div>
        <div className={styles.content}>
          <Routes>
            <Route path='home' element={ <Home/>} />
            <Route path='all-products' element={ <ViewProducts/>} />
            <Route path='add-product/:id' element={<AddProduct/>}/>
            <Route path='view-orders' element={<ViewOrders/>}/>






          </Routes>
          
        </div>

      </div>
      );
}
 
export default Admin;
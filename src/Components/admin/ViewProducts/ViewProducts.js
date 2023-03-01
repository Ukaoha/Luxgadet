import { collection, query, orderBy, onSnapshot,  doc, deleteDoc  } from "firebase/firestore";
import {  ref, deleteObject } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db  , storage} from "../../../firebase/Config";
import  styles from './ViewProducts.module.scss'
import {FaEdit , Fa, FaTrashAlt} from 'react-icons/fa'
import Loader from "../../Loader/Loader";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../../Redux/Slice/ProductSlice";
import UseFetchCollection from "../../../customHook.js/useFetchCollection";

 

const ViewProducts = () => {
    const {data, isLoading} = UseFetchCollection('products')
    const products = useSelector(selectProducts)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(STORE_PRODUCTS ({
        products: data,
    }))


    }, [dispatch, data])



    // confirm delete 
    const confirmDelete = (id ,imageUrl) => {
        Notiflix.Confirm.show(
            'Delete Product',
            'Are you sure you want to delete this product ? ',
            'Delete',
            'Cancel',
            function okCb() {
                deletProduct(id , imageUrl)
            },
            function cancelCb() {
                console.log('delet caceled');
            },
            {
              width: '320px',
              borderRadius: '3px',
              titleColor: 'orangered',
              okButtonBackground: 'orangered',
              cssAnimationStyle: 'zoom'
              // etc...
            },
          );
          
    }

    // detele prpduct
    const deletProduct = async (id , imageUrl) => {
        try{
            await deleteDoc(doc(db, "products", id));
            const storageRef = ref(storage, imageUrl);

            await deleteObject(storageRef)
                // File deleted successfully
                toast.success('products deleted successfully')
              }catch(error) {
                // Uh-oh, an error occurred!
                toast.error('Uh-oh, an error occurred!')
              };
              



    }

    return ( 
        <> 
        {isLoading && <Loader/>}
        <div className={styles.table}>
            <h2> All products</h2>
            {products.length === 0 ? (
                <p>No product Found</p>
            ) : (
                <table>
                
                 <thead>

                    <tr>
                        <th>S/N</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th></th>

                    </tr>
                    </thead>
                    <tbody>                        
                    {products.map((product , index) => {
                        const{id, name, price, imageUrl, category } = product;
                        return(
                                    <tr key={id}>
                                <td>{index + 1}</td>
                                <td><img src={imageUrl} alt={name}style={{width: '100px'}} /> </td>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td>{`#${price}`}</td>
                                <td>{category}</td>
                                <td className={styles.icons}>
                                    <Link to={`/admin/add-product/${id}`}>
                                        <FaEdit size={20} color='green'/>
                                    </Link>
                                     &nbsp;
                                        <FaTrashAlt size={20} color='red' onClick={() => confirmDelete(id , imageUrl)}/>
                                </td>



                            </tr>

                        )
                        

                    })}
                           </tbody>

                </table>
            )}
        </div>
        </>

        );
}
 
export default  ViewProducts;




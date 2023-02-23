import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from "../../Loader/Loader";
import  styles from './AddProduct.module.scss'


const categories= [
    {id: 1, name: 'lLaptop'},
    {id: 2, name: 'Electronics'},

    {id: 3, name: 'Fahion'},

    {id: 4, name: 'Phone'},


]

// {categories.map((cat) => {
//     return(
//         <option key={cat.id} value={cat.name}>
//             {cat.name}

//         </option>
//     )
// })}
const AddProduct = () => {
    const [isLoading , setIsLoading] = useState(false)

    const [product , setProduct] = useState({
        name: '',
        imageUrl:'',
        price: null,
        category:'',
        brand:'', 
        desc:'',

    })
    return (  
        <>
        <Formik
        initialValues={{ productName: '', imageUrl: '', price: null , category:'', brand:'', desc:'' }}

        onSubmit={(values, { setSubmitting }) => {   }} >

{({ values, errors, isSubmitting  } ) => 
(
  <>
  {isLoading && <Loader/>} 
  <div className={styles['form-container']}>
  <div className={styles['form-wrapper']}>

  <Form>

    <div className={styles['form-control']}>
      <h2>Add new product</h2>
    
<label> Product Name</label>
  <Field type="text" name="productName" placeholder="Product Name" />
  <ErrorMessage name='productName' component='div' className={styles.error} />
  </div>

  <div className={styles['form-control']}>

    <div className="image-status">
        uploading 50%

    </div>
    <label> Product Name</label>
    <Field type="file" name="imageUrl" placeholder="Product Image" />
  <ErrorMessage name='productName' component='div' className={styles.error} />
  <div>
  <Field type="text" name="file" disabled />

  </div>
  </div>
  <div className={styles['form-control']}>
    
<label> Product price</label>
  <Field type="number" name="price" placeholder="Product price" />
  <ErrorMessage name='productName' component='div' className={styles.error} />
  </div>

  <div className={styles['form-control']}>
  <label> Product category</label>
  <select name="category">
    <option value='' disabled>food</option>
     {categories.map((cat) => {
    return(
        <option key={cat.id} value={cat.name}>
            {cat.name}

        </option>
    )
})}


  </select>




  </div>





</Form>


</div>
</div>

  </>



)

    }


        </Formik>
        </>
    );
}
 
export default AddProduct;

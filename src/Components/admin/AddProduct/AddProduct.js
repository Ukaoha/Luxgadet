import { useState } from "react";
import  styles from './Add.module.scss'
import {  ref, uploadBytesResumable , getDownloadURL, deleteObject} from "firebase/storage";
import { db, storage } from '../../../firebase/Config';
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import  {selectProducts} from '../../../Redux/Slice/ProductSlice';

const intialState = {

  name: '',
  imageUrl: '',
  category: '',
  price: 0,
  desc: '',
  brand: ''


}


const AddProduct = () => {

  const {id} = useParams();
  const products = useSelector(selectProducts)
  console.log(products);

  const productEdit = products.find((item) => item.id === id)
  console.log(productEdit);


  console.log(id);


  function detectForm (id, f1, f2) {
    if(id === 'ADD') {
      return f1
    }
    return f2

  };



    const [product, setProduct] = useState(() => {
      const newState = detectForm(id ,
         {...intialState},
          productEdit)
          return newState

    });
    // const [product, setProduct] = useState({
    // ...intialState
    // })

      const navigate = useNavigate()
      // category
      const categories= [
        {id: 1, name: 'Laptop'},
        {id: 2, name: 'Electronics'},
    
        {id: 3, name: 'Fashion'},
    
        {id: 4, name: 'Phone'},
        {id: 5, name: 'Tv'},

    
    
    ]
// brand
    const productBrand =[
    {id: 1 , name: 'Techno'},
    {id: 2 , name: 'Infinix'},
    {id: 3 , name: 'Apple'},
    {id: 4 , name: 'Nike'},
    {id: 5 , name: 'Chivron'},
    {id: 6 , name: 'Itel'},
    {id: 7 , name: 'Samsung'},
    {id: 8 , name: 'Acer'},
    {id: 9 , name: 'Lenevo'},

    ];  
    
//  image function (storing image to fire store)

    const[uploadProgress , setUploadProgress] = useState(0)
    const [isLoading , setIsLoading] = useState(false)


      const handleImageChange = (e) => {
        const file = e.target.files[0]
         const storageRef = ref(storage, `Luxgadet/${Date.now()} ${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
  
        (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)
  }, 
  (error) => {
    // Handle unsuccessful uploads
    toast.error(error.message)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product , imageUrl: downloadURL})
      toast.success('image uloaded successfully')

    });
  }
);



      }

      
      const addProduct = (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log(product);


        try{ 
          const docRef =  addDoc(collection(db, "products"), {
            name: product.name,
            imageUrl: product.imageUrl,
            category: product.category,
            price:Number(product.price),
            desc: product.desc,
            brand: product.brand,
            createdAt: Timestamp.now().toDate()
    
          });
          setIsLoading(false)
          setUploadProgress(0)
          setProduct({...intialState})

          toast.success('product uploaded successfully')
          navigate('/admin/all-products')
          

        }catch(error) {
          setIsLoading(false)

          toast.error(error.message)
        }
      }


      // eedit product 
      const editProduct = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(product.imageUrl !== productEdit.imageUrl) {
          const storageRef = ref(storage, productEdit.imageUrl);
           deleteObject(storageRef)

        }

        try{
           setDoc(doc(db, "products", id), {
            name: product.name,
            imageUrl: product.imageUrl,
            category: product.category,
            price:Number(product.price),
            desc: product.desc,
            brand: product.brand,
            createdAt: productEdit.createdAt,
            editedAt: Timestamp.now().toDate()

          });
          setIsLoading(false)
          toast.success('product edited successfully ')
          navigate('/admin/all-products')

        }catch(error) {
          setIsLoading(false)
          toast.error(error.message)
        }
      }
      

      const handleInputChange = (e) => {
        const {name, value} = e.target
        setProduct({...product , [name]: value})

      }

      

    return (  

        <>
        {isLoading && <Loader/>}
          <div className={styles['form-container']}>
  <div className={styles['form-wrapper']}>
  {/* detectForm(id, addProduct , editProduct) */}
  <form onSubmit=  {detectForm(id, addProduct , editProduct)}
>
    <div className={styles['form-control']}>
      <h2>{detectForm(id, ' Add New Product', 'Edit new product' )}</h2>
      <label> Product Name</label>
      <input type='text' name="name" value={product.name}  onChange={(e) => handleInputChange(e)}  required />


      </div>
      <div className={styles.group}>
  <label> Product Image</label>

  {uploadProgress === 0 ? null : (

  <div className={styles.progress}>
    <div className={styles['progress-bar']}
      style={{width: `${uploadProgress}%`}}
      >
        {uploadProgress < 100 ? 'uploading' `${uploadProgress}` : `upload complete ${uploadProgress}`}
      


        </div>
        

    </div>
    )}


    <input type="file"    name="image" accept="image/*" placeholder="Product Image"  onChange={(e) => handleImageChange(e)}      />
    {product.imageUrl === '' ? null : (
          <input type="text" name="imageUrl" value={product.imageUrl}  disabled />

    )}


  </div>

    <div className={styles['form-control']}>
    
<label> Product price</label>
  <input type="number" name="price" value={product.price} placeholder="Product price"  onChange={(e) => handleInputChange(e)}  />
  </div>
 
   <div className={styles['form-control']}>
  <label> Product category</label>
  <select name="category" value={product.category}  onChange={(e) => handleInputChange(e)}  >
    <option value='' disabled>--Chaange Product Category--</option>
     {categories.map((cat) => {
    return(
        <option key={cat.id} value={cat.name}>
            {cat.name}

        </option>
    )
})}


  </select>




  </div>

  <div className={styles['form-control']}>
    
    <label> Product Brand</label>
    <select name="brand" value={product.brand}  onChange={(e) => handleInputChange(e)}  >
    <option value='' disabled>--Product Brand--</option>
     {productBrand.map((brand) => {
    return(
        <option key={brand.id} value={brand.name}>
            {brand.name}

        </option>
    )
})}


  </select>

      </div>
      <div className={styles['form-control']}>
    
<label> Product Description</label>
  <textarea type="text" name="desc" value={product.desc}  onChange={(e) => handleInputChange(e)}  >

  </textarea>
  </div>

  <button   className={styles.btn}>{detectForm(id , 'Save Product' , 'Edit Product')}</button>







      </form>

    
</div>
</div>
        
        </>

        );
}
 
export default AddProduct;




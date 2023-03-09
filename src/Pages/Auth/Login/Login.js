import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import  styles from '../Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import {signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../../firebase/Config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaFacebook, FaGoogle} from 'react-icons/fa'
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { useSelector } from 'react-redux';
import { selectPreviousUrl } from '../../../Redux/Slice/cartSlice';






// validated inputs

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),

})
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


  

const Login = () => {
  const navigate = useNavigate();
  
  // redirect
  const previousUrl = useSelector(selectPreviousUrl)

  const redirectUser = () => {
    if(previousUrl.includes('cart')){
      navigate('/cart')
    } else{
      navigate('/')
    }
  }

  // login in with google
  const SignInWithGoogle = ()=> {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      toast.success('login successfull');
      redirectUser()


      // ...
    }).catch((error) => {
      // Handle Errors here.
      toast.error(error.message)
    });
  }
    // login with facebook

  const signInWithFacebook = () => {

    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      toast.success('login successfull');
      redirectUser()
  
  
  
    })
    .catch((error) => {
      // Handle Errors here.
      toast.error(error.message)
    });

}


    const [isLoading , setIsLoading] = useState(false);

    return ( 
        <>
                  <Formik
initialValues={{ name: '', email: '', password: '' , passwordConfirmed:'' }}
validationSchema={validationSchema}

onSubmit={(values, { setSubmitting }) => {
    setSubmitting(true);
    setIsLoading(true)

    signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false);
     setSubmitting(false);
    toast.success('Login successful');
    redirectUser()



    // ...
  })
  .catch((error) => {
    console.log(error.message)
    setSubmitting(false);
    setIsLoading(false);
    toast.error(error.message);

  });


}}

  
>
{({ values, errors, isSubmitting  } ) => 
(
  <>
  {isLoading && <Loader/>} 
  <div className={styles['form-container']}>
  <div className={styles['form-wrapper']}>

  <Form>

  <div className={styles['form-control']}>
    <h2>Sign in</h2>

  <Field type="email" name="email" placeholder="Email" />
  <ErrorMessage name='email' component='div' className={styles.error} />
  </div>
  <div className={styles['form-control']}>
<Field type="password" name="password" placeholder="Password" />
<ErrorMessage name='password' component='div' className={styles.error} />
</div>
<div>

<button  className={styles.btn} type="submit" disabled={isSubmitting}>
Login
</button>
<p>Or</p>
 
</div>
<ToastContainer/>
</Form>
<div className={styles['google-wrapper']} >
<div className={styles.google} >
    <button className={styles['google-btn']}   onClick={SignInWithGoogle}  >
      
            <span><FaGoogle color="#fff" /> </span> Login with Google
    </button>

    <div className={styles.google} >
    <button className={styles['facebook-btn']}   onClick={signInWithFacebook}  >
      
      <span><FaFacebook color="#fff" /> </span> Login with facebook
</button>

    </div>


    <span>
      <p>Forgotten password ?
        <Link to="/reset"> Reset password</Link>
      </p>
    </span>
 </div>
 </div>

</div>
</div>
</>

)

    }




</Formik>



        </>
     );
}
 
export default Login;
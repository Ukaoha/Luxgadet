import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import  styles from '../Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Components/Loader/Loader';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase/Config';




// validated inputs

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),

})



const Login = () => {
    const [isLoading , setIsLoading] = useState(false)
    const navigate = useNavigate();

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
    console.log(user);
    setIsLoading(false)
      setSubmitting(false);
  
    toast.success("login successful");
    navigate('/cart')
    

    // ...
  })
  .catch((error) => {
    console.log(error.message)
     setSubmitting(false);
     toast.error(error)

  
    setIsLoading(false)

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
<p>Already have an account ? <Link to="/">Login</Link></p>
</div>
<ToastContainer/>
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
 
export default Login;
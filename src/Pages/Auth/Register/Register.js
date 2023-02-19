import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'firebase/auth';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import  styles from '../Auth.module.scss'
import { auth } from '../../../firebase/Config';
import Loader from '../../../Components/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must have at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must have at least 6 characters')
      .required('Password is required'),
    passwordConfirmed: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password must match")

  });
  

const Register = () => {
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
  
  createUserWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    setIsLoading(false)
      setSubmitting(false);

      navigate('/cart')
    toast.success("Registration successful");
    
    
  })
  .catch((error) => {
    console.log(error.message)
    toast.error(error.message)
     setSubmitting(false);
  
    setIsLoading(false)
  
    
    // ..
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
      <h2>Registar</h2>
    
  <Field type="text" name="name" placeholder="Name" />
  <ErrorMessage name='name' component='div' className={styles.error} />
  </div>
  <div className={styles['form-control']}>

  <Field type="email" name="email" placeholder="Email" />
  <ErrorMessage name='email' component='div' className={styles.error} />
  </div>
  <div className={styles['form-control']}>
<Field type="password" name="password" placeholder="Password" />
<ErrorMessage name='password' component='div' className={styles.error} />
</div>
<div className={styles['form-control']}>
<Field type="password" name="passwordConfirmed" placeholder="Confirm password" />
<ErrorMessage name='passwordConfirmed' component='div' className={styles.error} />

</div>
<div>

<button  className={styles.btn} type="submit" disabled={isSubmitting}>
Register
</button>
<p>Already have an account ? <Link to="/login">Login</Link></p>
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

    )
}

 
export default Register;
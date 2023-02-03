import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import  styles from '../Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/Config';



const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
})

const ResetPassword = () => {
    const [isLoading , setIsLoading] = useState(false)


    return (  
        <>
    <Formik
initialValues={{  email: '' }}
validationSchema={validationSchema}

onSubmit={(values, { setSubmitting }) => {
    setSubmitting(true);
    setIsLoading(false)

    sendPasswordResetEmail(auth, values.email)
  .then(() => {
    toast.success('Password reset email sent!')
  })
  .catch((error) => {
    toast.error(error.message)
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
      <h4>Reset Account  Passwaord</h4>
    

  <Field type="email" name="email" placeholder="Email" />
  <ErrorMessage name='email' component='div' className={styles.error} />
  </div>
<div>

<button  className={styles.btn} type="submit" disabled={isSubmitting}>
Password Reset
</button>
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
 
export default ResetPassword;
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

  toast.success("Registration successful");
  navigate('/contact')
  // ...
})
.catch((error) => {
  toast.error(error.message)
   setSubmitting(false);

  setIsLoading(false)


  // ..
});


}}
>
{isLoading && <Loader/>}
{({ values, errors, isSubmitting }) => (
<Form>
  <Field type="text" name="name" placeholder="Name" />
  {errors.name && <div>{errors.name}</div>}
  <Field type="email" name="email" placeholder="Email" />
  {errors.email && <div>{errors.email}</div>}
<Field type="password" name="password" placeholder="Password" />
{errors.password && <div>{errors.password}</div>}
<Field type="password" name="passwordConfirmed" placeholder="Confirm password" />
{errors.passwordConfirmed && <div>{errors.passwordConfirmed}</div>}

<button type="submit" disabled={isSubmitting}>
Register
</button>
<ToastContainer/>
</Form>
)}
</Formik>



    </>
 );

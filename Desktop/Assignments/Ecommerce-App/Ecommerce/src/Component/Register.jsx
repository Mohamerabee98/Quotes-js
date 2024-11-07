import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';


export default function Register() {
  let { SetLogin } = useContext(auth) //????

  let navigat = useNavigate() //arrive to another padge
  let [looding, setlooding] = useState(false)
  let [msg, setMsg] = useState('')

  function handelregister(values) {
    setlooding(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((data) => {

        if (data?.data?.message === "success") {

          setMsg('')
          setlooding(false)
          localStorage.setItem('UserToken', data?.data?.token)
          SetLogin(jwtDecode(data?.data?.token)) // use jwtDecose becod=se token decripted

          navigat('/') // arrive to Home Component
        }
      })
      .catch((err) => {

        setMsg(err.response.data.message);
        setlooding(false)
      })
  }
  // why i used String()==> becouse matches()  

  let vaildationSchema = Yup.object({
    name: Yup.string().min(2, "min lenght is 2").max(30, "max lenght is 30").required("name is required"),
    email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required("email is reguired"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/).required('password is reguired'),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required('rePassword is reguired'),
    phone: Yup.string().matches(/^01[0-25][0-9]{8}$/).required('phone is required')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },

    validationSchema: vaildationSchema,
    onSubmit: handelregister
  })
  return (
    <div>
      <h2 className='text-3xl my-3'>Register Now:</h2>
      {/* if (msg ==="true")*/}
      {msg ? <div className="p-4 mb-4 text-lg mx-auto text-center w-1/2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{msg}</span>
      </div>
        : ""}


      <form className="max-w-md mx-auto " onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group ">
          <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} id="name" type="text" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>

        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.name}</span>
        </div> : ""}








        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" type="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : ""}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id="password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : ""}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" id="rePassword" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.rePassword}</span>
        </div> : ""}
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" id="phone" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.phone}</span>
        </div> : ""}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {looding ? <i className='fas fa-spin fa-spinner text-white'></i> : "Register"}
        </button>
      </form>



    </div>
  )
}

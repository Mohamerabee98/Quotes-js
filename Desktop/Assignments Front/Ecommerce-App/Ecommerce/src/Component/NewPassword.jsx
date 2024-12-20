import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { auth } from '../Context/AuthContext';

export default function ResetPassword() {
    let { SetLogin } = useContext(auth)
    let navigat = useNavigate()
    let [looding, setlooding] = useState(false)
    let [msg, setMsg] = useState('')
    function handelnewPassword(values) {
        setlooding(true)
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then(({ data }) => {
                if (data.token) {
                    navigat('/Login')
                }
            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setlooding(false)
            })
    }
    let vaildationSchema = Yup.object({
        email: Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required("email is reguired"),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/).required('password is reguired'),
    })
    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema: vaildationSchema,
        onSubmit: handelnewPassword
    })
    return (
        <div>
            <h2 className='text-3xl my-3'>New Password:</h2>
            {msg ? <div className="p-4 mb-4 text-lg mx-auto text-center w-1/2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ""}
            <form className="max-w-md mx-auto " onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> : ""}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange} type="password" id="newPassword" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.newPassword}</span>
                </div> : ""}
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {looding ? <i className='fas fa-spin fa-spinner text-white'></i> : "Sumbit"}
                </button>
            </form>

        </div>
    )
}

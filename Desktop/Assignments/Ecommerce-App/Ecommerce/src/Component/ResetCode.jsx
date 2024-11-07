import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { auth } from '../Context/AuthContext'

export default function ResetCode() {
    let { SetForget } = useContext(auth)

    let navigat = useNavigate()
    let [looding, setlooding] = useState(false)
    let [msg, setMsg] = useState('')

    async function handelResetCode(values) {




        try {
            setlooding(true)

            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)

            if (data.status === 'Success') {
                navigat('/NewPassword')
                setlooding(false)
                setMsg('')
            }
        } catch (error) {

            setMsg(error.response.data.message);
            setlooding(false)
        }
    }
    let formik = useFormik({
        initialValues: {

            resetCode: '',
        },

        onSubmit: handelResetCode
    })
    return (
        <div>
            <h2 className='text-3xl my-3'>resetCode:</h2>

            {msg ? <div className="p-4 mb-4 text-lg mx-auto text-center w-1/2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ""}
            <form className="max-w-md mx-auto " onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} value={formik.values.resetCode} onChange={formik.handleChange} type="text" id="resetCode" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {looding ? <i className='fas fa-spin fa-spinner text-white'></i> : "Sumbit"}
                </button>
            </form>


        </div>
    )
}

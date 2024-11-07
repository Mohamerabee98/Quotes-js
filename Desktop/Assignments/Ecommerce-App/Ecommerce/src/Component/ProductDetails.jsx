import React, { useEffect, useState } from 'react'
import { getsingelProduct } from '../Apis/getSingelProduct'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import Loading from './Loading';
import DisplayProduct from './DisplayProduct';
import { getProductwithCategory } from '../Apis/getProduct';
import { useMutation } from '@tanstack/react-query'

import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';
import { addToCartApi } from '../Apis/getCartsApis';

export default function ProductDetails() {


    let { status, mutate: addMutate, data } = useMutationCart(addToCartApi)

    if (status == 'success') {
        toast.success(data?.data?.message)


    }




    let { id, categoryId } = useParams()
    let [imgsSrc, setimgSrc] = useState('')

    let [Product, setproduct] = useState([])
    let [realatedProducts, setrealatedProducts] = useState([])
    let [loading, setloading] = useState(false)
    let [msg, setMsg] = useState('')



    async function getsingelProductApi() {




        setloading(true)

        let data = await getsingelProduct(id)
        if (data?.data) {
            setproduct(data?.data)
            setMsg('')
            setloading(false)

        }
        else {
            setMsg(data)
            setloading(false)

        }


    }
    ////Realated Product

    async function getRealatedProductApi() {




        setloading(true)

        let data = await getProductwithCategory(categoryId)
        if (data?.data) {
            setrealatedProducts(data?.data)
            setMsg('')
            setloading(false)

        }
        else {
            setMsg(data)
            setloading(false)

        }


    }





    function ChnageSrc(e) {
        setimgSrc(e.target.src)

    }


    useEffect(() => {
        getsingelProductApi()
        getRealatedProductApi()

    }, [])




    if (loading)
        return <Loading></Loading>

    if (msg)
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>


    return (
        <>
            <div className='row items-center py-5 sm:gap-0  gap-10'>
                <div className="sm:w-1/3 ">
                    <img src={imgsSrc ? imgsSrc : Product?.imageCover} className='w-full' alt="" />
                    <ul className='flex justify-center gap-2'>
                        {Product?.images?.map(img => <li key={img} className='p-1 ms-2 my-3'><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={ChnageSrc} src={img} width={80} className='cursor-pointer' alt="" /></li>)}
                    </ul>
                </div>
                <div className="sm:w-2/3">
                    <p className='text-green-700'>{Product?.category?.name}</p>
                    <p className='line-clamp-1'>{Product?.title}</p>
                    <p className='font-thin'>{Product?.description}</p>

                    <div className='flex justify-between my-3'>
                        <p>{Product?.price}EGP</p>
                        <p> <i className='fas fa-star text-yellow-500 '></i> {Product?.ratingsAverage}</p>
                    </div>

                    <button onClick={() => addMutate(Product?._id)} className='bg-green-700 text-white  p-2 rounded btn'>Add To card</button>


                </div>


            </div>
            <h2 className='text-2xl my-4 text-green-700'>Realated Products:</h2>
            <div className="row">
                {realatedProducts.map(prod => <DisplayProduct key={prod._id} ele={prod}></DisplayProduct>)}
            </div>

        </>
    )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useMutationCart from '../Hooks/useMutationCart';
import { addToCartApi } from '../Apis/getCartsApis';
export default function DisplayProduct({ ele }) {
    let [flage, setflage] = useState(false)

    let { status, mutate: addMutate, data } = useMutationCart(addToCartApi)

    if (status == 'success') {
        toast.success(data?.data?.message)



    }






    return (
        <div className='md:w-1/6 sm:w-1/2 '>


            <div className="product p-3 cursor-pointer ">

                <i onClick={() => setflage(!false)} className={`fas ${flage ? 'fa-heart' : 'fa-heart-broken'} text-green-700`}></i>
                <Link to={`/productdetails/${ele?._id}/${ele?.category?._id}`}>
                    <img src={ele?.imageCover} className='w-full' alt="" />
                    <p className='text-green-700'>{ele?.category?.name}</p>

                    <p className='line-clamp-1'>{ele?.title}</p>

                    <div className='flex justify-between my-3'>
                        <p>{ele?.price}EGP</p>
                        <p> <i className='fas fa-star text-yellow-500 '></i> {ele?.ratingsAverage}</p>
                    </div>
                </Link>
                <button onClick={() => addMutate(ele?._id)} className='bg-green-700 text-white  p-2 rounded btn'>Add To card</button>


            </div>
        </div>

    )
}

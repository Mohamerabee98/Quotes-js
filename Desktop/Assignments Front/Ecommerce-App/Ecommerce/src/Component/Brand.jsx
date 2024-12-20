import axios from 'axios'
import React from 'react'
import {
  useQuery,

} from '@tanstack/react-query'
import Loading from './Loading';
export default function Brand() {



  function getBrands() {


    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  let { data, isLoading, error, isError } = useQuery({
    queryKey: ['Brand'], queryFn: getBrands,

  })


  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <h2 className='text-red-700 my-3 font-bold'>{error.message}</h2>
  return (
    <div className='row'>

      {data?.data?.data.map(ele => <div key={ele._id} className='md:w-1/4'>
        <div className='p-3'>
          <img src={ele?.image} alt="" />
          <p className='text-center'>{ele?.name}</p>
        </div>

      </div>)}
    </div>
  )
}

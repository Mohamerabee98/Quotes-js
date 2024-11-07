import React, { useEffect, useState } from 'react'
import FeaturedProduct from './FeaturedProduct'
import { getProduct, getProductwithCategory } from '../Apis/getProduct'
import { getCategory } from '../Apis/getCategory'
import Loading from './Loading'

export default function Products() {
  let [categoryArr, setcategoryArr] = useState([])
  let [loading, setloading] = useState(false)
  let [msg, setMsg] = useState('')


  async function getcategoryApi() {
    setloading(true)

    let data = await getCategory()
    if (data?.data) {
      setcategoryArr(data?.data)
      setMsg('')
      setloading(false)

    }
    else {
      setMsg(data)
      setloading(false)

    }



  }
  useEffect(() => {
    getcategoryApi()

  }, [])


  async function getData(id) {

    let data = await getProductwithCategory(id)
    setcategoryArr(data.data);



  }

  if (loading)
    return <Loading></Loading>

  if (msg)
    return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>



  return (
    <div className='flex'>
      {/* <ul>
        {categoryArr.map(ele => <li onClick={() => getData(ele?._id)} className='hover:underline cursor-pointer'>{ele?.name}</li>)}
      </ul> */}
      <FeaturedProduct arr={categoryArr}>

      </FeaturedProduct>


    </div>
  )
}

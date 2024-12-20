import React, { useEffect, useState } from 'react'
import { getProduct } from '../Apis/getProduct'
import Loading from '../Component/Loading'
import DisplayProduct from './DisplayProduct'

export default function FeaturedProduct({ arr }) {
    // useEffect(() => {
    //     console.log(arr);
    // }, [arr])


    let [ProductArr, setproductArr] = useState([])
    let [loading, setloading] = useState(false)
    let [msg, setMsg] = useState('')


    async function getProductApi() {
        setloading(true)

        let data = await getProduct()
        if (data?.data) {
            setproductArr(data?.data)
            setMsg('')
            setloading(false)

        }
        else {
            setMsg(data)
            setloading(false)

        }



    }



    useEffect(() => {
        getProductApi()


    }, [])


    if (loading)
        return <Loading></Loading>

    if (msg)
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>


    return (
        <div className='row '>
            {/* {arr.lenght?arr.map(prod => <DisplayProduct key={prod?._id} ele={prod} ></DisplayProduct>):} */}

            {ProductArr.map(prod => <DisplayProduct key={prod?._id} ele={prod} ></DisplayProduct>)}


        </div>
    )
}

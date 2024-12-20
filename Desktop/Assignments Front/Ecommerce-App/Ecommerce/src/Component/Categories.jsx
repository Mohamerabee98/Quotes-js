import React, { useEffect, useState } from 'react'
import { getCategory } from '../Apis/getCategory'
import Slider from "react-slick";
import Loading from './Loading';

export default function Categories() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500
    };

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


    if (loading)
        return <Loading></Loading>

    if (msg)
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>


    return (
        <div className='my-6 md:block hidden'>
            <Slider  {...settings}>
                {categoryArr.map(ele => <img className='h-[160px] object-cover' key={ele?._id} src={ele?.image}></img>)}
            </Slider >
        </div>
    )
}

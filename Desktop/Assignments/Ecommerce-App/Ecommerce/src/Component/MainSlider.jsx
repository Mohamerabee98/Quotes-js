import React from 'react'
import Slider from "react-slick";

import img1 from "../assets/finalProject assets/images/slider-image-1.jpeg"
import img2 from "../assets/finalProject assets/images/slider-image-2.jpeg"
import img3 from "../assets/finalProject assets/images/slider-image-3.jpeg"



export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    };
    return (
        <div>
            <div className="row my-6">
                <div className="w-2/3">
                    <Slider {...settings}>
                        <img src={img1} className='w-full h-[400px] object-cover' alt="" />
                        <img src={img1} className='w-full h-[400px] object-cover' alt="" />
                        <img src={img1} className='w-full h-[400px] object-cover' alt="" />
                    </Slider>
                </div>

                <div className="w-1/3">
                    <img src={img2} className='w-full  h-[200px] object-cover ' alt="" />
                    <img src={img3} className='w-full  h-[200px] object-cover' alt="" />
                </div>

            </div>
        </div>
    )
}

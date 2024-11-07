import React from 'react'
import logo from "../assets/finalProject assets/freshcart-logo.svg"
export default function Footer() {
  return (
    <div>
      <footer className='bg-main-light p-9 md:flex justify-between '>
        <div className="icom  ">
          <img src={logo} alt="" />
          <p className='mt-20'>2024 <span className='font-bold'>frsh cart</span>.All Rights Reserved</p>

        </div>

        <div className="info flex  text-xl">
          <ul className='me-7'>
            <li>RESOURCES</li>
            <li>frsh cart</li>
            <li>ay 7aga</li>
          </ul>
          <ul className='me-7'>
            <li>Follow Us</li>
            <li>GitHub</li>
            <li>Discord</li>
          </ul>
          <ul className='me-7'>
            <li>LEGAL</li>
            <li>Privacy Policy</li>
            <li>Terms&Condition</li>
          </ul>
        </div>

      </footer>

    </div>
  )
}

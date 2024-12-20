import React, { useContext, useState } from 'react'
import logo from "../assets/finalProject assets/freshcart-logo.svg"
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'






export default function Navbar() {
  let { SetLogin, Login } = useContext(auth)
  let [open, setopen] = useState(false)
  let navigate = useNavigate()


  function logOut() {
    localStorage.removeItem('UserToken')
    SetLogin(null)
    navigate('/Login')
  }





  function toogle() {
    setopen(!open)
  }







  return (
    <nav className='py-7 bg-main-light '>
      <div className="container flex justify-between items-center relative">
        <div className='md:flex gap-4 '>
          <img src={logo} width={130} alt="logo" />
          {Login ? <ul className={`md:flex gap-3 ${open ? "block" : "hidden"}`}>
            <li className='text-lg'><NavLink to={'/'}>Home</NavLink></li>
            <li className='text-lg'><NavLink to={'/Products'}>Products</NavLink></li>
            <li className='text-lg'><NavLink to={'/Cart'}>Cart</NavLink></li>

            <li className='text-lg'><NavLink to={'/Brand'}>Brand</NavLink></li>
          </ul> : ""}

        </div>


        <div>
          <ul className={`md:flex gap-4 ${open ? "block" : "hidden"}`}>

            {Login ?
              <li className='cursor-pointer text-lg' onClick={logOut}>logOut {Login ? <b className='text-green-600'>Hi {Login.name} </b> : ""}</li>
              :
              <>
                <li className='text-lg'><NavLink to={'/Login'}>Login</NavLink></li>
                <li className='text-lg'><NavLink to={'/Register'}>Register</NavLink></li>
                <li className='flex gap-4 '>
                  <a href=""> <i className='fab fa-facebook-f'></i></a>
                  <a href=""><i className='fab fa-instagram'></i></a>
                  <a href=""><i className='fab fa-google'></i></a>


                </li>
              </>}


          </ul>
        </div>
        <i onClick={toogle} className={` block md:hidden fas ${open ? 'fa-close' : 'fa-bars'} fa-2x absolute top-0 right-2 cursor-pointer`}></i>
      </div>
    </nav>
  )
}

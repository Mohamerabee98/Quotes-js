import React from 'react'
import Home from './Component/Home.jsx'
import Login from './Component/Login.jsx'
import Register from './Component/Register.jsx'
import Cart from './Component/Cart.jsx'
import Layout from './Component/Layout.jsx'
import NotFound from './Component/NotFound.jsx'
import Brand from './Component/Brand.jsx'
import Products from './Component/Products.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductRouter from './Component/ProductRouter.jsx'
import Forget from './Component/Forget.jsx'

import ResetCode from './Component/ResetCode.jsx'
import NewPassword from './Component/NewPassword.jsx'
import ProductDetails from './Component/ProductDetails.jsx'
import Orders from './Component/Orders.jsx'




export default function App() {

  let router = createBrowserRouter([{
    path: '/', element: <Layout></Layout>, children: [
      { index: true, element: <ProductRouter><Home></Home></ProductRouter> },

      { path: '/Login', element: <Login></Login> },
      { path: '/Register', element: <Register></Register> },
      { path: '/forget', element: <Forget></Forget> },
      { path: '/allorders', element: <Orders></Orders> },
      { path: '/reset', element: <ResetCode></ResetCode> },
      { path: '/NewPassword', element: <NewPassword></NewPassword> },
      { path: '/Cart', element: <ProductRouter> <Cart></Cart></ProductRouter> },
      { path: '/Brand', element: <ProductRouter> <Brand></Brand></ProductRouter> },
      { path: '/Products', element: <ProductRouter><Products></Products></ProductRouter> },
      { path: '/productdetails/:id/:categoryId', element: <ProductRouter><ProductDetails></ProductDetails></ProductRouter> },

      { path: '*', element: <NotFound></NotFound> },
    ]
  }])


  return (
    <div>
      <RouterProvider router={router}></RouterProvider>


    </div>
  )
}

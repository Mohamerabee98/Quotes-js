import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProductRouter({ children }) {


    if (localStorage.getItem('UserToken'))
        return children
    else return <Navigate to={'/Login'}></Navigate>
}
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";




export let auth = createContext(null)

export default function AutoContextProvider({ children }) {



    let [Login, SetLogin] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('UserToken'))
            SetLogin(jwtDecode(localStorage.getItem('UserToken')))
    }, [])

    return <auth.Provider value={{ Login, SetLogin }}>
        {children}

    </auth.Provider>
}



// add to cart

import axios from "axios"



let baseUrl = `https://ecommerce.routemisr.com/api/v1`

let token = localStorage.getItem('UserToken')

export function addToCartApi(productId) {
    return axios.post(`${baseUrl}/cart`, { productId }, {
        headers: {
            token
        }
    })
}

// get Cart


export function getCartApi() {
    return axios.get(`${baseUrl}/cart`, {
        headers: {
            token
        }
    })
}

// delete cart 
export function deleteCartApi(id) {
    return axios.delete(`${baseUrl}/cart/${id}`, {
        headers: {
            token
        }
    })
}

// update cart

export function updateCartApi({id,count}) {
    return axios.put(`${baseUrl}/cart/${id}`, { count }, {
        headers: {
            token
        }
    })
}
// clear cart

export function clearCartApi() {
    return axios.delete(`${baseUrl}/cart`,  {
        headers: {
            token
        }
    })
}

import axios from "axios";


let token = localStorage.getItem('UserToken')
export function onlinepayment({ cardId, shippingAddress }) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000`, { shippingAddress }, { headers: { token } })
}

// cash
export function Cash({ cardId, shippingAddress }) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`, { shippingAddress }, { headers: { token } })
}
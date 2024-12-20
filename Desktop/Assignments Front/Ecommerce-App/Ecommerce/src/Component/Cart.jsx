import React from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../Apis/getCartsApis'
import Loading from './Loading';
import img from '../assets/finalProject assets/download.jpeg'
import useMutationCart from '../Hooks/useMutationCart';
import BasicModal from './BasicModil';
export default function Cart() {


  let { data, isLoading, isError } = useQueryCart('getcart', getCartApi)



  let { mutate: delMutate, isPending: delpendeing } = useMutationCart(deleteCartApi)
  let { mutate: updateMutate, isPending: upPending } = useMutationCart(updateCartApi)
  let { mutate: clrCartApi, isPending: crlPending } = useMutationCart(clearCartApi)





  if (isLoading || delpendeing || upPending || crlPending)
    return <Loading></Loading>

  if (isError)
    return <img src={img} className='w-[1000px] h-[500px] object-cover mx-auto mt-5' alt="" />

  return (
    <>
      <div className='flex justify-center '>
        <button onClick={() => clrCartApi()} className='bg-red-700 w-48  my-3 align-middle select-none font-sans font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 px-6 rounded  text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none '>Clear Cart</button></div>
      {data?.numOfCartItems ? <div className='my-4'>
        <h2 className='my-3 fa-1xl'>Cart Items : <span className='font-bold text-green-700'>{data?.numOfCartItems}</span></h2>
        <h2 className='my-3 fa-1xl'>Cart Items : <span className='font-bold text-green-700'>{data?.data?.totalCartPrice} EGp</span></h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action <i className='fas fa-trash text-red-600 text-sm'></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data?.data?.products.map(ele => <tr key={ele?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele?.product?.title}
                  </td>
                  <td className="px-6 py-8 ">
                    <div className="flex items-center gap-5">
                      <button onClick={() => ele?.count == 1 ? delMutate(ele?.product?._id) : updateMutate({ id: ele?.product?._id, count: ele?.count ? ele?.count - 1 : ele?.count })} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{ele?.count}</span>
                      </div>
                      <button onClick={() => updateMutate({ id: ele?.product?._id, count: ele?.count + 1 })}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {ele?.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => delMutate(ele?.product?._id)} className="font-medium text-red-600 dark:text-red-500 hover:bg-gray-300 p-3 rounded transition-all  ">Remove</button>
                  </td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div> :
        <div className='flex justify-center mt-3'>
          <img src={img} className='w-[1000px] h-[500px] object-cover mx-auto' alt="" />
        </div>}

      <BasicModal cardId={data?.data?._id}></BasicModal>


    </>
  )
}

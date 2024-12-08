import axios from '../../api'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useStateValue } from '../../context';
import { FaCartArrowDown } from "react-icons/fa";



const Detail = () => {
  const { setWishlist, wishlist, setCart, cart } = useStateValue()
  const [data, setData] = useState(null)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [id])
  console.log(id);

  const handleLike = (product)=>{
    const index = wishlist.findIndex(item => item.id === product.id)
    if(index < 0){
      setWishlist(prev => [...prev, product])
    }else{
      setWishlist(prev => prev.filter(item=> item.id !== product.id))
    }
  }

  const handleAddToCart = product => {
    const index = cart.findIndex(item => item.id === product.id)
    if(index < 0){
        setCart(prev=> [...prev, {...product, amount: 1}])
    }else{
        setCart(prev => prev.filter(item=> item.id !== product.id))
    }
  }

  

  if (loading) {
    return <div className='text-center py-24'>Loading ....</div>
  }
  if (error) {
    return (
      <div className='text-center py-24'>
        <p className='text-red-500 text-[22px]'>{error?.message}</p>
      </div>
    )
  }

  return (
    <div className='container py-8 grid grid-cols-2 min-h-[80vh]'>
      <div className='flex gap-4 w-full'>
        <div className='flex flex-wrap flex-col gap-5 w-[20%]'>
          {data?.images?.map((url, inx) => (
            <img
              onClick={() => setIndex(inx)}
              className={`w-32 h-32 cursor-pointer rounded-md transition-all duration-300 ${
                index === inx
                  ? 'border-2 border-blue-500 opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
              src={url}
              key={inx}
              alt={`Thumbnail ${inx + 1}`}
            />
          ))}
        </div>
        <div className='border-2 bg-slate-200 rounded-md w-[75%] flex items-center justify-center p-4'>
          <img className='max-h-[500px] rounded-md' src={data?.images[index]} alt="Selected" />
        </div>
      </div>
      <div className='border-2 rounded-md p-5 relative flex flex-wrap flex-col gap-4'>
        <h2 className='text-3xl font-semibold mb-4'>{data?.title}</h2>
        <p className='text-gray-600'>{data?.description}</p>
        <p className='text-[20px]'><span className='text-[20px] text-green-500 font-bold'>Price: </span>{data?.price} <span className='text-green-600 font-bold'>$</span></p>
        <p className='text-[20px]'><span className='text-red-500 font-bold'>Brand: </span> {data?.brand}</p>
        <div className='flex flex-wrap gap-4'>
          <button onClick={()=> handleAddToCart(data)} className='text-[28px] py-2 rounded-md flex flex-wrap items-center w-72 justify-center gap-4 bg-green-300'>
              {
                cart?.some(item => item.id === data?.id) ?
                <FaCartArrowDown className='text-red-600'/>
                :
                <FaCartArrowDown className='text-violet-900'/>
              }
              <span className='text-[18px]'>+ Add to cart</span>
          </button>
          <button className='text-[28px]' onClick={()=> handleLike(data)}>
            {
              wishlist?.some(item => item.id === data?.id) ?
              <FaHeart className='text-red-600'/>
              :
              <FaRegHeart className='text-violet-900'/> 
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Detail

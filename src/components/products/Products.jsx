import React from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useStateValue } from '../../context';
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Products = ({data, title}) => {
  const { setWishlist, wishlist, setCart, cart } = useStateValue()
  const navigate = useNavigate()

  const handleLike = (product)=>{
    const index = wishlist.findIndex(item => item.id === product.id)
    if(index < 0){
      setWishlist(prev => [...prev, product])
    }else{
      setWishlist(prev => prev.filter(item=> item.id !== product.id))
    }
  }

  const handleAddToCart = product => {
    const index = cart.findIndex((item)=> item.id === product.id)
    if(index < 0){
      setCart(prev=> [...prev, {...product, amount: 1}])
    }else{
      setCart((prev) => prev.filter((item) => item.id !== product.id))
    }
  }

  const productItems = data?.map(product=> (
    <div key={product.id} className='shadow p-3 border-2'>
      <div className='w-full h-64 relative'>
        <img onClick={()=> navigate(`/product/${product.id}`)} className='w-full h-full object-contain bg-slate-200' src={product.thumbnail} alt="" />
        <button onClick={()=>handleLike(product)} className='absolute top-2 right-2 text-[23px]'>
          {
            wishlist?.some(item => item.id === product.id) ?
            <FaHeart className='text-red-600'/>
            :
            <FaRegHeart className='text-violet-900'/>
          }
        </button>
        <button onClick={()=>handleAddToCart(product)} className="absolute top-9 right-2 text-[25px]">
          {
            cart?.some((item) => item.id === product.id) ? (
              <IoCartSharp  className='text-red-600 font-bold'/>
            ) : (
              <IoCartOutline className='text-violet-900'/>
            )
          }
        </button>
      </div>
      <div className=''>
        <h3 className="text-start tracking-tighter overflow-hidden whitespace-nowrap hover:text-[#56B280]">
          {product.title}
        </h3>
        <p className="text-[#56B280] text-right leading-5 hover:text-[#34a853] font-semibold">
          ${product.price}
        </p>
      </div>
    </div>
  ))
  return (
    <div >
      <div className="container text-center py-5">
        <h2 className=' text-[45px]'>{title}</h2>
      </div>
      <div className='grid container gap-5 grid-cols-4'>
        {productItems}
      </div>
    </div>
  )
}

export default Products
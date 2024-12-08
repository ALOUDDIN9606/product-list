import React, { useEffect, useState } from 'react'
import Empty from '../../components/empty/Empty'
import {useStateValue} from "../../context"
import { useNavigate } from 'react-router-dom'
import Promocode from '../../components/promocode/Promocode'
import { FaBasketShopping } from "react-icons/fa6";


const Cart = () => {
    const [promoStatus, setPromoStatus] = useState(JSON.parse(localStorage.getItem("promo")) || {msg: "", error: false, success: 0})
    console.log(promoStatus);
    
    useEffect(()=>{
        localStorage.setItem("promo", JSON.stringify(promoStatus))
    }, [promoStatus])
    
    const {cart, setCart} = useStateValue()
    const navigate = useNavigate()
    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])
    const handleIncrement = product => {
        setCart(prev => prev.map((item)=> {
            if(item.id === product.id){
                return {...item, amount: item.amount + 1}
            }else{
                return item
            }
        }))        
    }
    const handleDecrement = product => {
        if(product.amount > 1){
            setCart(prev => prev.map((item)=> {
                if(item.id === product.id){
                    return {...item, amount: item.amount - 1}
                }else{
                    return item
                }
            }))     
        }
    }
    const handleDelete = product => {
        setCart(prev => prev.filter(({id}) => id !== product.id))
    }

    // useEffect(()=>{
    //     if(promoStatus.success === 1){
    //         setCart(prev => prev.map(item=> ({...item, price: item.price * .8})))
    //     }
    // }, [promoStatus.success])

    const totalPrice = cart?.reduce((sum, item)=> sum + item.price * item.amount, 0)
  
  return (
    <div className='min-h-[80vh] py-6'>
        {
            cart.length ? 
            <div className='container flex gap-4' >
                <div className='flex-1 border-2 rounded-md'>
                    {
                        cart?.map((item)=> (
                            <div key={item.id} className='flex flex-wrap  p-4 gap-4'>
                                <img className='w-[35%] bg-slate-200 border-2 rounded-md' src={item.thumbnail} alt="" />
                                <div className='border-2 flex-1 flex flex-wrap flex-col gap-3 rounded-md p-4'>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>{(item.amount * item.price)?.brm()}💲</p>
                                    <div className='border w-20 flex h-9 items-center rounded-md justify-between bg-violet-800 text-white'>
                                        <button disabled={item.amount <= 1} onClick={()=> handleDecrement(item)} className='flex-1'>-</button>
                                        <span>{item.amount}</span>
                                        <button onClick={()=> handleIncrement(item)} className='flex-1'>+</button>
                                    </div>
                                    <button className='bg-red-600 text-white w-[50%] py-1 rounded-md text-[18px]' onClick={()=> handleDelete(item)}>delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-96 border-2 shadow-md rounded-md p-4 h-72 sticky top-20 flex flex-wrap flex-col gap-4'>
                    <p className='text-[22px] flex items-center gap-3'>Your Order <FaBasketShopping className='text-violet-800 text-[22px]'/></p>
                    <p className='font-bold text-green-700'><span className='text-red-500 text-[22px]'>Total: </span> {( totalPrice ).brm()}💲</p>
                    <Promocode setPromoStatus={setPromoStatus}/>
                    {promoStatus.error && <p className='text-red-500'>{promoStatus.msg}</p>}
                    {promoStatus.success && <p className='text-green-500'>{promoStatus.msg}</p>}
                    <button className='bg-violet-900 text-[20px] text-white py-1' onClick={()=> navigate("/checkout")}>Checkout</button>
                </div>
            </div>
            :
            <Empty title="Savatingiz hozircha bo‘sh" url="https://uzum.uz/static/img/shopocat.490a4a1.png"/>

        }
    </div>
  )
}


export default Cart
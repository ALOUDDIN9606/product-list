import React, { memo, useRef } from 'react'
import { PROMOCODES } from '../../static'

const Promocode = ({setPromoStatus}) => {
    const code = useRef(null)
    const handleSubmit = event => {
        event.preventDefault()
        if(PROMOCODES.includes(code.current.value.toUpperCase())){
            setPromoStatus(p => ({msg: "Promocode muvaffaqiyatli qabul qilindi", error: false, success: 1}))
        }else{
            setPromoStatus({msg: "Promocode xato ekan", error: true, success: 0});
        }
    }
  return (
    <form onSubmit={handleSubmit} className='w-[100%]'>
        <input ref={code} type="text" className='border pl-3 w-[70%] py-2' placeholder='enter promocode' />
        <button className='w-[30%] bg-violet-800 text-white py-2'>send</button>
    </form>
  )
}

export default memo( Promocode)
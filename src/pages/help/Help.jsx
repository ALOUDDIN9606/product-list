import React, { useReducer } from 'react'
import { useStateValue } from '../../context'

const initialState = {
  count: 0,
  str: "hello",
  wishlist: [],
  cart: [],
  auth: null
}

const Help = () => {
  const [ state, dispath ] = useReducer(reducer, initialState)
  const {setCount} = useStateValue()
  return (
    <div>
      <h2>Help</h2>
      <button onClick={()=> setCount(prev => prev +1)}>increment</button>
    </div>
  )
}

export default Help


import React from 'react'
import bg_image from "../../assets/bg-image.png"


const Hero = ({data}) => {
  return (
    <div style={{ backgroundImage: `url(${bg_image})`,}} className="bg-cover bg-center flex justify-center items-center h-[680px]">
      <div className='relative w-[730px] h-[349px] bg-white text-center p-16 text-black'>
          <div className='absolute inset-0 bg-white backdrop-blur-md pointer-events-none'> </div>
          <h1 className='text-[50px] relative z-10'>The nature candle</h1>
          <p className='relative z-10 text-[18px] pb-12'>All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments </p>
          <button type="button" class="relative z-10 w-[65%] focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-[18px] px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Discovery our collection</button>
      </div>
    </div>
  )
}

export default Hero
import React, { useEffect } from 'react'
import { useStateValue } from "../../context"
import Products from '../../components/products/Products'
import Empty from '../../components/empty/Empty'

const Wishes = () => {
  const { wishlist } = useStateValue()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='min-h-[80vh] py-12'>
      {wishlist.length ? (
        <Products title="Wishlist" data={wishlist} />
      ) : (
        <Empty title="Add items to your wishlist" url="https://uzum.uz/static/img/hearts.cf414be.png" />
      )}
    </div>
  )
}

export default Wishes

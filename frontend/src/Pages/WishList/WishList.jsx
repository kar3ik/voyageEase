import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useWishList } from '../../context/wishListContext'
import HotelCard from '../../components/HotelCard/HotelCard'
import './WishList.css'

const WishList = () => {

    const {wishList} = useWishList()

  return (
    <Fragment>
        <Navbar />
        <h2 className='heading-2'>WishList</h2>
        <section className='wishList-page d-flex align-center wrap gap-larger'>
            {
                wishList && wishList.map(hotel => <HotelCard key={hotel._id} hotel={hotel}/>)
            }
        </section>

    </Fragment>
  )
}

export default WishList
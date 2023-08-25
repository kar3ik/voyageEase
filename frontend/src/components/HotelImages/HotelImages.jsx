import React from 'react'
import './HotelImages.css'

const HotelImages = ({singleHotel}) => {

  
  if (!singleHotel) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const {image , imageArr} = singleHotel
  return (
    <div>
      <div className='hotel-image-container d-flex gap-small'>


        <div className='primary-image-container'>
          <img className='primary-img' src={image} alt='primaryImage' />
        </div>

        <div className='d-flex wrap gap-small'>
          {
            imageArr && imageArr.map(image=> <img key={image} className='hotel-img' src={image} alt='hotelimage' />)
          }

        </div>

      </div>


    </div>
  )
}

export default HotelImages
import React from 'react'
import { useFilter } from '../../../context/filterContext'



const ratings = ["1","2","3","4","5"]


const Ratings = () => {

  const {voyageEaseRating, filterDispatch} = useFilter()

    const handleRatings = (rating)=>{
      filterDispatch({
        type:"RATING",
        payload:rating
      })
    }


  return (
    <div className='filter-container'>
        <span className='filter-label'>Ratings</span>
        <div className='d-flex align-center gap'>
            {
                ratings.map(rating => <span className='span-label anemity-count 
                star d-flex align-center justify-center cursor-pointer on-hover' onClick={()=>handleRatings(rating)}
                 key={rating}>{rating} &up</span>)
            }

        </div>
        
    </div>
  )
}

export default Ratings
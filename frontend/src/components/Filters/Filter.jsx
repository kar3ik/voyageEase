import React from 'react'
import './Filter.css'
import { PriceRange } from './PriceRange/PriceRange'
import RoomsAndBeds  from './RoomsAndBeds/RoomsAndBeds'
import PropertyType from './ProportyType/PropertyType'
import Ratings from './Ratings/Ratings'
import FreeCancelation from './FreeCancelation/FreeCancelation'
import { useFilter } from '../../context/filterContext'


const Filter = () => {

    const {filterDispatch} = useFilter()
 
    const handleFilterModalClose = () =>{
        filterDispatch({
            type: "SHOW_FILTER_MODAL"
        })

    }

    const handleFilterClear = ()=>{
        filterDispatch({
            type: "CLEAR_ALL"
        })
    }
  return (
    <div className='filter-modal'>
        <div className='filter-page shadow'>
            <div className='d-flex align-center justify-space-between'> 
                <span className='filter-label'>filter</span>
                <button className='button btn-close cursor-pointer' onClick={handleFilterModalClose}>
                    <span className='material-icons-outlined'>close</span>
                </button>
            </div>

            <PriceRange />
            <RoomsAndBeds />
            <PropertyType />
            <Ratings />
            <FreeCancelation />

            <div className='d-flex align-center justify-space-between'>
                <button className='button cursor btn-link-primary' onClick={handleFilterClear}> clearAll </button>
                <button className='button cursor btn-link-primary btn-apply' onClick={handleFilterModalClose}>Apply</button>
            </div>

        </div>

    </div>
  )
}

export default Filter
import React from 'react'
import { useFilter } from '../../../context/filterContext'

const numberofAnemities  = ["any" , "1", "2", "3", "4", "5"]


const RoomsAndBeds = () => {

    const {filterDispatch, noOfBathrooms, noOfBedrooms, noOfBeds} = useFilter()

    const handleBedroomClick = (number) => {
        filterDispatch({
            type: "BEDROOMS",
            payload : number,
        })
    }

    const handleBathroomClick = (number) => {
        filterDispatch({
            type: "BATHROOMS",
            payload : number,
        })
    }

    const handleBedsClick = (number) => {
        filterDispatch({
            type: "BEDS",
            payload : number,
        })
    }
  return (
    <div className='filter-container'>
        <span className='filter-label'>Rooms and Beds</span>

        <div className='d-flex align-center gap-large'> 
            <div className='d-flex direction-column gap'>
                <span className='span-label'>Bedrooms</span>
                <span className='span-label'>Beds</span>
                <span className='span-label'>Bathrooms</span>
            </div>

            <div className='d-flex direction-column gap' >
                <div>
                    {
                        numberofAnemities.map(number=> <span
                        className={`span-label anemity-count align-center cursor-pointer on-hover ${noOfBedrooms.toString() === number ? "selected" : ""} `}
                        onClick={()=>handleBedroomClick(number)}
                         key={number}>
                            {number}
                        </span>)
                    }
                </div>

                <div>
                    {
                        numberofAnemities.map(number=> <span 
                         className={`span-label anemity-count align-center cursor-pointer on-hover ${noOfBeds.toString() === number ? "selected" : ""} `}
                        onClick={()=>handleBedsClick(number)} key={number}>{number}</span>)
                    }
                </div>

                <div>
                    {
                        numberofAnemities.map(number=> <span 
                        className={`span-label anemity-count align-center cursor-pointer on-hover ${noOfBathrooms.toString() === number ? "selected" : ""} `}
                        onClick={()=>handleBathroomClick(number)} key={number}>{number}</span>)
                    }
                </div>


            </div>
        </div>

    </div>
  )
}

export default RoomsAndBeds
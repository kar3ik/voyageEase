import React from 'react'
import {v4 as uuid} from 'uuid'
import { useFilter } from '../../../context/filterContext'

const propertyTypes = [
    { id: uuid(), type:"House" }, 
    {id: uuid(), type:"Guest House"}, 
    {id: uuid(), type:"Flat"}, 
    {id: uuid(), type:"Hotel"}
]
const PropertyType = () => {

  const {propertyType , filterDispatch } = useFilter()


  const handlePropertyType = (property) =>{
    filterDispatch({
      type:"PROPERTY_TYPE",
      payload: property
    })

  }
  return (
    <div className='filter-container'>
        <span className='filter-label'>Property type</span>
        <div className='d-flex gap-larger'>
            {
                propertyTypes.map(({id,type}) => <span onClick={()=>handlePropertyType(type)}
                 className={`span-label property-type cursor-pointer align-center justify-center on-hover ${propertyType ===type ? "selected" : ""}`} 
                 key={id}>{type}</span>)
            }

        </div>

    </div>
  )
}

export default PropertyType
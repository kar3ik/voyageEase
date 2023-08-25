import React from 'react'
import './FreeCancelation.css'
import { useFilter } from '../../../context/filterContext'


const FreeCancelation = () => {

  const {isCancelable, filterDispatch } = useFilter()

  const handleCancelChange = (event)=>{
    filterDispatch({
      type: "CANCELABLE",
      payload: event.target.checked
    })

  }

  return (
    <div className='filter-container'>
        <div className='d-flex align-center gap-larger'>
            <span className='filter-label'>Free Cancelation</span>
            <label className='slide'>
                <input type='checkbox' onChange={handleCancelChange} value={isCancelable} checked={isCancelable} />
                <span className='slider round'></span>
            </label>

        </div>

    </div>
  )
}

export default FreeCancelation
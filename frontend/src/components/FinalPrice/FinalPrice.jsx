import React from 'react'
import './FinalPrice.css'
import {useDate} from '../../context/dateContext'
import DateSelector from '../DateSelector/DateSelector'
import { useNavigate } from 'react-router-dom'

const FinalPrice = ({singleHotel}) => {

    const {_id, price, rating} = singleHotel

    const navigate = useNavigate()
    const {guests , dateDispatch, checkinDate, checkoutDate} = useDate()


    const handleGuestChange = (event) =>{
        dateDispatch({
            type:"GUESTS",
            payload : event.target.value
        })
    }

    const handleReserveButton = () =>{
        navigate(`/confirm-booking/stay/${_id}`)
    }
  return (
    <div className='price-details-container d-flex direction-column gap shadow'>
        <div className='price-rating d-flex align-center justify-space-between'>
            <p>
                <span className='fs-bold fs-large'>Rs:{price}</span> night
            </p>
            <span className='rating d-flex align-center'>
                <span className='material-icons-outlined'>star</span><span>{rating}</span>
            </span>
        </div>


        <div className='d-flex direction-column'>
            <div className='grid-container-two-col selected-dates'>
                <div className='checkin loc-container'>
                    <label className='label'>Check In</label>
                    <DateSelector checkInType="in" />
                </div>
                <div className='checkin loc-container'>
                    <label className='label'>Check Out</label>
                    <DateSelector checkInType="out" />
                </div>
            </div>

            <div className='guests gutter-sm'>
                <p>GUESTS</p>
                {
                    guests <=0 ? (<input className='guest-count-input' type='number' placeholder='add guest' value={guests} 
                    onChange={handleGuestChange}/>) : (<span>{guests} guests</span>)

                }
                
            </div>
        </div>


        <div>
            <button className='button btn-reserve  cursor' onClick={handleReserveButton}
             disabled={checkinDate && checkoutDate && guests > 0 ? false : true}>Reserve</button>
        </div>

        <div className='price-distribution d-flex direction-column '>
            <div className='final-price d-flex align-center justify-space-between'>
                <span className='span'>Rs. {price} * 2 nights</span>
                <span className='span'>Rs {price * 2}</span>
            </div>

            <div className='final-price d-flex align-center justify-space-between'>
                <span className='span'>Service fee</span>
                <span className='span'>Rs 5000</span>
            </div>

            <div className='final-price d-flex align-center justify-space-between'>
                <span className='span'>Total</span>
                <span className='span'>Rs 5000</span>
            </div>

        </div>
    </div>
  )
}

export default FinalPrice
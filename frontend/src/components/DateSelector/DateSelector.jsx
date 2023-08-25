import React from 'react'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import './DateSelector.css'
import {useDate} from '../../context/dateContext'

const DateSelector = ({ checkInType}) => {

    const { checkinDate, checkoutDate, dateDispatch } = useDate()

    const handleDateChange = (date) =>{
      dateDispatch({
        type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
        payload: date,
      })

    }

    const handleDateFocus = () => {
      dateDispatch({
        type:"DATE_FOCUS"
      })
    }
  return (
    <div>
        <Datepicker selected={checkInType ==="in" ? checkinDate : checkoutDate } onChange={date => handleDateChange(date)}
        className='search-dest input' onFocus={handleDateFocus}
         dateFormat="dd/MM/yyyy" placeholderText='add dates' closeOnScroll={true} />
    </div>
  )
}

export default DateSelector
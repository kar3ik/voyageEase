import React from 'react'
import './Navbar.css'
import { useDate } from '../../context/dateContext'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {destination ,checkinDate, checkoutDate,guests,dateDispatch} = useDate()
    const {authDispatch} = useAuth()

    const handleSearchOption =()=>{
        dateDispatch({
            type: "OPEN_SEARCH_MODAL"
        })
    }


    const handleAuthClick =()=>{
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }



  return (
    <div>
        <header className="heading d-flex grow-shrink-basis align-center">
            <h1 className="heading-title">
                <a className="link" href="/">VoyageEase</a>
            </h1>




            <div className='form-container d-flex align-center cursor-pointer shadow' onClick={handleSearchOption}>
                <span className='form-option'>{destination || "anyWhere"}</span>
                <span className='border-right-1px'></span>
                <span className='form-option'>{checkinDate && checkoutDate ?
                `${checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - 
                    ${checkoutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`

                : "anyWeek"} </span>
                <span className='border-right-1px'></span>
                <span className='form-option'>{guests > 0 ? `${guests} guests`  :"addGuest"}</span>
                <span className="material-icons-outlined search">search</span>

            </div>



            <nav className="d-flex align-center gap-large" onClick={handleAuthClick}>
                <div className='nav d-flex align-center cursor-pointer'>
                    <span className="material-icons-outlined profile-option menu">menu</span>
                    <span className="material-icons-outlined profile-option people">people</span>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
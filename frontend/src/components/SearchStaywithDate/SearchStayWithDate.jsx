import React from 'react'
import './SearchStayWithDate.css'
import DateSelector from '../DateSelector/DateSelector'
import { useDate } from '../../context/dateContext'
import { useCategory } from '../../context/Categorycontext'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchStayWithDate = () => {
    
    const navigate = useNavigate()
    const [hotels, setHotels] = useState([])
    const {destination, guests, isSearchResultOpen, dateDispatch} = useDate()
    const {hotelCategory} = useCategory()


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get(`http://localhost:4005/api/hotels/?category=${hotelCategory}`);
            const data = response.data; // Extract the data from the response object
            setHotels(data)
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      }, [hotelCategory]);
    


    const handleDestinationChange =(event)=>{
        dateDispatch({
            type: "DESTINATION",
            payload:event.target.value,
        })

    }


    const handleGuestChange =(event)=>{
        dateDispatch({
            type:"GUESTS",
            payload:event.target.value,

        })
    }

    const handleSearchResult= (address)=>{
        dateDispatch({
                type: "DESTINATION",
                payload: address
        })
    }


    const handleDestinationFocus = () =>{
        dateDispatch({
            type : "SHOW_SEARCH_RESULT"
        })

    }

    const handleSearchButton = () =>{
        dateDispatch({
            type: "CLOSE_SEARCH_MODAL"
        })
        navigate(`/hotels/${destination}`)
        
    }

    const destinationOptions=  hotels.filter(({address,city,state,country}) => address.toLowerCase().includes(destination.toLowerCase())
    || city.toLowerCase().includes(destination.toLowerCase()) || state.toLowerCase().includes(destination.toLowerCase())
    || country.toLowerCase().includes(destination.toLowerCase()))
  return (
    <div className='destination-container'>
        <div className='destination-options d-flex align-center absolute' >

            <div className='location-container'>
                <label className='label'>where</label>
                <input value={destination} onChange={handleDestinationChange} onFocus={handleDestinationFocus}
                autoFocus className='input search-dest' placeholder='search destination' />
            </div>

            <div className="location-container">
                <label className='label'>checkin</label>
                <DateSelector checkInType="in"/>
            </div>

            <div className="location-container">
                <label className='label'>checkout</label>
                <DateSelector checkInType="out"/>
            </div>

            <div className='location-container'>
                <label className='label'>no of guests</label> 
                <input value={guests} className='input search-dest' placeholder='add guests' onChange={handleGuestChange}/>
            </div>

            <div className='search-container d-flex align-center cursor' onClick={handleSearchButton}>
                <span className=' search material-icons-outlined'>
                    search
                </span>
                <span>search</span>
            </div>

        </div>

        {
            isSearchResultOpen && (
            <div className='search-result-container absolute'>

                {
                    destinationOptions && destinationOptions.map(({address, city}) => (
                    <p className='p cursor-pointer' onClick={()=>handleSearchResult(address)}>
                        {address} , {city}
                    </p>
                    ))
                }

            </div>
            )}

        
    </div>
  )
}

export default SearchStayWithDate
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar"
import HotelImages from '../../components/HotelImages/HotelImages'
import './SingleHotel.css'
import HotelDetails from '../../components/HotelDetails/HotelDetails'
import FinalPrice from '../../components/FinalPrice/FinalPrice'

const SingleHotel = () => {
  const {hotelId} = useParams()
  const [singleHotel,setSingleHotel] = useState()

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4005/api/hotels/${hotelId}`);
        // console.log(data)
        setSingleHotel(data);
        // console.log(setSingleHotel)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [hotelId]);


  if (!singleHotel) {
    return <div>Loading...</div>; // Add a loading state or component here
  }


 
  const { name, country } = singleHotel


  return (
    <Fragment>
      <Navbar />
      
      <main className='singlehotelpage'>
        
        <p className='hotel-name'>{name}, {country}</p>
        <HotelImages singleHotel={singleHotel} />


        <div className='d-flex '>
          <HotelDetails singleHotel={singleHotel} />
          <FinalPrice singleHotel={singleHotel} />
        </div>
        
      </main>
      
    </Fragment>
  )
}

export default SingleHotel
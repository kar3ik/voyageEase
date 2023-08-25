import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useDate } from '../../context/dateContext'
import HotelCard from '../../components/HotelCard/HotelCard'
import axios from 'axios'
import { useCategory } from '../../context/Categorycontext'

const SearchResults = () => {

    const {destination} = useDate()
    const [hotels,setHotels] = useState([])
    const {hotelCategory} = useCategory()


    useEffect(()=>{
        async function fetchData() {
            try {
              const response = await axios.get(`http://localhost:4005/api/hotels/?category=${hotelCategory}`);
              const data = response.data; // Extract the data from the response object
              setHotels(data);
            } catch (err) {
              console.log(err);
            }
          }
          fetchData();
        }, []);


        const filteredSearchResults = hotels.filter(({city, address, state}) =>
           address.toLowerCase() === destination.toLowerCase()
        || city.toLowerCase() === destination.toLowerCase()
        || state.toLowerCase()=== destination.toLowerCase()
        )





  return (
    <Fragment>
        <Navbar />
        <section className='main d-flex align-center gap-larger'>
            {
                filteredSearchResults ? filteredSearchResults.map(hotel => <HotelCard key={hotel._id} hotel={hotel}/>) : (<h2>not found</h2>)
            }
        </section>
    </Fragment>
  )
}

export default SearchResults
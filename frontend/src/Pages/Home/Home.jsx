import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import InfiniteScrool from 'react-infinite-scroll-component'
import './Home.css'
import Navbar from "../../components/Navbar/Navbar"
import HotelCard from '../../components/HotelCard/HotelCard'
import Categories from '../../components/Categories/Categories'
import SearchStayWithDate from '../../components/SearchStaywithDate/SearchStayWithDate'
import { useCategory } from '../../context/Categorycontext'
import { useDate } from '../../context/dateContext'
import Filter from '../../components/Filters/Filter'
import { useFilter } from '../../context/filterContext'
import { getHotelsByRoomsAndBeds } from '../../Utils/roombeds'
import { getHotelsByPropertyType } from '../../Utils/Property'
import { getHotelsByRating } from '../../Utils/rating'
import { getHotelByCancelation } from '../../Utils/caancelHotel'
import { AuthModal } from '../../components/AuthModal/AuthModal'
import { useAuth } from '../../context/authContext'

import axios from 'axios'



const Home = () => {

  const [hasMore, setHasMore] = useState(true)
  const [testData, setTestData] = useState([])
  const [currentIndex,setCurrentIndex] = useState(16)
  const [hotels, setHotels] = useState([])

  const {hotelCategory} = useCategory()
  const {isSearchModalOpen} = useDate()
  const {isFilterModalOpen , priceRange, noOfBathrooms, noOfBedrooms, noOfBeds, propertyType, voyageEaseRating,isCancelable} = useFilter()
  const {isAuthModalOpen } = useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4005/api/hotels/?category=${hotelCategory}`);
        const data = response.data; // Extract the data from the response object
        setTestData(data)
        setHotels(data ? data.slice(0,16) : []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [hotelCategory]);

  const fetchMoreDate = ()=> {
    if(hotels.length >= testData.length){
      setHasMore(false)
      return
    }
    setTimeout(()=>{
      if(hotels && hotels.length > 0){
        setHotels(hotels.concat(testData.slice(currentIndex, currentIndex +16)))
        setCurrentIndex(prev => prev+16)
      }else{
        setHotels([])
      }
    },1000)
  }


  const filteredHotelsByPrice = hotels.filter(hotel =>hotel.price >= priceRange[0] && hotel.price <= priceRange[1])
  const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(filteredHotelsByPrice,  noOfBathrooms, noOfBedrooms, noOfBeds)
  const filteredHotelsByPropertyType = getHotelsByPropertyType(filteredHotelsByBedsAndRooms, propertyType)
  const filteredHotelsByRating = getHotelsByRating(filteredHotelsByPropertyType, voyageEaseRating)
  const filteredHotelsByCancelation = getHotelByCancelation(filteredHotelsByRating,isCancelable)


  return (
    <div>
      <div className=''>

        <Navbar />
        <Categories />
        
        
        
          {
            hotels && hotels.length > 0 ? (
              <InfiniteScrool dataLength={hotels.length} next={fetchMoreDate} hasMore={hasMore}
               loader={hotels.length>0 && <h3 className='loading'>loading...</h3>}
               endMessage={<p className='end'>end....</p>}
               >
                <main className='main d-flex align-center wrap gap-larger'>
                  {filteredHotelsByCancelation && filteredHotelsByCancelation.map(hotel => <HotelCard key={hotel._id} hotel={hotel} />)}

                </main>
               </InfiniteScrool>
            ) : (<></>)
          }


          {
            isSearchModalOpen && <SearchStayWithDate />
          }
          {
            isFilterModalOpen && <Filter />
          }
          {
            isAuthModalOpen && <AuthModal />
          }
  
        
      </div>
    
    </div>
  )
}

export default Home
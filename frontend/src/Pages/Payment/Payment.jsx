import React from 'react'
import {Link , useNavigate, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useDate } from '../../context/dateContext'
import axios from 'axios'
import './payment.css'
const Payment = () => {

    const params = useParams()
    const {id} = params
    const navigate = useNavigate()

    const {guests , dateDispatch, checkinDate, checkoutDate} = useDate()
    const numberofNights = checkinDate && checkoutDate ? (checkoutDate.getTime() - checkinDate.getTime()) /(1000*3600*24) : 0


    const [singleHotel,setSingleHotel] = useState()

  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:4005/api/hotels/${id}`);
          setSingleHotel(data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);

    if (!singleHotel) {
        return <div>Loading...</div>; // Add a loading state or component here
      }

    const {image,name,address,state,rating,price} = singleHotel

    const totalPayment = price*numberofNights+150

    const loadScript = (source) =>{
        return new Promise((resolve) =>{
            const script = document.createElement("script")
            script.src = source
            script.onload = () =>resolve(true)
            script.onerror=()=>resolve(false)
            document.body.appendChild(script)
        })
    }
  
    const handleConfirmBooking =async () =>{
        const response = await loadScript("https://checkoutrazorpay.com/v1/checkout.js")
        if(!response){
            console.log({message: "Razorepay DK failed to load"})
        }
        const options = {
            key:"secret_key",
            amount:totalPayment*100,
            currency:"INR",
            name:"VoyageEase",
            email:"fakemail@gmail.com",
            number:"123456789",
            description:"thanks for booking",


            handler :({paymeny_id}) =>{
                navigate("/order-summary")
            },
            prefill:{
                name:"dontknow",
                email:"fakemail@gmail.com",
                number:"123456789",

            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

    }
  
    

  return (
    <div>
        <header className='heading'>
            <h1 className='heading-1'>
                <Link className='link' to="/">VoyageEase</Link>
            </h1>
        </header>

        <main className='main d-flex justify-center'>
            <div className='final-details-container d-flex direction-column gap-md'>
                <h2>trip details</h2>
                <div className='dates-and-guests d-flex direction-column gap-md'>
                    your trip
                </div>
                <div>
                    <p>Date</p>
                    <span>
                        {checkinDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - 
                        {checkoutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                    </span>
                </div>
                <div>
                    <p>guests</p>
                    <span>{guests} guests</span>
                </div>


                <div className='d-flex direction-column gap-sm'>
                    <h3>pay with</h3>
                    <div>Razorpay</div>

                </div>

                <button className='button btn-primary btn-reserve cursor btn-pay' onClick={handleConfirmBooking}>confirm booking</button>
            </div>


            <div className='final-details d-flex direction-column gap-larger'>
                <div className='d-flex gap-sm'>
                    <img className='image' src={image} alt={name} />
                    <div className='d-flex direction-column'>
                        <div className='d-flex direction-column grow-shrink-basis'>
                            <span>{name}</span>
                            <span>{address}, {state}</span>
                        </div>
                        <div className='rating-container'>
                            <span className='rating d-flex align-center'>
                                <span className='material-icons-outlined'>star</span>
                                <span>{rating}</span>
                            </span>
                        </div>
                    </div>
                    <div className='tag'>
                        your booking is protected by <strong className='strong'>VoyageEase</strong>
                    </div>

                    <div className='price-detail-container'>
                        <div className='price-distribution d-flex d-flex direction-column'>
                            <h3>price details</h3>
                            <div className='final-price d-flex align-center justify-space-between'>
                                <span className='span'>rs. {price} * {numberofNights} nights</span>
                                <span className='span'> rs.{price * numberofNights}</span>
                            </div>
                            <div className='final-price d-flex align-center justify-space-between'>
                                <span className='span'>service fees</span>
                                <span className='span'> rs.150</span>
                            </div>
                            <div className='final-price d-flex align-center justify-space-between'>
                                <span className='span'>total</span>
                                <span className='span'> rs.{totalPayment}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    </div>
  )
}

export default Payment
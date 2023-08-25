import {useNavigate} from 'react-router-dom'
import './HotelCard.css'
import { useWishList } from '../../context/wishListContext'
import { isHotelinWishlist } from '../../Utils/isHotelinWishList'
import { useAuth } from '../../context/authContext'


const HotelCard = ({hotel}) => {

    const {_id, name, image, address, state, rating, price } = hotel
    const {wishListDispatch , wishList} = useWishList()
    const {authDispatch, accesstoken} = useAuth()

    const isHotelintheWishList = isHotelinWishlist(wishList, _id)

    const navigate = useNavigate()

    const handleHotelCard = () =>{
        navigate(`/hotels/${name}/${address}-${state}/${_id}`)

    }

    const handleWishList = () =>{
        if(accesstoken){
            if(!isHotelintheWishList){
                wishListDispatch({
                    type:"ADD_TO_WISHLIST",
                    payload:hotel
        
                })
             navigate("/wishlist")   
            }else{
                wishListDispatch({
                    type:"REMOVE_FROM_WISHLIST",
                    payload: _id
                })
            }
        }else{
            authDispatch({
                type:"SHOW_AUTH_MODAL"
            })
        }
    }
  return (
    <div className='relative hotelcard-container shadow cursor-pointer'>

        <div onClick={handleHotelCard}>


            <img className='img' 
            src={image} 
            alt={name} />

            <div className='hotelcard-details'>

                <div className='d-flex align-center'>
                    <span className='location'>{address},{state}</span>
                    <span className='rating d-flex align-center'>
                    <span className="material-icons-outlined">grade</span>
                    <span>{rating}</span>
                    </span>
                </div>
                
            </div>

            <p className='hotelname'> {name} </p>
            <p className='pricedetails d-flex align-center'>
                <span className='price'> price: </span>
                <span> Rs.{price}</span>
            </p>


        </div>

        <button className='button btn-wishlist absolute '>
            <span className={`material-icons-outlined favourite cursor ${isHotelintheWishList ? "fav-selected" : ""}`} onClick={handleWishList}>favorite</span>
        </button>

    </div>
  )
}

export default HotelCard
export const getHotelByCancelation = (hotels,isCancelable) =>{
    const filteredHotels = hotels.filter(hotel => hotel.isCancelable === isCancelable)
    return filteredHotels
}
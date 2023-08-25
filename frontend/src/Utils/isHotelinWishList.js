export const isHotelinWishlist = (wishList, id) =>{
    const findHotelinWishList = wishList.some(hotel => hotel._id === id)
    return findHotelinWishList
}
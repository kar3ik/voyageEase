export const wishListReducer = (state, {type,payload}) =>{
    switch(type){
        case "ADD_TO_WISHLIST":
            return{
                ...state,
                wishList : [...state.wishList, payload]
            }
        case "REMOVE_FROM_WISHLIST":
            return{
                ...state,
                wishList : state.wishList.filter(hotel => hotel._id !== payload)
            }    
    }

}
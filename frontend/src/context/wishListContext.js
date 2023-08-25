import { createContext, useReducer } from "react";
import { useContext } from "react";
import { wishListReducer } from "../reducer/wishListReducer";

const initialValue = {
    wishList:[]
}
const WishListContext = createContext(initialValue)

const WishListProvider = ({children }) =>{

    const [{wishList}, wishListDispatch] = useReducer(wishListReducer , initialValue)
    return(
        <WishListContext.Provider value={{wishList,wishListDispatch}}>
            {children}
        </WishListContext.Provider>
    )
}

const useWishList = () => useContext(WishListContext)
export {useWishList, WishListProvider }
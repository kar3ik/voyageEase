import { createContext, useContext , useReducer } from "react";
import dateReducer from "../reducer/dateReducer";

const initialState = {
    destination: "",
    guests : 0,
    checkinDate:null,
    checkoutDate:null,
    isSearchModelOpen : false,
    isSearchResultOpen : true,
}

const DateContext = createContext(initialState)

const DateProvider = ({children}) =>{
    const [{destination, guests, checkinDate, checkoutDate, isSearchModalOpen, isSearchResultOpen}, dateDispatch] = useReducer(dateReducer , initialState)
    return(
        <DateContext.Provider value={{destination, guests, checkinDate, checkoutDate, isSearchModalOpen , isSearchResultOpen , dateDispatch}}>
            {children}
        </DateContext.Provider>
    )
}

const useDate =()=> useContext(DateContext)

export  { useDate, DateProvider}
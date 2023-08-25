import { createContext, useContext, useReducer } from "react"
import { authReducer } from "../reducer/authReducer"

const initialValue = {
    isAuthModalOpen: false,
    name:"",
    number:"",
    email:"",
    password:"",
    confirmPassword:"",
    accesstoken:"",
    uname:"",
    selectedTab: "login",
}

const AuthContext = createContext(initialValue)


const AuthProvider = ({children})=>{

    const [{isAuthModalOpen, name, email, password,confirmPassword, number, selectedTab , accesstoken , uname}, authDispatch ] = useReducer(authReducer, initialValue)
    return(
        <AuthContext.Provider value={{isAuthModalOpen,name, email, password,confirmPassword, number, selectedTab,accesstoken , uname, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth=()=> useContext(AuthContext)

export {useAuth, AuthProvider}
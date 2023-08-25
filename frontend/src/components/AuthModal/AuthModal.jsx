import AuthLogin from "../Auth/AuthLogin";
import AuthSignUp from "../Auth/AuthSignUp";
import { useAuth } from "../../context/authContext";
import './AuthModal.css'

export const AuthModal = () =>{

    const { authDispatch, selectedTab } = useAuth()

    const handleLoginClick = () =>{
        authDispatch({
            type:"SET_TO_LOGIN"
        })
    }

    const handleSignupClick = () =>{
        authDispatch({
            type:"SET_TO_SIGNUP"
        })
    }

    const handleClose = () =>{
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }
    return (
        <div className="auth-modal-container fixed">
            <div className="auth-modal absolute shadow right-0">
                <div className="d-flex align-center shadow">
                    <button className={`button btn-auth grow-shrink-basis cursor-pointer ${selectedTab ==="login" ? "btn-auth-selected" : ""}`}
                     onClick={handleLoginClick}>login</button>
                    <button className={`button btn-auth grow-shrink-basis cursor-pointer ${selectedTab ==="signup" ? "btn-auth-selected" : ""}`} onClick={handleSignupClick}>signup</button>
                    <button className="button btn-auth btn-close d-flex align-center justify-center cursor-pointer">
                        <span className="material-icons-outlined" onClick={handleClose}>close</span>
                    </button>
                </div>


                <div>
                    {
                        selectedTab === "login" ? (<AuthLogin />) : selectedTab==="signup" ? (<AuthSignUp />) : ""
                    }
                </div>

            </div>

        </div>
    )
}
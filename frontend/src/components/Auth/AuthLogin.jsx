import React from 'react'
import './Auth.css'
import { validateNumber } from '../../Utils/numberRegx'
import { validatePassword } from '../../Utils/passwordRegx'
import { loginHandler } from '../../Services/loginService'
import { useAuth } from '../../context/authContext'


let isNumberVaild,isValidPassword;

const AuthLogin = () => {


    const { number,password, authDispatch } = useAuth()

    const handleNumberChange = (event) =>{
        isNumberVaild = validateNumber(event.target.value)
        if(isNumberVaild){
            authDispatch({
                type:"NUMBER",
                payload:event.target.value
            })
        }else{
            console.log("invalid number")
        }    
    }


    const handlePasswordChange = (event) =>{
        isValidPassword = validatePassword(event.target.value)
        if(isValidPassword){
            authDispatch({
                type:"PASSWORD",
                payload:event.target.value
            })
        }else{
            console.log("invalid password")
        }
        
    }

    const handleFormSubmit =async (e)=>{
        e.preventDefault()
        if(isNumberVaild && isValidPassword){
            const {accesstoken, username} =await loginHandler(number,password)
            authDispatch({
                type:"SET_ACCESS_TOKEN",
                payload:accesstoken
            })
            authDispatch({
                type:"SET_USER_NAME",
                payload:username
            
            })
            
        }
        authDispatch({
            type:"CLEAR_USER_DATA"
        })

        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
    }


    const handleTestCredientials =async () =>{
        const {accesstoken, username} =await loginHandler(8074126667,"Abcd@1234")
        authDispatch({
            type:"SET_ACCESS_TOKEN",
            payload:accesstoken
        })
        authDispatch({
            type:"SET_USER_NAME",
            payload:username
        
        })

        authDispatch({
            type:"CLEAR_USER_DATA"
        })

        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })




    }


  return (
    <div className='auth-container'>
        <form onSubmit={handleFormSubmit}>
            <div className='d-flex direction-column lb-in-container'> 
                <label className='auth-label'>Mobile number <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={number} className='auth-input' maxLength="10" placeholder='enter mobile number' type='number' required onChange={handleNumberChange}/>
            </div>

            <div className='d-flex direction-column lb-in-container'>
                <label className='auth-label'>password <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={password} className='auth-input' placeholder='enter password' type='password'required onChange={handlePasswordChange}/>
            </div>

            <div>
                <button className='button btn-primary btn-login cursor'>login</button>
            </div>
        </form>

        <div>
            <button className='button btn-outline-primary cursor-pointer' onClick={handleTestCredientials}>login with test credientials</button>
        </div>

    </div>
  )
}

export default AuthLogin
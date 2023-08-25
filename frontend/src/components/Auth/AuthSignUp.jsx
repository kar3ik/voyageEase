import React from 'react'
import './Auth.css'
import { useAuth } from '../../context/authContext'
import { validateEmail } from '../../Utils/emailRegx'
import { validateName } from '../../Utils/nameRegx'
import { validateNumber } from '../../Utils/numberRegx'
import { validatePassword } from '../../Utils/passwordRegx'
import { signupHandler } from '../../Services/signupService'


let isNameValid,isNumberVaild,isEmailValid,isValidPassword,isValidConfirmPassword;


const AuthSignUp = () => {

    const {name, email, password, confirmPassword, number, authDispatch } = useAuth()

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


    const handleNameChange = (event) =>{

        isNameValid = validateName(event.target.value)
        if(isNameValid){
            authDispatch({
                type:"NAME",
                payload:event.target.value
            })
        }else{
            console.log("invalid name")
        }     
    }

    const handleEmailChange = (event) =>{
        isEmailValid = validateEmail(event.target.value)
        if(isEmailValid){
            authDispatch({
                type:"EMAIL",
                payload:event.target.value
            })
        }else{
            console.log("invalid email")
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

    const handleCPasswordChange = (event) =>{
        isValidConfirmPassword = validatePassword(event.target.value)
        if(isValidConfirmPassword){
            authDispatch({
                type:"CONFIRM_PASSWORD",
                payload:event.target.value
            })
        }else{
            console.log("invalid confirm password")
        }
       
    }


    const handleFormSubmit = (event)=>{
        event.preventDefault();
        if(isNameValid && isNumberVaild && isEmailValid && isValidPassword && isValidConfirmPassword){
            signupHandler( name, number, email, password)
        }

        authDispatch({
            type:"CLEAR_USER_DATA"
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
                <label className='auth-label'>Name <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={name} className='auth-input' placeholder='enter name' required onChange={handleNameChange}/>
            </div>

            <div className='d-flex direction-column lb-in-container'>
                <label className='auth-label'>email <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={email} className='auth-input' placeholder='enter email' type='email' required onChange={handleEmailChange}/>
            </div>

            <div className='d-flex direction-column lb-in-container'>
                <label className='auth-label'>password <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={password} className='auth-input' placeholder='enter password' type='password' required onChange={handlePasswordChange}/>
            </div>

            <div className='d-flex direction-column lb-in-container'>
                <label className='auth-label'>Confirm password <span className='asterisk'>*</span>{" "}</label>
                <input defaultValue={confirmPassword} className='auth-input' placeholder='enter password' type='password'required onChange={handleCPasswordChange}/>
            </div>

            <div>
                <button className='button btn-primary btn-login cursor'>submit</button>
            </div>
        </form>

       

    </div>
  )
}

export default AuthSignUp
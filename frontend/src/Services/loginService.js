import axios from "axios"

export const loginHandler =async (number, password) =>{

    try{
        const {data : {accesstoken : accesstoken, username} } = await axios.post("http://localhost:4005/api/auth/login",{
            number: number,
            password: password,
        })
        
        return {accesstoken, username}
    }catch(err){
        console.log("error !!")
    }
}